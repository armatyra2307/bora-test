import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-8">
        {t('pageNotFound')}
      </h2>
      <p className="text-gray-500 mb-8">
        {t('pageNotFoundDescription')}
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        {t('backToHome')}
      </Link>
    </div>
  );
};

export default NotFoundPage; 