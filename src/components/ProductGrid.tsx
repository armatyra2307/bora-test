import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => new Set(prev).add(imageUrl));
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Товары не найдены
        </h2>
        <p className="text-gray-500">
          К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map(product => {
          const isFavorite = favorites.some(fav => fav.id === product.id);
          
          return (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      loadedImages.has(product.imageUrl) ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(product.imageUrl)}
                  />
                  {!loadedImages.has(product.imageUrl) && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                  )}
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                </Link>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {product.discount && (
                      <span className="text-sm text-red-500 line-through">
                        {product.discount.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        isFavorite 
                          ? 'text-red-500 hover:bg-red-50' 
                          : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ProductGrid);