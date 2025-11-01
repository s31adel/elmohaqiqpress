import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
}

interface CarouselNewsColumnProps {
  newsItems: NewsItem[];
}

const CarouselNewsColumn = ({ newsItems }: CarouselNewsColumnProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {newsItems.map((news) => (
        <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex gap-4 p-4">
            <div className="flex-shrink-0 w-32 h-24">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="category-badge mb-2 inline-block">
                {news.category}
              </span>
              <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">
                {news.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {news.excerpt}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CarouselNewsColumn;
