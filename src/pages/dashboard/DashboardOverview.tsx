import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Mail, MessageSquare, TrendingUp } from 'lucide-react';
import { subDays } from 'date-fns';

interface Stats {
  newsletter: number;
  waitlist: number;
  contacts: number;
  recentNewsletter: number;
  recentWaitlist: number;
  recentContacts: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    newsletter: 0,
    waitlist: 0,
    contacts: 0,
    recentNewsletter: 0,
    recentWaitlist: 0,
    recentContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const sevenDaysAgo = subDays(new Date(), 7).toISOString();

      const [
        { count: newsletterCount },
        { count: waitlistCount },
        { count: contactsCount },
        { count: recentNewsletter },
        { count: recentWaitlist },
        { count: recentContacts },
      ] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('waitlist_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
        supabase.from('waitlist_subscribers').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
      ]);

      setStats({
        newsletter: newsletterCount || 0,
        waitlist: waitlistCount || 0,
        contacts: contactsCount || 0,
        recentNewsletter: recentNewsletter || 0,
        recentWaitlist: recentWaitlist || 0,
        recentContacts: recentContacts || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletter,
      recent: stats.recentNewsletter,
      icon: Mail,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Waitlist Subscribers',
      value: stats.waitlist,
      recent: stats.recentWaitlist,
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Contact Submissions',
      value: stats.contacts,
      recent: stats.recentContacts,
      icon: MessageSquare,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with LocalDrive.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {statCards.map((stat) => (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value.toLocaleString()}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-muted-foreground">
                      +{stat.recent} in the last 7 days
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <a href="/dashboard/newsletter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                <Mail className="h-6 w-6 text-blue-500 mb-2" />
                <h3 className="font-medium">View Newsletter Subscribers</h3>
                <p className="text-sm text-muted-foreground">Manage email subscriptions</p>
              </a>
              <a href="/dashboard/waitlist" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                <Users className="h-6 w-6 text-green-500 mb-2" />
                <h3 className="font-medium">View Waitlist</h3>
                <p className="text-sm text-muted-foreground">See who's waiting to join</p>
              </a>
              <a href="/dashboard/contacts" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                <MessageSquare className="h-6 w-6 text-purple-500 mb-2" />
                <h3 className="font-medium">View Contact Messages</h3>
                <p className="text-sm text-muted-foreground">Read and respond to inquiries</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
