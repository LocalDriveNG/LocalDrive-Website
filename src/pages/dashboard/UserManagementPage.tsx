import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Shield, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface UserRole {
  id: string;
  user_id: string;
  role: 'super_admin' | 'admin';
  created_at: string | null;
}

const UserManagementPage = () => {
  const { isSuperAdmin } = useAdminAuth();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin'>('admin');
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user roles:', error);
    } else {
      setUserRoles(data || []);
    }
    setLoading(false);
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // Create the user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // Insert the admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: newUserRole,
        });

      if (roleError) throw roleError;

      toast({
        title: 'Admin Created',
        description: `Successfully created admin account for ${newUserEmail}`,
      });

      setNewUserEmail('');
      setNewUserPassword('');
      setDialogOpen(false);
      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create admin user',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', roleId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user role',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Role Deleted',
        description: 'User role has been removed',
      });
      fetchUserRoles();
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Access denied. Super admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage admin users and their roles
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Create Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Admin User</DialogTitle>
              <DialogDescription>
                Create a new admin account with limited privileges compared to super admin.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@localdrive.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUserRole} onValueChange={(v) => setNewUserRole(v as 'admin')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin (Limited Access)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Admins can view data but cannot manage users
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Admin User'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </CardContent>
          </Card>
        ) : userRoles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No admin users found
            </CardContent>
          </Card>
        ) : (
          userRoles.map((userRole) => (
            <Card key={userRole.id} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${userRole.role === 'super_admin' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                    <Shield className={`h-5 w-5 ${userRole.role === 'super_admin' ? 'text-amber-500' : 'text-blue-500'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium text-foreground">
                      {userRole.user_id}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {userRole.role === 'super_admin' ? 'Super Admin' : 'Admin'} • 
                      Created {userRole.created_at ? format(new Date(userRole.created_at), 'MMM dd, yyyy') : '-'}
                    </CardDescription>
                  </div>
                </div>
                {userRole.role !== 'super_admin' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRole(userRole.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      <Card className="border-border bg-muted/30">
        <CardHeader>
          <CardTitle className="text-foreground">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Shield className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Super Admin</p>
              <p className="text-sm text-muted-foreground">
                Full access: View all data, export data, manage admin users, delete records
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Admin</p>
              <p className="text-sm text-muted-foreground">
                Limited access: View all data, export data (Cannot manage users or delete records)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;
