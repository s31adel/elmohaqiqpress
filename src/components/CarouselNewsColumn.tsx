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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {newsItems.map((news) => (
        <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
          <div className="flex flex-col h-full">
            <div className="w-full h-40">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <span className="category-badge mb-2 inline-block w-fit">
                {news.category}
              </span>
              <h3 className="font-bold text-sm mb-2 line-clamp-2 leading-tight flex-1">
                {news.title}
              </h3>
              <p className="text-muted-foreground text-xs line-clamp-2">
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
