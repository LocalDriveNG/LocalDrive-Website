import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DataTable } from '@/components/admin/DataTable';
import { format } from 'date-fns';

interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string | null;
  subscription_preferences: any;
}

const NewsletterPage = () => {
  const [data, setData] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscribers, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching newsletter subscribers:', error);
      } else {
        setData(subscribers || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'subscription_preferences',
      label: 'Preferences',
      render: (item: NewsletterSubscriber) => 
        item.subscription_preferences 
          ? JSON.stringify(item.subscription_preferences)
          : '-',
    },
    {
      key: 'created_at',
      label: 'Subscribed On',
      sortable: true,
      render: (item: NewsletterSubscriber) =>
        item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy HH:mm') : '-',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h2>
        <p className="text-muted-foreground mt-1">
          Manage and export newsletter subscription data
        </p>
      </div>

      <DataTable
        data={data}
        columns={columns}
        searchKeys={['email']}
        dateKey="created_at"
        title="Newsletter Subscribers"
        loading={loading}
      />
    </div>
  );
};

export default NewsletterPage;
