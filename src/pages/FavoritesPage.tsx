import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/ProductGrid';
import { useTranslation } from 'react-i18next';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {t('emptyFavorites')}
          </h2>
          <p className="text-gray-500 mb-8">
            Add your favorite products to favorites to keep track of them.
          </p>
          <Link 
            to="/products" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('favorites')}</h1>
      
      <Link 
        to="/products" 
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        {t('continueShopping')}
      </Link>

      <ProductGrid products={favorites} />
    </div>
  );
};

export default FavoritesPage;