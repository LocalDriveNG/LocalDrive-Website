import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DataTable } from '@/components/dashboard/DataTable';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
  subscription_preferences: Json | null;
}

export default function NewsletterDashboard() {
  const [data, setData] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscribers, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch newsletter subscribers',
          variant: 'destructive',
        });
        console.error('Error fetching newsletter subscribers:', error);
      } else {
        const mappedData = (subscribers || []).map(sub => ({
          ...sub,
          created_at: sub.created_at || new Date().toISOString(),
        }));
        setData(mappedData);
      }
      setLoading(false);
    };

    fetchData();
  }, [toast]);

  const columns = [
    { key: 'email' as const, label: 'Email', sortable: true },
    {
      key: 'created_at' as const,
      label: 'Subscribed',
      sortable: true,
      render: (item: NewsletterSubscriber) => 
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
        title="Newsletter Subscribers"
        data={data}
        columns={columns}
        searchKeys={['email']}
        dateKey="created_at"
        exportFilename="newsletter-subscribers"
      />
    </DashboardLayout>
  );
}
