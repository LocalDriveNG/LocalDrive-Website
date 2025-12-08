import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Search, RefreshCw, MessageSquare, Eye, Download } from "lucide-react";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";
import { useTableFilters, exportToCSV } from "@/hooks/useTableFilters";
import DateRangeFilter from "./DateRangeFilter";

type ContactSubmission = Tables<"contact_submissions">;

interface ContactTableProps {
  isSuperAdmin: boolean;
}

const ContactTable = ({ isSuperAdmin }: ContactTableProps) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { searchQuery, setSearchQuery, dateRange, setDateRange, filteredData } = useTableFilters(
    submissions,
    ["email", "first_name", "last_name", "subject"] as (keyof ContactSubmission)[]
  );

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch contact submissions";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete the submission from ${email}?`)) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Deleted",
        description: "Contact submission has been removed.",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete submission";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    exportToCSV(
      filteredData,
      [
        { key: "first_name", header: "First Name" },
        { key: "last_name", header: "Last Name" },
        { key: "email", header: "Email" },
        { key: "phone", header: "Phone" },
        { key: "subject", header: "Subject" },
        { key: "message", header: "Message" },
        { key: "created_at", header: "Submitted At" },
      ],
      "contact_submissions"
    );
    toast({
      title: "Exported",
      description: `${filteredData.length} submissions exported to CSV.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Contact Submissions
            </CardTitle>
            <CardDescription>
              {filteredData.length} of {submissions.length} submissions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} disabled={filteredData.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={fetchSubmissions} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery || dateRange.from || dateRange.to ? "No submissions found matching your filters." : "No contact submissions yet."}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.first_name} {submission.last_name}
                    </TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{submission.subject}</TableCell>
                    <TableCell>
                      {format(new Date(submission.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Contact Submission</DialogTitle>
                              <DialogDescription>
                                From {submission.first_name} {submission.last_name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                                  <p>{submission.first_name} {submission.last_name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                                  <p>{submission.email}</p>
                                </div>
                                {submission.phone && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <p>{submission.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                                  <p>{format(new Date(submission.created_at), 'MMM d, yyyy h:mm a')}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Subject</p>
                                <p>{submission.subject}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Message</p>
                                <p className="whitespace-pre-wrap bg-muted p-4 rounded-lg mt-1">
                                  {submission.message}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {isSuperAdmin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(submission.id, submission.email)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactTable;
