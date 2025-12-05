import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Users, Mail, MessageSquare, UserPlus, Shield } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import NewsletterTable from "@/components/admin/NewsletterTable";
import WaitlistTable from "@/components/admin/WaitlistTable";
import ContactTable from "@/components/admin/ContactTable";
import UserManagement from "@/components/admin/UserManagement";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAccess = async (userId: string) => {
      try {
        const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', { 
          _user_id: userId 
        });

        if (adminError || !isAdmin) {
          await supabase.auth.signOut();
          navigate('/admin');
          return;
        }

        const { data: superAdmin } = await supabase.rpc('has_role', { 
          _user_id: userId,
          _role: 'super_admin'
        });

        setIsSuperAdmin(superAdmin === true);
      } catch (error) {
        console.error('Error checking admin access:', error);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate('/admin');
        } else {
          setTimeout(() => {
            checkAdminAccess(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/admin');
      } else {
        checkAdminAccess(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {isSuperAdmin ? 'Super Admin' : 'Admin'} • {user?.email}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="newsletter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger 
              value="newsletter" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border"
            >
              <Mail className="w-4 h-4 mr-2" />
              Newsletter
            </TabsTrigger>
            <TabsTrigger 
              value="waitlist"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border"
            >
              <Users className="w-4 h-4 mr-2" />
              Waitlist
            </TabsTrigger>
            <TabsTrigger 
              value="contact"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger 
                value="users"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="newsletter" className="mt-6">
            <NewsletterTable isSuperAdmin={isSuperAdmin} />
          </TabsContent>

          <TabsContent value="waitlist" className="mt-6">
            <WaitlistTable isSuperAdmin={isSuperAdmin} />
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <ContactTable isSuperAdmin={isSuperAdmin} />
          </TabsContent>

          {isSuperAdmin && (
            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
