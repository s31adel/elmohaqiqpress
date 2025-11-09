import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Users, Trash } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean;
  subscribed_at: string;
}

interface Campaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  status: string;
  sent_at: string | null;
  created_at: string;
}

export default function NewsletterManager() {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaign, setNewCampaign] = useState({ title: '', subject: '', content: '' });
  const [editingCampaign, setEditingCampaign] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
    fetchCampaigns();
  }, []);

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('subscribed', true)
      .order('subscribed_at', { ascending: false });

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setSubscribers(data || []);
    }
  };

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('newsletter_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setCampaigns(data || []);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.title || !newCampaign.subject || !newCampaign.content) {
      toast({ title: 'Erreur', description: 'Tous les champs sont requis', variant: 'destructive' });
      return;
    }

    const { error } = await supabase
      .from('newsletter_campaigns')
      .insert([{ ...newCampaign, status: 'draft' }]);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Campagne créée avec succès' });
      setNewCampaign({ title: '', subject: '', content: '' });
      fetchCampaigns();
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;

    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Abonné supprimé' });
      fetchSubscribers();
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) return;

    const { error } = await supabase
      .from('newsletter_campaigns')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Campagne supprimée' });
      fetchCampaigns();
    }
  };

  return (
    <Tabs defaultValue="campaigns" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="campaigns">
          <Mail className="w-4 h-4 mr-2" />
          Campagnes
        </TabsTrigger>
        <TabsTrigger value="subscribers">
          <Users className="w-4 h-4 mr-2" />
          Abonnés ({subscribers.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="campaigns" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Créer une campagne</CardTitle>
            <CardDescription>Créez une nouvelle campagne de newsletter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titre de la campagne</Label>
              <Input
                id="title"
                value={newCampaign.title}
                onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                placeholder="Ma nouvelle campagne"
              />
            </div>
            <div>
              <Label htmlFor="subject">Sujet de l'email</Label>
              <Input
                id="subject"
                value={newCampaign.subject}
                onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                placeholder="Découvrez nos derniers articles"
              />
            </div>
            <div>
              <Label htmlFor="content">Contenu</Label>
              <RichTextEditor
                content={newCampaign.content}
                onChange={(content) => setNewCampaign({ ...newCampaign, content })}
              />
            </div>
            <Button onClick={handleCreateCampaign}>
              <Send className="w-4 h-4 mr-2" />
              Créer la campagne
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{campaign.title}</CardTitle>
                    <CardDescription>
                      {campaign.subject} • {new Date(campaign.created_at).toLocaleDateString('fr-FR')}
                      {' '}
                      <Badge variant={campaign.status === 'sent' ? 'default' : 'secondary'}>
                        {campaign.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                      </Badge>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCampaign(campaign.id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: campaign.content }} className="prose prose-sm max-w-none" />
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="subscribers" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Liste des abonnés</CardTitle>
            <CardDescription>{subscribers.length} abonnés actifs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{subscriber.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Inscrit le {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteSubscriber(subscriber.id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {subscribers.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Aucun abonné pour le moment</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
