import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Feature, Language } from '@/types/chatbot-types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FeatureSelectorProps {
  onSelectFeature: (feature: Feature) => void;
  language: Language;
  isExpanded?: boolean;
}

const featureLabels: Record<Language, Record<Feature, string>> = {
    en: {
        [Feature.ITINERARY]: 'Plan Itinerary',
        [Feature.SOUVENIR]: 'Find Souvenirs',
        [Feature.LOCATION]: 'Location Info',
        [Feature.LANGUAGE]: 'Language Help',
        [Feature.GENERAL]: 'General Chat',
    },
    hi: {
        [Feature.ITINERARY]: 'यात्रा योजना',
        [Feature.SOUVENIR]: 'स्मृति चिन्ह',
        [Feature.LOCATION]: 'स्थान जानकारी',
        [Feature.LANGUAGE]: 'भाषा सहायता',
        [Feature.GENERAL]: 'सामान्य चैट',
    },
    bn: {
        [Feature.ITINERARY]: 'ভ্রমণসূচী',
        [Feature.SOUVENIR]: 'স্মারক',
        [Feature.LOCATION]: 'স্থান তথ্য',
        [Feature.LANGUAGE]: 'ভাষা সহায়তা',
        [Feature.GENERAL]: 'সাধারণ চ্যাট',
    },
    mr: {
        [Feature.ITINERARY]: 'प्रवास योजना',
        [Feature.SOUVENIR]: 'स्मृतिचिन्हे',
        [Feature.LOCATION]: 'स्थान माहिती',
        [Feature.LANGUAGE]: 'भाषा मदत',
        [Feature.GENERAL]: 'सामान्य चॅट',
    },
    te: {
        [Feature.ITINERARY]: 'ప్రయాణ ప్రణాళిక',
        [Feature.SOUVENIR]: 'జ్ఞాపికలు',
        [Feature.LOCATION]: 'స్థాన సమాచారం',
        [Feature.LANGUAGE]: 'భాషా సహాయం',
        [Feature.GENERAL]: 'సాధారణ చాట్',
    },
    ta: {
        [Feature.ITINERARY]: 'பயணத்திட்டம்',
        [Feature.SOUVENIR]: 'நினைவுப்பொருள்',
        [Feature.LOCATION]: 'இட தகவல்',
        [Feature.LANGUAGE]: 'மொழி உதவி',
        [Feature.GENERAL]: 'பொது அரட்டை',
    }
};

const features = [
  { id: Feature.ITINERARY, icon: '🗺️' },
  { id: Feature.SOUVENIR, icon: '🛍️' },
  { id: Feature.LOCATION, icon: '📍' },
  { id: Feature.LANGUAGE, icon: '🌐' },
  { id: Feature.GENERAL, icon: '💬' },
];

const FeatureSelector: React.FC<FeatureSelectorProps> = ({ 
  onSelectFeature, 
  language, 
  isExpanded = false 
}) => {
  const [showFeatures, setShowFeatures] = useState(false);

  if (isExpanded) {
    // Expanded view - also make it collapsible for more message space
    return (
      <div className="mb-2">
        {/* Toggle Button for Expanded View */}
        <Button
          onClick={() => setShowFeatures(!showFeatures)}
          variant="outline"
          className="w-full flex items-center justify-between p-3 h-10 text-sm hover:bg-primary/10 transition-colors border-border"
        >
          <span className="flex items-center gap-2">
            <span>🎯</span>
            <span>Tourism Features</span>
          </span>
          {showFeatures ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>

        {/* Collapsible Feature Grid */}
        {showFeatures && (
          <div className="grid grid-cols-3 gap-3 mt-3 animate-in slide-in-from-top-2 duration-200">
            {features.map((feature) => (
              <Button
                key={feature.id}
                onClick={() => {
                  onSelectFeature(feature.id);
                  setShowFeatures(false); // Close after selection
                }}
                variant="outline"
                className="flex flex-col items-center justify-center text-center p-4 h-auto hover:bg-primary/10 transition-colors border-border"
              >
                <span className="text-2xl mb-2">
                  {feature.icon}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {featureLabels[language][feature.id]}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Minimized view - compact toggle design
  return (
    <div className="mb-2">
      {/* Toggle Button */}
      <Button
        onClick={() => setShowFeatures(!showFeatures)}
        variant="outline"
        className="w-full flex items-center justify-between p-2 h-8 text-xs hover:bg-primary/10 transition-colors border-border"
      >
        <span className="flex items-center gap-1">
          <span>🎯</span>
          <span>Features</span>
        </span>
        {showFeatures ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </Button>

      {/* Collapsible Feature Grid */}
      {showFeatures && (
        <div className="grid grid-cols-3 gap-1 mt-2 animate-in slide-in-from-top-2 duration-200">
          {features.map((feature) => (
            <Button
              key={feature.id}
              onClick={() => {
                onSelectFeature(feature.id);
                setShowFeatures(false); // Close after selection
              }}
              variant="outline"
              className="flex flex-col items-center justify-center text-center p-1 h-12 hover:bg-primary/10 transition-colors border-border"
            >
              <span className="text-sm mb-0.5">
                {feature.icon}
              </span>
              <span className="text-[10px] font-medium text-foreground leading-tight">
                {featureLabels[language][feature.id].split(' ')[0]}
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureSelector;