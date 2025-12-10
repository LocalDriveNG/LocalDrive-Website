import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Mail, 
  Users, 
  MessageSquare, 
  UserCog, 
  LogOut,
  Shield
} from 'lucide-react';
import localDriveLogo from '@/assets/localdrive-logo.png';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Overview', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Newsletter', url: '/dashboard/newsletter', icon: Mail },
  { title: 'Waitlist', url: '/dashboard/waitlist', icon: Users },
  { title: 'Contact Forms', url: '/dashboard/contacts', icon: MessageSquare },
];

const adminItems = [
  { title: 'User Management', url: '/dashboard/users', icon: UserCog, superAdminOnly: true },
];

export const AdminSidebar = () => {
  const { signOut, isSuperAdmin, user } = useAdminAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img 
            src={localDriveLogo} 
            alt="LocalDrive" 
            className="h-10 w-auto drop-shadow-md"
          />
          <div>
            <h1 className="font-bold text-lg text-foreground">LocalDrive</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Data Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                          isActive
                            ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isSuperAdmin && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield className="h-3 w-3" />
              Super Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                            isActive
                              ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          )
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <div className="flex flex-col gap-3">
          <div className="px-3 py-2 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
            <p className="text-xs text-primary font-medium mt-1">
              {isSuperAdmin ? 'Super Admin' : 'Admin'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:border-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
