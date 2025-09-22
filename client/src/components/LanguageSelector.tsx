import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages, Language } from '@/types/chatbot-types';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  isExpanded?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange, 
  isExpanded = false 
}) => {
  return (
    <div className={`flex ${isExpanded ? 'flex-wrap gap-2' : 'flex-col gap-1'} mb-2`}>
      <div className="flex items-center gap-2 mb-2">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {isExpanded ? 'Select Language:' : 'Language'}
        </span>
      </div>
      <div className={`flex ${isExpanded ? 'flex-wrap gap-2' : 'flex-col gap-1'}`}>
        {Languages.map((lang) => (
          <Button
            key={lang.id}
            onClick={() => onLanguageChange(lang.id)}
            variant={selectedLanguage === lang.id ? "default" : "outline"}
            size="sm"
            className={`${isExpanded ? 'min-w-0 px-3 py-1' : 'w-full'} text-xs transition-colors`}
          >
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;