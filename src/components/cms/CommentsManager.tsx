import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Trash } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  approved: boolean;
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

  const handleApprove = async (id: string, approved: boolean) => {
    const { error } = await supabase
      .from('comments')
      .update({ approved })
      .eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: approved ? 'Commentaire approuvé' : 'Approbation retirée' });
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
                  {' '}
                  <Badge variant={comment.approved ? 'default' : 'secondary'}>
                    {comment.approved ? 'Approuvé' : 'En attente'}
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!comment.approved ? (
                  <Button variant="ghost" size="icon" onClick={() => handleApprove(comment.id, true)}>
                    <Check className="w-4 h-4 text-green-600" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => handleApprove(comment.id, false)}>
                    <X className="w-4 h-4 text-orange-600" />
                  </Button>
                )}
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
