import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Calculate discounted price if applicable
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.new && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                Новинка
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                Нет в наличии
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-500 hover:text-white"
                aria-label="Добавить в корзину"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={handleToggleFavorite}
              className={`bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500 hover:text-white ${
                isInFavorites(product.id) ? 'text-red-500' : 'text-gray-600'
              }`}
              aria-label="Добавить в избранное"
            >
              <Heart className={`h-5 w-5 ${isInFavorites(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
              {product.name}
            </h3>
          </div>
          
          <p className="text-sm text-gray-500 mb-2">
            {product.category === 'sink' ? 'Раковина' : 'Смеситель'}
          </p>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-500">{product.reviews} отзывов</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              {product.discount ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-gray-800">
                    {finalPrice.toLocaleString()} ₽
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {product.price.toLocaleString()} ₽
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  {product.price.toLocaleString()} ₽
                </span>
              )}
            </div>
            
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;