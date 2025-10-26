import { Clock } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  time: string;
  featured?: boolean;
}

const NewsCard = ({ title, excerpt, category, image, time, featured = false }: NewsCardProps) => {
  if (featured) {
    return (
      <article className="news-card-hover rounded-lg overflow-hidden bg-card border cursor-pointer" dir="rtl">
        <div className="relative h-64">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4">
            <span className="category-badge bg-primary text-white">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm text-news-category">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="news-card-hover flex gap-4 rounded-lg overflow-hidden bg-card border p-4 cursor-pointer" dir="rtl">
      <div className="relative w-32 h-24 flex-shrink-0 rounded-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="category-badge text-xs mb-2">
          {category}
        </span>
        <h3 className="text-base font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-news-category">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
