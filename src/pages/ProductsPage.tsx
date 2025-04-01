import React, { useState, useEffect } from 'react';
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    // Get products based on category from URL or all products
    let categoryType: 'sink' | 'faucet' | 'all' = 'all';
    
    if (category === 'sinks') categoryType = 'sink';
    else if (category === 'faucets') categoryType = 'faucet';
    
    const fetchedProducts = getProductsByCategory(categoryType);
    
    // Apply search filter if search query exists
    let filtered = fetchedProducts;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = fetchedProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.specifications.Материал?.toString().toLowerCase().includes(query) ||
        product.specifications.Цвет?.toString().toLowerCase().includes(query) ||
        product.specifications["Стилистика дизайна"]?.toString().toLowerCase().includes(query)
      );
    }
    
    setProducts(fetchedProducts);
    setFilteredProducts(filtered);
  }, [category, searchQuery]);

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    
    // Apply filters and search
    let result = [...products];
    
    // Apply search filter
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
    
    // Apply other filters
    // This is where you would add additional filter logic
    
    setFilteredProducts(result);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);
    
    let sorted = [...filteredProducts];
    
    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted = sorted.filter(p => p.new).concat(sorted.filter(p => !p.new));
        break;
      default:
        // Default sorting (by id)
        sorted.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(sorted);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Get page title based on category or search
  let pageTitle = searchQuery 
    ? `Поиск: ${searchQuery}`
    : category === 'sinks' 
      ? 'Раковины' 
      : category === 'faucets' 
        ? 'Смесители' 
        : 'Все товары';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{pageTitle}</h1>
      
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-center w-full py-2 px-4 bg-gray-100 rounded-lg text-gray-700 font-medium"
        >
          {showFilters ? (
            <>
              <X className="h-5 w-5 mr-2" />
              Скрыть фильтры
            </>
          ) : (
            <>
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Показать фильтры
            </>
          )}
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - desktop always visible, mobile toggleable */}
        <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </aside>
        
        {/* Products */}
        <div className="lg:w-3/4">
          {/* Sort options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Найдено товаров: <span className="font-medium">{filteredProducts.length}</span>
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-600 mr-2">
                Сортировать:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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