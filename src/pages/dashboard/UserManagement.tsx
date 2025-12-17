import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth, AppRole } from '@/hooks/useAdminAuth';
import { UserPlus, Trash2, Shield, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
  email?: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<AppRole>('admin');
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { isSuperAdmin, user } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuperAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [isSuperAdmin, navigate]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } else {
      const mappedData = (data || []).map(u => ({
        ...u,
        created_at: u.created_at || new Date().toISOString(),
      }));
      setUsers(mappedData);
    }
    setLoading(false);
  };

  const handleCreateAdmin = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (newUserPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);

    // Create user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: newUserEmail,
      password: newUserPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (authError) {
      toast({
        title: 'Error',
        description: authError.message,
        variant: 'destructive',
      });
      setIsCreating(false);
      return;
    }

    if (!authData.user) {
      toast({
        title: 'Error',
        description: 'Failed to create user',
        variant: 'destructive',
      });
      setIsCreating(false);
      return;
    }

    // Add role to user_roles table
    const { error: roleError } = await supabase.from('user_roles').insert({
      user_id: authData.user.id,
      role: newUserRole,
    });

    if (roleError) {
      toast({
        title: 'Warning',
        description: 'User created but role assignment failed. Please assign role manually.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Admin user created successfully. They will need to verify their email.`,
      });
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserRole('admin');
      setDialogOpen(false);
      fetchUsers();
    }

    setIsCreating(false);
  };

  const handleDeleteUser = async (userRole: UserRole) => {
    if (userRole.user_id === user?.id) {
      toast({
        title: 'Error',
        description: "You cannot delete your own account",
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', userRole.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove user role',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'User role removed successfully',
      });
      fetchUsers();
    }
  };

  const getRoleIcon = (role: AppRole) => {
    return role === 'super_admin' ? (
      <ShieldCheck className="h-4 w-4 text-yellow-500" />
    ) : (
      <Shield className="h-4 w-4 text-blue-500" />
    );
  };

  const getRoleBadge = (role: AppRole) => {
    const colors = role === 'super_admin' 
      ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      : 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${colors}`}>
        {getRoleIcon(role)}
        {role === 'super_admin' ? 'Super Admin' : 'Admin'}
      </span>
    );
  };

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage admin users and their access levels
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Admin User</DialogTitle>
                <DialogDescription>
                  Create a new admin user account. They will receive an email to verify their account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUserRole} onValueChange={(v) => setNewUserRole(v as AppRole)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-500" />
                          Admin (Limited Access)
                        </div>
                      </SelectItem>
                      <SelectItem value="super_admin">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-yellow-500" />
                          Super Admin (Full Access)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Admins can view data. Super Admins can also manage users and delete data.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAdmin} disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create User'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>
              Users with access to the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No admin users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((userRole) => (
                      <TableRow key={userRole.id}>
                        <TableCell className="font-mono text-sm">
                          {userRole.user_id}
                          {userRole.user_id === user?.id && (
                            <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                          )}
                        </TableCell>
                        <TableCell>{getRoleBadge(userRole.role)}</TableCell>
                        <TableCell>
                          {format(new Date(userRole.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(userRole)}
                            disabled={userRole.user_id === user?.id}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Admin</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ View newsletter subscribers</li>
                  <li>✓ View waitlist subscribers</li>
                  <li>✓ View contact submissions</li>
                  <li>✓ Export data</li>
                  <li className="text-destructive">✗ Cannot manage users</li>
                  <li className="text-destructive">✗ Cannot delete data</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg border-yellow-500/20 bg-yellow-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Super Admin</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ All Admin permissions</li>
                  <li>✓ Create admin users</li>
                  <li>✓ Delete admin users</li>
                  <li>✓ Delete data entries</li>
                  <li>✓ Full system access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
