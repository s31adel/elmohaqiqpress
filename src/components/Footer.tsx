import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img src={logo} alt="المحقق برس" className="h-16 w-auto mb-4" />
            <p className="text-secondary-foreground/80 mb-4 max-w-md">
              {t('footer.aboutText')}
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
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.sections')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">{t('nav.home')}</a></li>
              <li><a href="#algeria" className="text-secondary-foreground/80 hover:text-primary transition-colors">{t('nav.algeria')}</a></li>
              <li><a href="#world" className="text-secondary-foreground/80 hover:text-primary transition-colors">{t('nav.world')}</a></li>
              <li><a href="#sports" className="text-secondary-foreground/80 hover:text-primary transition-colors">{t('nav.sports')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-secondary-foreground/80">contact@elmohaqiq.press</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-secondary-foreground/80" dir="ltr">+213 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-secondary-foreground/80">{i18n.language === 'ar' ? 'الجزائر، العاصمة' : i18n.language === 'fr' ? 'Alger, Algérie' : 'Algiers, Algeria'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-secondary-foreground/60">
            © {new Date().getFullYear()} {i18n.language === 'ar' ? 'المحقق برس - جميع الحقوق محفوظة' : `Al-Muhaqiq Press - ${t('footer.rights')}`}
          </p>
          <div className="mt-2 flex justify-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
