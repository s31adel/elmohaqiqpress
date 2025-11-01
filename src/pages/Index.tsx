import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import NewsTicker from "@/components/NewsTicker";
import HeroCarousel from "@/components/HeroCarousel";
import CarouselNewsColumn from "@/components/CarouselNewsColumn";
import NewsCard from "@/components/NewsCard";
import AdZone from "@/components/AdZone";
import Flipbook from "@/components/Flipbook";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const heroCarouselNews = [
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

  const featuredNews = [
    {
      id: "featured-1",
      title: "وزير الخارجية يجري مباحثات مهمة مع نظيره الفرنسي في باريس",
      excerpt: "في إطار تعزيز العلاقات الثنائية، أجرى وزير الخارجية الجزائري سلسلة من اللقاءات الدبلوماسية المهمة",
      category: "سياسة",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      time: "منذ ساعتين"
    },
    {
      id: "featured-2",
      title: "ارتفاع ملحوظ في صادرات الجزائر من المنتجات الفلاحية",
      excerpt: "سجلت الجزائر نموا كبيرا في صادراتها الزراعية خلال الربع الأول من العام الجاري",
      category: "الاقتصاد",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
      time: "منذ 3 ساعات"
    },
    {
      id: "featured-3",
      title: "افتتاح معرض دولي للتكنولوجيا والابتكار بالعاصمة",
      excerpt: "تنطلق اليوم فعاليات المعرض الدولي للتكنولوجيا بمشاركة أكثر من 200 شركة عالمية",
      category: "التكنولوجيا",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      time: "منذ 4 ساعات"
    }
  ];

  const algeriaNews = [
    {
      id: "algeria-1",
      title: "رئيس الجمهورية يستقبل وفدا برلمانيا أوروبيا رفيع المستوى",
      excerpt: "بحث اللقاء سبل تعزيز التعاون البرلماني والاقتصادي بين الجانبين",
      category: "الجزائر",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
      time: "منذ ساعة"
    },
    {
      id: "algeria-2",
      title: "إطلاق مبادرة وطنية لدعم الشباب وتشجيع المقاولاتية",
      excerpt: "تهدف المبادرة إلى تمويل المشاريع الناشئة وتوفير فرص عمل جديدة",
      category: "الجزائر",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      time: "منذ ساعتين"
    },
    {
      id: "algeria-3",
      title: "افتتاح مستشفى جامعي جديد بتجهيزات عالية التقنية",
      excerpt: "يعد المستشفى الجديد من أحدث المرافق الصحية في المنطقة",
      category: "الجزائر",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      time: "منذ 5 ساعات"
    }
  ];

  const worldNews = [
    {
      id: "world-1",
      title: "اتفاق تاريخي بين القوى الكبرى حول المناخ",
      excerpt: "توصلت الدول المشاركة في القمة إلى اتفاق شامل للحد من الانبعاثات الكربونية",
      category: "العالم",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop",
      time: "منذ ساعة"
    },
    {
      id: "world-2",
      title: "تطورات جديدة في الأزمة الاقتصادية العالمية",
      excerpt: "المؤسسات المالية الدولية تتخذ إجراءات لمواجهة التحديات الاقتصادية",
      category: "العالم",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
      time: "منذ 3 ساعات"
    }
  ];

  const sportsNews = [
    {
      id: "sports-1",
      title: "المنتخب الوطني يفوز بثنائية نظيفة في مباراة ودية",
      excerpt: "حقق الخضر انتصارا مهما في إطار التحضيرات للاستحقاقات القادمة",
      category: "الرياضة",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      time: "منذ ساعتين"
    },
    {
      id: "sports-2",
      title: "بطولة أفريقيا لألعاب القوى: ميداليات جديدة للجزائر",
      excerpt: "واصل الرياضيون الجزائريون تألقهم في البطولة القارية",
      category: "الرياضة",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      time: "منذ 4 ساعات"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <NewsTicker />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Carousel */}
          <div className="mb-6">
            <HeroCarousel newsItems={heroCarouselNews} />
          </div>
          
          {/* Related News Strip */}
          <div>
            <CarouselNewsColumn newsItems={heroCarouselNews} />
          </div>
          
          {/* Ad Zone */}
          <AdZone className="my-8" />

          {/* Featured News */}
          <section className="mt-12" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-primary rounded-full"></span>
              {t('sections.featured')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredNews.map((news, index) => (
                <NewsCard key={index} {...news} featured />
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          {/* Algeria Section */}
          <section className="mt-12" dir={isRTL ? 'rtl' : 'ltr'} id="algeria">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              {t('sections.algeria')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {algeriaNews.map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          {/* World Section */}
          <section className="mt-12" dir={isRTL ? 'rtl' : 'ltr'} id="world">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-primary rounded-full"></span>
              {t('sections.world')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {worldNews.map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          {/* Sports Section */}
          <section className="mt-12" dir={isRTL ? 'rtl' : 'ltr'} id="sports">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              {t('sections.sports')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sportsNews.map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
          </section>

          {/* Ad Zone */}
          <AdZone className="my-12" />
        </div>
      </main>

      {/* Flipbook Section */}
      <Flipbook />

      <Footer />
    </div>
  );
};

export default Index;
