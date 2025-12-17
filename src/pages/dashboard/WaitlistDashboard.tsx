import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DataTable } from '@/components/dashboard/DataTable';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface WaitlistSubscriber {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export default function WaitlistDashboard() {
  const [data, setData] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscribers, error } = await supabase
        .from('waitlist_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch waitlist subscribers',
          variant: 'destructive',
        });
        console.error('Error fetching waitlist subscribers:', error);
      } else {
        setData(subscribers || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [toast]);

  const columns = [
    { key: 'first_name' as const, label: 'First Name', sortable: true },
    { key: 'last_name' as const, label: 'Last Name', sortable: true },
    { key: 'email' as const, label: 'Email', sortable: true },
    {
      key: 'created_at' as const,
      label: 'Joined',
      sortable: true,
      render: (item: WaitlistSubscriber) => 
        format(new Date(item.created_at), 'MMM d, yyyy h:mm a'),
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
        title="Waitlist Subscribers"
        data={data}
        columns={columns}
        searchKeys={['email', 'first_name', 'last_name']}
        dateKey="created_at"
        exportFilename="waitlist-subscribers"
      />
    </DashboardLayout>
  );
}
