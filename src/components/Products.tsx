import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  if (loading) return <div className="container mx-auto px-4 py-8">Загрузка...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>
      {searchQuery && (
        <div className="mb-4">
          <p className="text-gray-600">
            Результаты поиска по запросу: "{searchQuery}"
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link to={`/products/${product.id}`} className="block">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{product.price} ₽</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      if (isFavorite(product.id)) {
                        removeFromFavorites(product.id);
                      } else {
                        addToFavorites(product);
                      }
                    }}
                    className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                      isFavorite(product.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-1.5 sm:p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Товары не найдены</p>
        </div>
      )}
    </div>
  );
};

export default Products; 