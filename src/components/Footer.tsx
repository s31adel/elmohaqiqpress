import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const footerSections = [
    {
      title: "أقسام الموقع",
      links: ["الرئيسية", "الجزائر", "العالم", "الرياضة", "الاقتصاد", "التكنولوجيا"]
    },
    {
      title: "من نحن",
      links: ["عن المحقق برس", "اتصل بنا", "سياسة الخصوصية", "شروط الاستخدام"]
    }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-16" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img src={logo} alt="المحقق برس" className="h-16 w-auto mb-4" />
            <p className="text-secondary-foreground/80 mb-4 max-w-md">
              المحقق برس - منصة إخبارية شاملة تقدم آخر الأخبار من الجزائر والعالم في مختلف المجالات بمصداقية واحترافية عالية.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-secondary-foreground/80 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-secondary-foreground/80">الجزائر، العاصمة</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-secondary-foreground/80" dir="ltr">+213 XXX XXX XXX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-secondary-foreground/80">contact@elmohaqiq.press</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-secondary-foreground/60">
            © {new Date().getFullYear()} المحقق برس - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
