import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
}

interface HeroCarouselProps {
  newsItems?: NewsItem[];
}

const HeroCarousel = ({ newsItems }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultNews: NewsItem[] = [
    {
      id: 1,
      title: "الجزائر تحقق إنجازات اقتصادية جديدة في قطاع الطاقة المتجددة",
      category: "الاقتصاد",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop",
      excerpt: "تواصل الجزائر تعزيز استثماراتها في مجال الطاقة المتجددة مع افتتاح محطات جديدة للطاقة الشمسية"
    },
    {
      id: 2,
      title: "المنتخب الوطني يستعد لمواجهة حاسمة في تصفيات كأس العالم",
      category: "الرياضة",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=600&fit=crop",
      excerpt: "يواصل المنتخب الوطني الجزائري تحضيراته المكثفة للقاء المرتقب ضمن التصفيات القارية"
    },
    {
      id: 3,
      title: "تطورات تكنولوجية مهمة في قطاع الذكاء الاصطناعي بالجزائر",
      category: "التكنولوجيا",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
      excerpt: "شهدت الساحة التكنولوجية الجزائرية إطلاق مشاريع جديدة في مجال الذكاء الاصطناعي والابتكار"
    },
    {
      id: 4,
      title: "قمة دولية تناقش التحديات المناخية والتنمية المستدامة",
      category: "العالم",
      image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=1200&h=600&fit=crop",
      excerpt: "انطلقت فعاليات القمة الدولية للمناخ بمشاركة واسعة من قادة العالم لمناقشة التحديات البيئية"
    }
  ];

  const heroNews = newsItems || defaultNews;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroNews.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [heroNews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroNews.length) % heroNews.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg group" dir="rtl">
      {heroNews.map((news, index) => (
        <div
          key={news.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12">
              <span className="category-badge mb-4">
                {news.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {news.title}
              </h2>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl">
                {news.excerpt}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 text-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 text-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroNews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
