import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Droplets, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Droplets className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Bora</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
              Главная
            </Link>
            <Link to="/products/sinks" className="text-gray-600 hover:text-blue-600 font-medium">
              Раковины
            </Link>
            <Link to="/products/faucets" className="text-gray-600 hover:text-blue-600 font-medium">
              Смесители
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">
              Все товары
            </Link>
          </nav>

          {/* Search, Favorites and Cart */}
          <div className="flex items-center space-x-4">
            <form 
              onSubmit={handleSearch}
              className="hidden md:flex items-center relative"
            >
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute left-3 text-gray-400 hover:text-blue-500"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
            
            <Link to="/favorites" className="relative">
              <Heart className="h-6 w-6 text-gray-600 hover:text-red-500" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form 
              onSubmit={handleSearch}
              className="flex items-center relative mb-4"
            >
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute left-3 text-gray-400 hover:text-blue-500"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/products/sinks" 
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Раковины
              </Link>
              <Link 
                to="/products/faucets" 
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Смесители
              </Link>
              <Link 
                to="/products" 
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Все товары
              </Link>
              <Link 
                to="/favorites" 
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Избранное
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;