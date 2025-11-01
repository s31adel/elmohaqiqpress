import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { useContentTranslation } from '@/hooks/useContentTranslation';

const NewsTicker = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const breakingNewsAr = [
    "عاجل: اجتماع طارئ لمجلس الوزراء لمناقشة الأوضاع الاقتصادية",
    "آخر الأخبار: وصول وفد دبلوماسي رفيع المستوى إلى العاصمة",
    "مستجدات: انطلاق حملة وطنية للتوعية الصحية",
  ];

  const { translatedContent: news1 } = useContentTranslation(breakingNewsAr[0], 'ticker-news-1');
  const { translatedContent: news2 } = useContentTranslation(breakingNewsAr[1], 'ticker-news-2');
  const { translatedContent: news3 } = useContentTranslation(breakingNewsAr[2], 'ticker-news-3');

  const currentNews = [news1, news2, news3];

  return (
    <div className="bg-[hsl(var(--breaking-news-bg))] text-white py-2 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 flex items-center gap-4">
        <Badge variant="secondary" className="shrink-0 bg-white text-destructive font-bold">
          {t('newsTicker.urgent')}
        </Badge>
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap inline-block">
            {currentNews.map((news, index) => (
              <span key={index} className="mx-8 inline-block">
                • {news}
              </span>
            ))}
            {currentNews.map((news, index) => (
              <span key={`dup-${index}`} className="mx-8 inline-block">
                • {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
