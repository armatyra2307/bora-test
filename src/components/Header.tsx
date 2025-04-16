import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Droplets, Heart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const totalItems = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      } else if (window.location.pathname === '/products') {
        navigate('/products');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, navigate]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleMobileSearch = useCallback(() => {
    setShowMobileSearch(prev => !prev);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              Bora
            </span>
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
            >
              {t('home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
            >
              {t('catalog')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Поиск и корзина */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3" />
            </div>

            <button 
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
              onClick={toggleMobileSearch}
            >
              <Search className="h-5 w-5" />
            </button>

            <LanguageSwitcher />

            <Link 
              to="/favorites" 
              className="hidden md:block relative p-2 text-gray-600 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 relative"
              aria-label={t('cart')}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label={t('profile')}
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>

            <button 
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Мобильный поиск */}
        {showMobileSearch && (
          <div className="md:hidden py-3">
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3" />
            </div>
          </div>
        )}

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 py-2 text-sm font-medium"
                >
                  {t('home')}
                </Link>
                <Link 
                  to="/products" 
                  className="text-gray-700 hover:text-blue-600 py-2 text-sm font-medium"
                >
                  {t('catalog')}
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-blue-600 py-2 text-sm font-medium"
                >
                  {t('about')}
                </Link>
                <Link 
                  to="/delivery" 
                  className="text-gray-700 hover:text-blue-600 py-2 text-sm font-medium"
                >
                  {t('delivery')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);