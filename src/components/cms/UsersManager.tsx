import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

interface User {
  id: string;
  username: string;
  full_name: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

export default function UsersManager() {
  const { toast } = useToast();
  const { isAdmin } = useUserRole();
  const [users, setUsers] = useState<User[]>([]);
  const [userRoles, setUserRoles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setUsers(data || []);
      
      // Fetch user roles separately
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      if (rolesData) {
        const rolesMap: { [key: string]: string } = {};
        rolesData.forEach(r => rolesMap[r.user_id] = r.role);
        setUserRoles(rolesMap);
      }
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      toast({ title: 'Erreur', description: deleteError.message, variant: 'destructive' });
      return;
    }

    if (newRole !== 'none') {
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: newRole as 'admin' | 'editor' | 'author' }]);

      if (insertError) {
        toast({ title: 'Erreur', description: insertError.message, variant: 'destructive' });
        return;
      }
    }

    toast({ title: 'Rôle mis à jour' });
    fetchUsers();
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Vous devez être administrateur pour accéder à cette section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">{user.username}</CardTitle>
                <CardDescription>
                  {user.full_name} • Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  {userRoles[user.id] || 'Aucun rôle'}
                </Badge>
                <Select
                  value={userRoles[user.id] || 'none'}
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun rôle</SelectItem>
                    <SelectItem value="author">Auteur</SelectItem>
                    <SelectItem value="editor">Éditeur</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
