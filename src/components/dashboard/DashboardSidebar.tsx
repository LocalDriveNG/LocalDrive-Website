import { Link } from "react-router-dom";
import { Mail, Users, MessageSquare, Shield, LogOut, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import localDriveLogo from "@/assets/localdrive-logo.png";

type AppRole = "super_admin" | "admin";

interface DashboardSidebarProps {
  userRole: AppRole;
  userEmail: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const DashboardSidebar = ({
  userRole,
  userEmail,
  activeTab,
  onTabChange,
  onLogout,
}: DashboardSidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const menuItems = [
    { id: "newsletter", label: "Newsletter", icon: Mail },
    { id: "waitlist", label: "Waitlist", icon: Users },
    { id: "contact", label: "Contact", icon: MessageSquare },
  ];

  if (userRole === "super_admin") {
    menuItems.push({ id: "admins", label: "Admin Management", icon: Shield });
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <img 
            src={localDriveLogo} 
            alt="LocalDrive" 
            className="h-10 w-auto object-contain drop-shadow-md" 
          />
          {!isCollapsed && (
            <span className="font-bold text-lg text-foreground">Admin</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.label}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Site">
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Back to Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="space-y-3">
          {!isCollapsed && (
            <div className="text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-3 w-3 text-primary" />
                <span className="capitalize font-medium">{userRole.replace("_", " ")}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1">{userEmail}</p>
            </div>
          )}
          <Button
            variant="outline"
            size={isCollapsed ? "icon" : "sm"}
            onClick={onLogout}
            className="w-full"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
