import { useTranslation } from "react-i18next";
import { useState } from "react";

interface AdZoneProps {
  className?: string;
  adType?: "image" | "video" | "placeholder";
  adUrl?: string;
  adLink?: string;
}

const AdZone = ({ 
  className = "", 
  adType = "placeholder",
  adUrl = "",
  adLink = ""
}: AdZoneProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [imageError, setImageError] = useState(false);

  const renderAdContent = () => {
    if (adType === "placeholder" || !adUrl) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[250px]">
          <div className="text-muted-foreground text-center">
            <p className="text-lg font-semibold mb-2">
              {t('adZone.title')}
            </p>
            <p className="text-sm">
              {t('adZone.contact')}
            </p>
          </div>
        </div>
      );
    }

    if (adType === "image") {
      const imageContent = (
        <img 
          src={adUrl} 
          alt={t('adZone.title')}
          className="w-full h-auto max-h-[400px] object-contain rounded-lg"
          onError={() => setImageError(true)}
        />
      );

      if (imageError) {
        return (
          <div className="flex items-center justify-center min-h-[250px] text-muted-foreground">
            <p>{t('adZone.error', { defaultValue: 'Failed to load advertisement' })}</p>
          </div>
        );
      }

      return adLink ? (
        <a href={adLink} target="_blank" rel="noopener noreferrer" className="block">
          {imageContent}
        </a>
      ) : imageContent;
    }

    if (adType === "video") {
      return (
        <div className="w-full">
          <video 
            src={adUrl}
            controls
            className="w-full h-auto max-h-[400px] rounded-lg"
            onError={() => setImageError(true)}
          >
            {t('adZone.videoNotSupported', { defaultValue: 'Your browser does not support the video tag.' })}
          </video>
        </div>
      );
    }
  };

  return (
    <div className={`bg-muted border border-border rounded-lg p-4 md:p-8 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {renderAdContent()}
    </div>
  );
};

export default AdZone;
