import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

const NewsTicker = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const breakingNews = {
    ar: [
      "عاجل: اجتماع طارئ لمجلس الوزراء لمناقشة الأوضاع الاقتصادية",
      "آخر الأخبار: وصول وفد دبلوماسي رفيع المستوى إلى العاصمة",
      "مستجدات: انطلاق حملة وطنية للتوعية الصحية",
    ],
    fr: [
      "Urgent : Réunion d'urgence du Conseil des ministres pour discuter de la situation économique",
      "Dernières nouvelles : Arrivée d'une délégation diplomatique de haut niveau dans la capitale",
      "Nouveautés : Lancement d'une campagne nationale de sensibilisation à la santé",
    ],
    en: [
      "Breaking: Emergency Council of Ministers meeting to discuss economic situation",
      "Latest news: High-level diplomatic delegation arrives in the capital",
      "Updates: Launch of national health awareness campaign",
    ]
  };

  const currentNews = breakingNews[i18n.language as keyof typeof breakingNews] || breakingNews.ar;

  return (
    <div className="bg-destructive text-destructive-foreground py-2 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
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
