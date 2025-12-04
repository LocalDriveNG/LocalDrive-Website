import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, Trash2, RefreshCw, UserPlus, Shield, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

interface AdminUser {
  id: string;
  user_id: string;
  role: 'super_admin' | 'admin';
  created_at: string | null;
  email?: string;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch admins');
      console.error(error);
    } else {
      setAdmins(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newAdminPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setCreating(true);

    // Create user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: newAdminEmail,
      password: newAdminPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (authError) {
      toast.error(authError.message);
      setCreating(false);
      return;
    }

    if (!authData.user) {
      toast.error('Failed to create user');
      setCreating(false);
      return;
    }

    // Assign admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({ user_id: authData.user.id, role: 'admin' });

    if (roleError) {
      toast.error('User created but failed to assign admin role');
      setCreating(false);
      return;
    }

    toast.success('Admin user created successfully');
    setNewAdminEmail('');
    setNewAdminPassword('');
    setIsOpen(false);
    setCreating(false);
    fetchAdmins();
  };

  const handleDeleteAdmin = async (admin: AdminUser) => {
    if (admin.role === 'super_admin') {
      toast.error('Cannot delete super admin');
      return;
    }

    if (!confirm('Are you sure you want to remove admin access for this user?')) return;

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', admin.id);

    if (error) {
      toast.error('Failed to remove admin');
    } else {
      toast.success('Admin removed');
      setAdmins(admins.filter((a) => a.id !== admin.id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Admin Management</CardTitle>
          <CardDescription>Manage admin users and their access levels</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchAdmins} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Admin User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    placeholder="Min 6 characters"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  New admin will have limited access (view only). Only super admins can delete data.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAdmin} disabled={creating}>
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Admin'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : admins.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No admin users yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Added On</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-mono text-xs">
                      {admin.user_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {admin.role === 'super_admin' ? (
                          <>
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            <span className="font-medium text-primary">Super Admin</span>
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span>Admin</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {admin.created_at
                        ? format(new Date(admin.created_at), 'MMM d, yyyy')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {admin.role !== 'super_admin' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAdmin(admin)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
