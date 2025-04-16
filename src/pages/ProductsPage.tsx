import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import ProductFilter from '../components/ProductFilter';
import { getProductsByCategory } from '../data/products';
import { Product } from '../types';
import { SlidersHorizontal, X } from 'lucide-react';

const ProductsPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // Мемоизация фильтрации и сортировки
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Применяем поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.specifications.Материал?.toString().toLowerCase().includes(query) ||
        product.specifications.Цвет?.toString().toLowerCase().includes(query) ||
        product.specifications["Стилистика дизайна"]?.toString().toLowerCase().includes(query)
      );
    }
    
    // Применяем сортировку
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter(p => p.new).concat(result.filter(p => !p.new));
        break;
      default:
        result.sort((a, b) => a.id - b.id);
    }
    
    return result;
  }, [products, searchQuery, sortOption]);

  // Загрузка продуктов
  useEffect(() => {
    let categoryType: 'sink' | 'faucet' | 'all' = 'all';
    
    if (category === 'sinks') categoryType = 'sink';
    else if (category === 'faucets') categoryType = 'faucet';
    
    const fetchedProducts = getProductsByCategory(categoryType);
    setProducts(fetchedProducts);
  }, [category]);

  const handleFilterChange = useCallback((filters: Record<string, string[]>) => {
    // Здесь будет логика фильтрации
    console.log('Filters changed:', filters);
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  const pageTitle = useMemo(() => {
    if (searchQuery) return `Поиск: ${searchQuery}`;
    if (category === 'sinks') return 'Раковины';
    if (category === 'faucets') return 'Смесители';
    return 'Все товары';
  }, [searchQuery, category]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">{pageTitle}</h1>
      
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-3">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-700 text-sm font-medium"
        >
          {showFilters ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Скрыть фильтры
            </>
          ) : (
            <>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Показать фильтры
            </>
          )}
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Filters - desktop always visible, mobile toggleable */}
        <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </aside>
        
        {/* Products */}
        <div className="lg:w-3/4">
          {/* Sort options */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-600">
              Найдено товаров: <span className="font-medium">{filteredProducts.length}</span>
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm sm:text-base text-gray-600 mr-2">
                Сортировать:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border rounded-md py-1.5 px-2 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="rating-desc">По рейтингу</option>
                <option value="newest">Сначала новинки</option>
              </select>
            </div>
          </div>
          
          {/* Product grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;