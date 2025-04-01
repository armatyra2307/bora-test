import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;