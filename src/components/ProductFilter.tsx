import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X } from 'lucide-react';

interface ProductFilterProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<Record<string, string[]>>({
    material: [],
    style: [],
    price: [],
  });

  const handleFilterChange = (category: string, value: string) => {
    const newFilters = { ...filters };
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter((v) => v !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const newFilters = {
      material: [],
      style: [],
      price: [],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t('filters')}</h3>
          <button 
          onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
          {t('resetAll')}
          </button>
      </div>

      {/* Material Filter */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">{t('material')}</h4>
        <div className="space-y-2">
          {['ceramic', 'artificialStone', 'stainlessSteel', 'brass', 'marble'].map((material) => (
            <label key={material} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.material.includes(material)}
                onChange={() => handleFilterChange('material', material)}
                className="mr-2"
              />
              {t(material)}
            </label>
          ))}
        </div>
      </div>

      {/* Style Filter */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">{t('style')}</h4>
        <div className="space-y-2">
          {['modern', 'classic', 'minimalist', 'retro', 'loft'].map((style) => (
            <label key={style} className="flex items-center">
                      <input
                        type="checkbox"
                checked={filters.style.includes(style)}
                onChange={() => handleFilterChange('style', style)}
                className="mr-2"
              />
              {t(style)}
                      </label>
          ))}
                    </div>
              </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">{t('price')}</h4>
        <div className="space-y-2">
          {['under5000', 'from5000to10000', 'from10000to15000', 'over15000'].map((price) => (
            <label key={price} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.price.includes(price)}
                onChange={() => handleFilterChange('price', price)}
                className="mr-2"
              />
              {t(price)}
            </label>
          ))}
          </div>
      </div>
    </div>
  );
};

export default ProductFilter;