import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  // Get featured products (first 4 products with high ratings)
  const featuredProducts = products
    .filter(product => product.rating >= 4.5)
    .slice(0, 4);

  // Get new arrivals
  const newArrivals = products
    .filter(product => product.new)
    .slice(0, 4);

  // Get products on sale
  const onSale = products
    .filter(product => product.discount)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury bathroom" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Sinks and Faucets for Your Home
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Create your dream bathroom with our collection of stylish and high-quality plumbing fixtures
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products/sinks" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {t('sinks')}
              </Link>
              <Link 
                to="/products/faucets" 
                className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {t('faucets')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {t('categories')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sinks Category */}
          <div className="relative rounded-lg overflow-hidden group h-80">
            <Link 
              to="/products/sinks" 
              className="flex items-center text-white font-medium group"
            >
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt={t('sinks')} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('sinks')}</h3>
                <p className="text-gray-200 mb-4">
                  A wide selection of stylish and functional sinks for your bathroom
                </p>
                <div className="flex items-center text-white font-medium group">
                  <span>{t('viewAll')} {t('sinks')}</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Faucets Category */}
          <div className="relative rounded-lg overflow-hidden group h-80">
            <Link 
              to="/products/faucets" 
              className="flex items-center text-white font-medium group"
            >
              <img 
                src="/images/Dorsa Single-Lever Bath Mixer Chrome/photo_1_2025-03-07_13-16-22.jpg" 
                alt={t('faucets')} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('faucets')}</h3>
                <p className="text-gray-200 mb-4">
                  Elegant and reliable faucets for sinks, bathtubs and showers
                </p>
                <div className="flex items-center text-white font-medium group">
                  <span>{t('viewAll')} {t('faucets')}</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {t('featuredProducts')}
          </h2>
          <Link 
            to="/products" 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {t('newArrivals')}
            </h2>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </section>
      )}

      {/* Sale Products */}
      {onSale.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {t('saleProducts')}
            </h2>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <ProductGrid products={onSale} />
        </section>
      )}

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          {t('whyChooseUs')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('quality')}</h3>
            <p className="text-gray-600">
              {t('qualityDescription')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('fastDelivery')}</h3>
            <p className="text-gray-600">
              {t('fastDeliveryDescription')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('securePayment')}</h3>
            <p className="text-gray-600">
              {t('securePaymentDescription')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('customerSupport')}</h3>
            <p className="text-gray-600">
              {t('customerSupportDescription')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;