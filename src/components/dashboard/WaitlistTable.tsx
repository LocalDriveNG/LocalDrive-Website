import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Trash2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface WaitlistSubscriber {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export default function WaitlistTable() {
  const [subscribers, setSubscribers] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSuperAdmin } = useAuth();

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('waitlist_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch waitlist subscribers');
      console.error(error);
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    const { error } = await supabase
      .from('waitlist_subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete subscriber');
    } else {
      toast.success('Subscriber deleted');
      setSubscribers(subscribers.filter((s) => s.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Waitlist Subscribers</CardTitle>
          <CardDescription>{subscribers.length} total subscribers</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSubscribers} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : subscribers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No subscribers yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined On</TableHead>
                  {isSuperAdmin && <TableHead className="w-[100px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
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
                          onClick={() => handleDelete(subscriber.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
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
}
