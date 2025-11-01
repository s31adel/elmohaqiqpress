import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import logo from "@/assets/elmohaqiq-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const categories = [
    { id: "home", label: t('nav.home'), href: "#" },
    { id: "local", label: t('nav.local'), href: "#local" },
    { id: "algeria", label: t('nav.algeria'), href: "#algeria" },
    { id: "world", label: t('nav.world'), href: "#world" },
    { id: "sports", label: t('nav.sports'), href: "#sports" },
    { id: "economy", label: t('nav.economy'), href: "#economy" },
    { id: "forum", label: t('nav.forum'), href: "#forum" },
  ];

  const isRTL = i18n.language === 'ar';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      {/* Full-width Logo Bar */}
      <div className="w-full bg-primary border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <a href="/" className="block w-full max-w-md">
              <img 
                src={logo} 
                alt="المحقق برس" 
                className="h-32 md:h-40 w-auto mx-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </a>
          </div>
          <div className="absolute right-4 top-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Mobile Menu Button */}
        <div className="flex h-12 items-center justify-between md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center justify-center gap-1 py-2" dir={isRTL ? 'rtl' : 'ltr'}>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={category.href}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-news-hover rounded-md transition-colors"
                >
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t py-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={category.href}
                    className="block px-4 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-news-hover rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
