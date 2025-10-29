import { useTranslation } from "react-i18next";

interface AdZoneProps {
  className?: string;
}

const AdZone = ({ className = "" }: AdZoneProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`bg-muted border border-border rounded-lg p-8 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col items-center justify-center gap-4 min-h-[250px]">
        <div className="text-muted-foreground text-center">
          <p className="text-lg font-semibold mb-2">
            {isRTL ? 'مساحة إعلانية' : 'Espace publicitaire'}
          </p>
          <p className="text-sm">
            {isRTL ? 'للإعلان هنا اتصل بنا' : 'Pour annoncer ici, contactez-nous'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdZone;
