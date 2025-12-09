import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Users, Mail, MessageSquare, Shield } from "lucide-react";
import localDriveLogo from "@/assets/localdrive-logo.png";
import NewsletterTab from "@/components/dashboard/NewsletterTab";
import WaitlistTab from "@/components/dashboard/WaitlistTab";
import ContactTab from "@/components/dashboard/ContactTab";
import AdminManagementTab from "@/components/dashboard/AdminManagementTab";

type AppRole = "super_admin" | "admin";

const Dashboard = () => {
const [user, setUser] = useState<User | null>(null);
  const [, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchUserRole(session.user.id);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserRole = async (userId: string) => {
    const { data: roles, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error || !roles || roles.length === 0) {
      navigate("/admin");
      return;
    }

    // Get the highest role (super_admin > admin)
    const isSuperAdmin = roles.some(r => r.role === "super_admin");
    setUserRole(isSuperAdmin ? "super_admin" : "admin");
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !userRole) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={localDriveLogo} alt="LocalDrive" className="h-8" />
            <span className="text-sm font-medium text-muted-foreground">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium capitalize">{userRole.replace("_", " ")}</span>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        <Tabs defaultValue="newsletter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="newsletter" className="gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Newsletter</span>
            </TabsTrigger>
            <TabsTrigger value="waitlist" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Waitlist</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            {userRole === "super_admin" && (
              <TabsTrigger value="admins" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admins</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="newsletter">
            <NewsletterTab />
          </TabsContent>

          <TabsContent value="waitlist">
            <WaitlistTab />
          </TabsContent>

          <TabsContent value="contact">
            <ContactTab />
          </TabsContent>

          {userRole === "super_admin" && (
            <TabsContent value="admins">
              <AdminManagementTab />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
