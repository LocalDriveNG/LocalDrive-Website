import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DataTable } from '@/components/admin/DataTable';
import { format } from 'date-fns';

interface WaitlistSubscriber {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

const WaitlistPage = () => {
  const [data, setData] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscribers, error } = await supabase
        .from('waitlist_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching waitlist subscribers:', error);
      } else {
        setData(subscribers || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      key: 'first_name',
      label: 'First Name',
      sortable: true,
    },
    {
      key: 'last_name',
      label: 'Last Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Joined On',
      sortable: true,
      render: (item: WaitlistSubscriber) =>
        format(new Date(item.created_at), 'MMM dd, yyyy HH:mm'),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Waitlist Subscribers</h2>
        <p className="text-muted-foreground mt-1">
          Manage and export waitlist subscription data
        </p>
      </div>

      <DataTable
        data={data}
        columns={columns}
        searchKeys={['first_name', 'last_name', 'email']}
        dateKey="created_at"
        title="Waitlist Subscribers"
        loading={loading}
      />
    </div>
  );
};

export default WaitlistPage;
