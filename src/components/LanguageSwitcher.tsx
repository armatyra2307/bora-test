import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
      aria-label={`Switch to ${i18n.language === 'ru' ? 'English' : 'Russian'}`}
      role="button"
      tabIndex={0}
    >
      <Globe className="h-5 w-5" aria-hidden="true" />
      <span className="text-sm font-medium">{i18n.language === 'ru' ? 'EN' : 'RU'}</span>
    </button>
  );
};

export default React.memo(LanguageSwitcher); 