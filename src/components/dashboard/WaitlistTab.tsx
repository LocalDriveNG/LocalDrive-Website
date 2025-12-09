import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTableCard from "./DataTableCard";
import { format, subDays } from "date-fns";

interface WaitlistSubscriber {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

const SORT_OPTIONS = [
  { value: "created_at_desc", label: "Newest First" },
  { value: "created_at_asc", label: "Oldest First" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
  { value: "email_asc", label: "Email (A-Z)" },
  { value: "email_desc", label: "Email (Z-A)" },
];

const WaitlistTab = () => {
  const [subscribers, setSubscribers] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("created_at_desc");
  const { toast } = useToast();

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("waitlist_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (startDate) {
        query = query.gte("created_at", `${startDate}T00:00:00`);
      }
      if (endDate) {
        query = query.lte("created_at", `${endDate}T23:59:59`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch waitlist entries",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, [startDate, endDate]);

  const filteredAndSortedSubscribers = useMemo(() => {
    let result = [...subscribers];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((sub) =>
        sub.email.toLowerCase().includes(query) ||
        sub.first_name.toLowerCase().includes(query) ||
        sub.last_name.toLowerCase().includes(query) ||
        `${sub.first_name} ${sub.last_name}`.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`;
      const nameB = `${b.first_name} ${b.last_name}`;
      
      switch (sortValue) {
        case "created_at_asc":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "created_at_desc":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "name_asc":
          return nameA.localeCompare(nameB);
        case "name_desc":
          return nameB.localeCompare(nameA);
        case "email_asc":
          return a.email.localeCompare(b.email);
        case "email_desc":
          return b.email.localeCompare(a.email);
        default:
          return 0;
      }
    });

    return result;
  }, [subscribers, searchQuery, sortValue]);

  const exportToCSV = () => {
    if (filteredAndSortedSubscribers.length === 0) {
      toast({
        title: "No data",
        description: "No waitlist entries to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["First Name", "Last Name", "Email", "Signed Up At"];
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedSubscribers.map((sub) =>
        [
          `"${sub.first_name}"`,
          `"${sub.last_name}"`,
          `"${sub.email}"`,
          format(new Date(sub.created_at), "yyyy-MM-dd HH:mm:ss"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `Exported ${filteredAndSortedSubscribers.length} waitlist entries.`,
    });
  };

  return (
    <DataTableCard
      title="Waitlist Subscribers"
      description="Manage your waitlist subscriber list"
      totalCount={filteredAndSortedSubscribers.length}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      onExport={exportToCSV}
      onRefresh={fetchSubscribers}
      loading={loading}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search by name or email..."
      sortOptions={SORT_OPTIONS}
      sortValue={sortValue}
      onSortChange={setSortValue}
    >
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Signed Up</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                </TableCell>
              </TableRow>
            ) : filteredAndSortedSubscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No waitlist entries found for the selected criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">
                    {subscriber.first_name} {subscriber.last_name}
                  </TableCell>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>
                    {format(new Date(subscriber.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DataTableCard>
  );
};

export default WaitlistTab;
