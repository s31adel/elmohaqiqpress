import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, FileText, FolderTree, Tags, MessageSquare, Users, Image, FileEdit, Mail } from 'lucide-react';
import ArticlesManager from '@/components/cms/ArticlesManager';
import CategoriesManager from '@/components/cms/CategoriesManager';
import TagsManager from '@/components/cms/TagsManager';
import CommentsManager from '@/components/cms/CommentsManager';
import UsersManager from '@/components/cms/UsersManager';
import MediaManager from '@/components/cms/MediaManager';
import PagesManager from '@/components/cms/PagesManager';
import NewsletterManager from '@/components/cms/NewsletterManager';

export default function CMS() {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAuthor, loading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!user || !isAuthor) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">CMS - Al-Muhaqiq Press</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <a href="/">Voir le site</a>
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderTree className="w-4 h-4" />
              Catégories
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tags className="w-4 h-4" />
              Tags
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Commentaires
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Médias
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileEdit className="w-4 h-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Newsletter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ArticlesManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>

          <TabsContent value="tags">
            <TagsManager />
          </TabsContent>

          <TabsContent value="comments">
            <CommentsManager />
          </TabsContent>

          <TabsContent value="media">
            <MediaManager />
          </TabsContent>

          <TabsContent value="pages">
            <PagesManager />
          </TabsContent>

          <TabsContent value="users">
            <UsersManager />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
