import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DataTableCard from "./DataTableCard";
import { format, subDays } from "date-fns";
import { Eye } from "lucide-react";

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const SORT_OPTIONS = [
  { value: "created_at_desc", label: "Newest First" },
  { value: "created_at_asc", label: "Oldest First" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
  { value: "subject_asc", label: "Subject (A-Z)" },
  { value: "subject_desc", label: "Subject (Z-A)" },
];

const ContactTab = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("created_at_desc");
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("contact_submissions")
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
      setSubmissions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch contact submissions",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, [startDate, endDate]);

  const filteredAndSortedSubmissions = useMemo(() => {
    let result = [...submissions];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((sub) =>
        sub.email.toLowerCase().includes(query) ||
        sub.first_name.toLowerCase().includes(query) ||
        sub.last_name.toLowerCase().includes(query) ||
        sub.subject.toLowerCase().includes(query) ||
        sub.message.toLowerCase().includes(query) ||
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
        case "subject_asc":
          return a.subject.localeCompare(b.subject);
        case "subject_desc":
          return b.subject.localeCompare(a.subject);
        default:
          return 0;
      }
    });

    return result;
  }, [submissions, searchQuery, sortValue]);

  const exportToCSV = () => {
    if (filteredAndSortedSubmissions.length === 0) {
      toast({
        title: "No data",
        description: "No contact submissions to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["First Name", "Last Name", "Email", "Phone", "Subject", "Message", "Submitted At"];
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedSubmissions.map((sub) =>
        [
          `"${sub.first_name}"`,
          `"${sub.last_name}"`,
          `"${sub.email}"`,
          `"${sub.phone || ""}"`,
          `"${sub.subject.replace(/"/g, '""')}"`,
          `"${sub.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
          format(new Date(sub.created_at), "yyyy-MM-dd HH:mm:ss"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `Exported ${filteredAndSortedSubmissions.length} contact submissions.`,
    });
  };

  return (
    <>
      <DataTableCard
        title="Contact Submissions"
        description="View messages from your contact form"
        totalCount={filteredAndSortedSubmissions.length}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onExport={exportToCSV}
        onRefresh={fetchSubmissions}
        loading={loading}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, subject..."
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
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-20">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </TableCell>
                </TableRow>
              ) : filteredAndSortedSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No contact submissions found for the selected criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.first_name} {submission.last_name}
                    </TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{submission.subject}</TableCell>
                    <TableCell>
                      {format(new Date(submission.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DataTableCard>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission</DialogTitle>
            <DialogDescription>
              Submitted on{" "}
              {selectedSubmission &&
                format(new Date(selectedSubmission.created_at), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="mt-1">
                    {selectedSubmission.first_name} {selectedSubmission.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="mt-1">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="mt-1">{selectedSubmission.phone}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subject</p>
                <p className="mt-1">{selectedSubmission.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Message</p>
                <p className="mt-1 whitespace-pre-wrap bg-muted/50 p-4 rounded-md">
                  {selectedSubmission.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactTab;
