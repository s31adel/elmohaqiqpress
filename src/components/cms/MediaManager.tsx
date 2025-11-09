import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function MediaManager() {
  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          La gestion des médias sera disponible prochainement. Vous pourrez uploader et gérer vos images et fichiers ici.
          Pour l'instant, utilisez des URLs externes pour les images dans vos articles.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Fonctionnalités à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Upload d'images et fichiers</li>
            <li>Bibliothèque de médias</li>
            <li>Optimisation automatique des images</li>
            <li>Gestion des formats multiples</li>
            <li>Métadonnées et descriptions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
