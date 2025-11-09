import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash, Eye, CalendarIcon, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  status: 'draft' | 'published' | 'scheduled';
  category_id: string | null;
  published_at: string | null;
  views_count: number;
  categories: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export default function ArticlesManager() {
  const { user } = useAuth();
  const { isEditor } = useUserRole();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filters
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDateFrom, setFilterDateFrom] = useState<Date | undefined>();
  const [filterDateTo, setFilterDateTo] = useState<Date | undefined>();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    category_id: '',
    meta_title: '',
    meta_description: '',
  });

  useEffect(() => {
    fetchArticles();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setArticles(data || []);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    setCategories(data || []);
  };

  const fetchTags = async () => {
    const { data } = await supabase.from('tags').select('*');
    setTags(data || []);
  };

  const resetFilters = () => {
    setFilterCategory('all');
    setFilterTag('all');
    setFilterStatus('all');
    setFilterDateFrom(undefined);
    setFilterDateTo(undefined);
    setSearchTerm('');
  };

  const hasActiveFilters = 
    filterCategory !== 'all' || 
    filterTag !== 'all' || 
    filterStatus !== 'all' || 
    filterDateFrom !== undefined || 
    filterDateTo !== undefined || 
    searchTerm !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      author_id: user?.id,
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
    };

    if (editingArticle) {
      const { error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', editingArticle.id);

      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Article mis à jour' });
        setIsDialogOpen(false);
        fetchArticles();
        resetForm();
      }
    } else {
      const { error } = await supabase.from('articles').insert(articleData);

      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Article créé' });
        setIsDialogOpen(false);
        fetchArticles();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Article supprimé' });
      fetchArticles();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      status: 'draft',
      category_id: '',
      meta_title: '',
      meta_description: '',
    });
    setEditingArticle(null);
  };

  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || '',
      content: article.content,
      featured_image: article.featured_image || '',
      status: article.status,
      category_id: article.category_id || '',
      meta_title: '',
      meta_description: '',
    });
    setIsDialogOpen(true);
  };

  const filteredArticles = articles.filter(article => {
    // Text search
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filterCategory === 'all' || article.category_id === filterCategory;
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    
    // Date range filter
    let matchesDateRange = true;
    if (article.published_at) {
      const publishedDate = new Date(article.published_at);
      if (filterDateFrom) {
        matchesDateRange = matchesDateRange && publishedDate >= filterDateFrom;
      }
      if (filterDateTo) {
        const dateTo = new Date(filterDateTo);
        dateTo.setHours(23, 59, 59, 999);
        matchesDateRange = matchesDateRange && publishedDate <= dateTo;
      }
    } else if (filterDateFrom || filterDateTo) {
      matchesDateRange = false;
    }
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Input
              placeholder="Rechercher par titre ou extrait..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-20"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-12 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Button
            variant={showFilters ? 'default' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            className="shrink-0"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {[
                  filterCategory !== 'all',
                  filterTag !== 'all',
                  filterStatus !== 'all',
                  filterDateFrom !== undefined,
                  filterDateTo !== undefined,
                ].filter(Boolean).length}
              </Badge>
            )}
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                Nouvel article
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? 'Modifier' : 'Créer'} un article</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Extrait</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="scheduled">Programmé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image">Image à la une (URL)</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <Button type="submit" className="w-full">
                {editingArticle ? 'Mettre à jour' : 'Créer'} l'article
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filtres avancés</CardTitle>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="scheduled">Programmé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From Filter */}
              <div className="space-y-2">
                <Label>Date de début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filterDateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDateFrom ? format(filterDateFrom, "PPP", { locale: fr }) : <span>Sélectionner</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDateFrom}
                      onSelect={setFilterDateFrom}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To Filter */}
              <div className="space-y-2">
                <Label>Date de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filterDateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDateTo ? format(filterDateTo, "PPP", { locale: fr }) : <span>Sélectionner</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDateTo}
                      onSelect={setFilterDateTo}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                      disabled={(date) => filterDateFrom ? date < filterDateFrom : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {filterCategory !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      Catégorie: {categories.find(c => c.id === filterCategory)?.name}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setFilterCategory('all')}
                      />
                    </Badge>
                  )}
                  {filterStatus !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      Statut: {filterStatus === 'draft' ? 'Brouillon' : filterStatus === 'published' ? 'Publié' : 'Programmé'}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setFilterStatus('all')}
                      />
                    </Badge>
                  )}
                  {filterDateFrom && (
                    <Badge variant="secondary" className="gap-1">
                      Depuis: {format(filterDateFrom, "dd/MM/yyyy", { locale: fr })}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setFilterDateFrom(undefined)}
                      />
                    </Badge>
                  )}
                  {filterDateTo && (
                    <Badge variant="secondary" className="gap-1">
                      Jusqu'au: {format(filterDateTo, "dd/MM/yyyy", { locale: fr })}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setFilterDateTo(undefined)}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
          {hasActiveFilters && ` sur ${articles.length} au total`}
        </span>
      </div>

      <div className="grid gap-4">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2">{article.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status}
                    </Badge>
                    {article.categories && <span>• {article.categories.name}</span>}
                    <span>• {article.views_count} vues</span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(article)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  {isEditor && (
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            {article.excerpt && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{article.excerpt}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
