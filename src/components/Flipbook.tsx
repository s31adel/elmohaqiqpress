import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const Flipbook = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="py-12 bg-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          {t('flipbook.title')}
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8 mb-6 min-h-[600px] flex items-center justify-center relative">
            {/* Placeholder for PDF viewer */}
            <div className="text-center text-muted-foreground">
              <BookOpen className="h-24 w-24 mx-auto mb-4 text-primary/30" />
              <p className="text-xl font-semibold mb-2">
                {t('flipbook.page', { current: currentPage, total: totalPages })}
              </p>
              <p className="text-sm">
                {t('flipbook.content')}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={isRTL ? nextPage : prevPage}
              disabled={isRTL ? currentPage >= totalPages : currentPage <= 1}
              variant="outline"
              size="lg"
            >
              <ChevronRight className="h-5 w-5" />
              {t('flipbook.next')}
            </Button>
            
            <span className="text-sm text-muted-foreground px-4">
              {currentPage} / {totalPages}
            </span>
            
            <Button
              onClick={isRTL ? prevPage : nextPage}
              disabled={isRTL ? currentPage <= 1 : currentPage >= totalPages}
              variant="outline"
              size="lg"
            >
              {t('flipbook.previous')}
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flipbook;
