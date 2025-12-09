import { useState, useEffect } from "react";
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

const WaitlistTab = () => {
  const [subscribers, setSubscribers] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
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

  const exportToCSV = () => {
    if (subscribers.length === 0) {
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
      ...subscribers.map((sub) =>
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
      description: `Exported ${subscribers.length} waitlist entries.`,
    });
  };

  return (
    <DataTableCard
      title="Waitlist Subscribers"
      description="Manage your waitlist subscriber list"
      totalCount={subscribers.length}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      onExport={exportToCSV}
      onRefresh={fetchSubscribers}
      loading={loading}
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
            ) : subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No waitlist entries found for the selected date range.
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((subscriber) => (
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
