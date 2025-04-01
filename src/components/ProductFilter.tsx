import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  isOpen: boolean;
}

interface ProductFilterProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    {
      title: 'Категория',
      options: [
        { label: 'Раковины', value: 'sink' },
        { label: 'Смесители', value: 'faucet' }
      ],
      isOpen: true
    },
    {
      title: 'Материал',
      options: [
        { label: 'Керамика', value: 'ceramic' },
        { label: 'Искусственный камень', value: 'artificial-stone' },
        { label: 'Нержавеющая сталь', value: 'stainless-steel' },
        { label: 'Латунь', value: 'brass' },
        { label: 'Мрамор', value: 'marble' }
      ],
      isOpen: true
    },
    {
      title: 'Стиль',
      options: [
        { label: 'Современный', value: 'modern' },
        { label: 'Классический', value: 'classic' },
        { label: 'Минимализм', value: 'minimalist' },
        { label: 'Ретро', value: 'retro' },
        { label: 'Лофт', value: 'loft' }
      ],
      isOpen: true
    },
    {
      title: 'Цена',
      options: [
        { label: 'До 5000 ₽', value: 'under-5000' },
        { label: '5000 - 10000 ₽', value: '5000-10000' },
        { label: '10000 - 15000 ₽', value: '10000-15000' },
        { label: 'Более 15000 ₽', value: 'over-15000' }
      ],
      isOpen: true
    }
  ]);

  const toggleSection = (index: number) => {
    setFilterSections(sections => 
      sections.map((section, i) => 
        i === index ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  };

  const handleFilterChange = (sectionTitle: string, value: string) => {
    setActiveFilters(prev => {
      const sectionFilters = prev[sectionTitle] || [];
      
      // Toggle the filter value
      const updatedSectionFilters = sectionFilters.includes(value)
        ? sectionFilters.filter(v => v !== value)
        : [...sectionFilters, value];
      
      const updatedFilters = {
        ...prev,
        [sectionTitle]: updatedSectionFilters
      };
      
      // Remove empty arrays
      if (updatedSectionFilters.length === 0) {
        delete updatedFilters[sectionTitle];
      }
      
      // Call the parent component's filter change handler
      onFilterChange(updatedFilters);
      
      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">Фильтры</h3>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Сбросить все
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filterSections.map((section, index) => (
          <div key={section.title} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <button 
              className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-2"
              onClick={() => toggleSection(index)}
            >
              {section.title}
              {section.isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {section.isOpen && (
              <div className="space-y-2 mt-2">
                {section.options.map(option => {
                  const isChecked = (activeFilters[section.title] || []).includes(option.value);
                  
                  return (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option.value}
                        checked={isChecked}
                        onChange={() => handleFilterChange(section.title, option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={option.value} className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;