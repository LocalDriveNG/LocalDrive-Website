import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
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
  const [activeTab, setActiveTab] = useState("newsletter");
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "newsletter":
        return <NewsletterTab />;
      case "waitlist":
        return <WaitlistTab />;
      case "contact":
        return <ContactTab />;
      case "admins":
        return userRole === "super_admin" ? <AdminManagementTab /> : null;
      default:
        return <NewsletterTab />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <DashboardSidebar
          userRole={userRole}
          userEmail={user.email || ""}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
        
        <SidebarInset className="flex-1">
          {/* Header with trigger */}
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold capitalize">
                {activeTab === "admins" ? "Admin Management" : activeTab}
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            {renderTabContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
