import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Trash, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Comment {
  id: string;
  content: string;
  approved: boolean;
  status: string;
  created_at: string;
  author_name: string | null;
  user_id: string | null;
  article_id: string;
}

interface Article {
  id: string;
  title: string;
}

interface Profile {
  id: string;
  username: string;
}

export default function CommentsManager() {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [articles, setArticles] = useState<{ [key: string]: string }>({});
  const [profiles, setProfiles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchComments();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments'
        },
        (payload) => {
          console.log('Comment changed:', payload);
          fetchComments();
          
          if (payload.eventType === 'INSERT') {
            toast({ 
              title: 'Nouveau commentaire', 
              description: 'Un nouveau commentaire a été ajouté'
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setComments(data || []);
      
      // Fetch related articles and profiles
      if (data) {
        const articleIds = [...new Set(data.map(c => c.article_id))];
        const userIds = [...new Set(data.map(c => c.user_id).filter(Boolean))];
        
        const { data: articlesData } = await supabase
          .from('articles')
          .select('id, title')
          .in('id', articleIds);
        
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', userIds as string[]);
        
        if (articlesData) {
          const articlesMap: { [key: string]: string } = {};
          articlesData.forEach(a => articlesMap[a.id] = a.title);
          setArticles(articlesMap);
        }
        
        if (profilesData) {
          const profilesMap: { [key: string]: string } = {};
          profilesData.forEach(p => profilesMap[p.id] = p.username);
          setProfiles(profilesMap);
        }
      }
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const approved = status === 'approved';
    const { error } = await supabase
      .from('comments')
      .update({ status, approved })
      .eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      const statusLabels: { [key: string]: string } = {
        'pending': 'en attente',
        'approved': 'approuvé',
        'spam': 'marqué comme spam'
      };
      toast({ title: `Commentaire ${statusLabels[status]}` });
      fetchComments();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) return;

    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Commentaire supprimé' });
      fetchComments();
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">
                  {(comment.user_id && profiles[comment.user_id]) || comment.author_name || 'Anonyme'}
                </CardTitle>
                <CardDescription>
                  {articles[comment.article_id]} • {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={comment.status}
                  onValueChange={(value) => handleStatusChange(comment.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">En attente</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="approved">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Approuvé</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="spam">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">Spam</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(comment.id)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
