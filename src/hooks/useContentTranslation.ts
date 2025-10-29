import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

interface TranslationCache {
  [key: string]: {
    [lang: string]: string;
  };
}

export const useContentTranslation = (originalContent: string, contentId: string) => {
  const { i18n } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState(originalContent);
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Simple in-memory cache
  const [cache] = useState<TranslationCache>({});

  useEffect(() => {
    const translateContent = async () => {
      // If current language is Arabic, use original content
      if (i18n.language === 'ar') {
        setTranslatedContent(originalContent);
        return;
      }

      // Check cache first
      const cacheKey = `${contentId}_${originalContent.substring(0, 50)}`;
      if (cache[cacheKey]?.[i18n.language]) {
        setTranslatedContent(cache[cacheKey][i18n.language]);
        return;
      }

      setIsTranslating(true);
      try {
        const { data, error } = await supabase.functions.invoke('translate-content', {
          body: { 
            content: originalContent,
            targetLanguage: i18n.language
          }
        });

        if (error) {
          console.error('Translation error:', error);
          setTranslatedContent(originalContent);
        } else if (data?.translatedText) {
          // Cache the translation
          if (!cache[cacheKey]) {
            cache[cacheKey] = {};
          }
          cache[cacheKey][i18n.language] = data.translatedText;
          setTranslatedContent(data.translatedText);
        }
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedContent(originalContent);
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [i18n.language, originalContent, contentId, cache]);

  return { translatedContent, isTranslating };
};
