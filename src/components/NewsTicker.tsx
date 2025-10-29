import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

const NewsTicker = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const breakingNews = [
    "عاجل: اجتماع طارئ لمجلس الوزراء لمناقشة الأوضاع الاقتصادية",
    "آخر الأخبار: وصول وفد دبلوماسي رفيع المستوى إلى العاصمة",
    "مستجدات: انطلاق حملة وطنية للتوعية الصحية",
  ];

  return (
    <div className="bg-destructive text-destructive-foreground py-2 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 flex items-center gap-4">
        <Badge variant="secondary" className="shrink-0 bg-white text-destructive font-bold">
          {isRTL ? 'عاجل' : 'URGENT'}
        </Badge>
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap inline-block">
            {breakingNews.map((news, index) => (
              <span key={index} className="mx-8 inline-block">
                • {news}
              </span>
            ))}
            {breakingNews.map((news, index) => (
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
