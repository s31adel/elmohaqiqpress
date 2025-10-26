import { useState } from "react";
import { Menu, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const categories = [
    { id: "home", label: "الرئيسية", href: "#" },
    { id: "algeria", label: "الجزائر", href: "#algeria" },
    { id: "world", label: "العالم", href: "#world" },
    { id: "sports", label: "الرياضة", href: "#sports" },
    { id: "economy", label: "الاقتصاد", href: "#economy" },
    { id: "tech", label: "التكنولوجيا", href: "#tech" },
    { id: "forum", label: "المنبر الحر", href: "#forum" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <a href="/" className="flex items-center gap-3">
              <img src={logo} alt="المحقق برس" className="h-12 w-auto" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t">
          <ul className="flex items-center justify-center gap-1 py-2" dir="rtl">
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
          <nav className="md:hidden border-t py-4" dir="rtl">
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
