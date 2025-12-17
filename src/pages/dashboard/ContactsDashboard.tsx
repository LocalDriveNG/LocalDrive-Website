import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DataTable } from '@/components/dashboard/DataTable';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';

interface ContactSubmission {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

export default function ContactsDashboard() {
  const [data, setData] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data: contacts, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch contact submissions',
          variant: 'destructive',
        });
        console.error('Error fetching contact submissions:', error);
      } else {
        setData(contacts || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [toast]);

  const columns = [
    {
      key: 'first_name' as const,
      label: 'Name',
      sortable: true,
      render: (item: ContactSubmission) => `${item.first_name} ${item.last_name}`,
    },
    { key: 'email' as const, label: 'Email', sortable: true },
    { key: 'subject' as const, label: 'Subject', sortable: true },
    {
      key: 'created_at' as const,
      label: 'Date',
      sortable: true,
      render: (item: ContactSubmission) =>
        format(new Date(item.created_at), 'MMM d, yyyy h:mm a'),
    },
    {
      key: 'id' as const,
      label: 'Actions',
      render: (item: ContactSubmission) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedContact(item)}
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DataTable
        title="Contact Submissions"
        data={data}
        columns={columns}
        searchKeys={['email', 'first_name', 'last_name', 'subject']}
        dateKey="created_at"
        exportFilename="contact-submissions"
      />

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{selectedContact.first_name} {selectedContact.last_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{selectedContact.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{format(new Date(selectedContact.created_at), 'PPpp')}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subject</p>
                <p className="font-medium">{selectedContact.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Message</p>
                <p className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
