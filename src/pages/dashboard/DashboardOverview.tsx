import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Users, MessageSquare, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    newsletter: 0,
    waitlist: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsletterRes, waitlistRes, contactsRes] = await Promise.all([
          supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
          supabase.from('waitlist_subscribers').select('id', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          newsletter: newsletterRes.count || 0,
          waitlist: waitlistRes.count || 0,
          contacts: contactsRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletter,
      icon: Mail,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Waitlist Subscribers',
      value: stats.waitlist,
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Contact Submissions',
      value: stats.contacts,
      icon: MessageSquare,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Total Entries',
      value: stats.newsletter + stats.waitlist + stats.contacts,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">
          Welcome to the LocalDrive admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.title} className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-bold text-foreground">{card.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar to navigate between different data sections. You can view, search, filter by date, and export data from each section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
