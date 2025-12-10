import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DataTable } from '@/components/admin/DataTable';
import { format } from 'date-fns';
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const ContactsPage = () => {
  const [data, setData] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: submissions, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact submissions:', error);
      } else {
        setData(submissions || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      key: 'first_name',
      label: 'Name',
      sortable: true,
      render: (item: ContactSubmission) => `${item.first_name} ${item.last_name}`,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Submitted On',
      sortable: true,
      render: (item: ContactSubmission) =>
        format(new Date(item.created_at), 'MMM dd, yyyy HH:mm'),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: ContactSubmission) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedContact(item)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Contact Submissions</h2>
        <p className="text-muted-foreground mt-1">
          Manage and export contact form submissions
        </p>
      </div>

      <DataTable
        data={data}
        columns={columns}
        searchKeys={['first_name', 'last_name', 'email', 'subject']}
        dateKey="created_at"
        title="Contact Submissions"
        loading={loading}
      />

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-foreground">
                    {selectedContact.first_name} {selectedContact.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-foreground">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-foreground">{selectedContact.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                  <p className="text-foreground">
                    {format(new Date(selectedContact.created_at), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subject</p>
                <p className="text-foreground">{selectedContact.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Message</p>
                <p className="text-foreground whitespace-pre-wrap bg-muted/50 p-3 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsPage;
