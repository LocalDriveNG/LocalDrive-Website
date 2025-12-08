import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, RefreshCw, Users, Download } from "lucide-react";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";
import { useTableFilters, exportToCSV } from "@/hooks/useTableFilters";
import DateRangeFilter from "./DateRangeFilter";

type WaitlistSubscriber = Tables<"waitlist_subscribers">;

interface WaitlistTableProps {
  isSuperAdmin: boolean;
}

const WaitlistTable = ({ isSuperAdmin }: WaitlistTableProps) => {
  const [subscribers, setSubscribers] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { searchQuery, setSearchQuery, dateRange, setDateRange, filteredData } = useTableFilters(
    subscribers,
    ["email", "first_name", "last_name"] as (keyof WaitlistSubscriber)[]
  );

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('waitlist_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch waitlist";
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
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete ${email}?`)) return;

    try {
      const { error } = await supabase
        .from('waitlist_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubscribers(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Deleted",
        description: `${email} has been removed from the waitlist.`,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete subscriber";
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
        { key: "created_at", header: "Joined At" },
      ],
      "waitlist_subscribers"
    );
    toast({
      title: "Exported",
      description: `${filteredData.length} subscribers exported to CSV.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Waitlist Subscribers
            </CardTitle>
            <CardDescription>
              {filteredData.length} of {subscribers.length} on waitlist
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} disabled={filteredData.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={fetchSubscribers} disabled={loading}>
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
              placeholder="Search by name or email..."
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
            {searchQuery || dateRange.from || dateRange.to ? "No subscribers found matching your filters." : "No waitlist subscribers yet."}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined At</TableHead>
                  {isSuperAdmin && <TableHead className="w-[100px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">
                      {subscriber.first_name} {subscriber.last_name}
                    </TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>
                      {format(new Date(subscriber.created_at), 'MMM d, yyyy h:mm a')}
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subscriber.id, subscriber.email)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    )}
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

export default WaitlistTable;
