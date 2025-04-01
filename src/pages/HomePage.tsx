import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const HomePage = () => {
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
              Премиальные раковины и смесители для вашего дома
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Создайте ванную комнату своей мечты с нашей коллекцией стильных и качественных сантехнических изделий
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products/sinks" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Смотреть раковины
              </Link>
              <Link 
                to="/products/faucets" 
                className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Смотреть смесители
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Наши категории
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sinks Category */}
          <div className="relative rounded-lg overflow-hidden group h-80" >
            <Link 
              to="/products/sinks" 
              className="flex items-center text-white font-medium group"
            >
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Раковины" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Раковины</h3>
              <p className="text-gray-200 mb-4">
                Широкий выбор стильных и функциональных раковин для вашей ванной комнаты
              </p>
              <div className="flex items-center text-white font-medium group">
                <span>Смотреть все раковины</span>
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
              src="Смесители иран/Dorsa Single-Lever Bath Mixer Chrome/photo_1_2025-03-07_13-16-22.jpg" 
              alt="Смесители" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Смесители</h3>
              <p className="text-gray-200 mb-4">
                Элегантные и надежные смесители для раковин, ванн и душевых
              </p>
              <div className="flex items-center text-white font-medium group">
                <span>Смотреть все смесители</span>
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
            Популярные товары
          </h2>
          <Link 
            to="/products" 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <span>Смотреть все</span>
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
              Новинки
            </h2>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <span>Смотреть все</span>
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
              Товары со скидкой
            </h2>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <span>Смотреть все</span>
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <ProductGrid products={onSale} />
        </section>
      )}

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Почему выбирают нас
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Качество</h3>
            <p className="text-gray-600">
              Мы предлагаем только высококачественные товары от проверенных производителей
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Быстрая доставка</h3>
            <p className="text-gray-600">
              Доставляем заказы в кратчайшие сроки по всей России
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Гарантия</h3>
            <p className="text-gray-600">
              На все товары предоставляется гарантия от производителя
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Поддержка</h3>
            <p className="text-gray-600">
              Наши специалисты всегда готовы помочь с выбором и ответить на вопросы
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Подпишитесь на наши новости
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Будьте в курсе новых поступлений, акций и специальных предложений
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-lg font-medium transition-colors"
            >
              Подписаться
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;