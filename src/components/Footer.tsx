import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Shield, Truck, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Bora</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Premium plumbing fixtures for your home.
            </p>
          </div>

          {/* Contacts */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">{t('contacts')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start group">
                <div className="bg-white/5 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 group-hover:bg-white/10 transition-all duration-300">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-white">+7 (918) 555-61-86</p>
                  <p className="text-xs text-gray-400 mt-0.5">Daily from 8:00 to 20:00</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-white/5 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 group-hover:bg-white/10 transition-all duration-300">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-white">ug_reg@mail.ru</p>
                  <p className="text-xs text-gray-400 mt-0.5">We'll respond within an hour</p>
                </div>
              </li>
              <li className="hidden lg:flex items-start group">
                <div className="bg-white/5 p-2 rounded-lg mr-3 group-hover:bg-white/10 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-base font-medium text-white">Rostov-on-Don, Example St., 123</p>
                  <p className="text-xs text-gray-400 mt-0.5">On the map</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">{t('menu')}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mr-1.5 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mr-1.5 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('catalog')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mr-1.5 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('aboutUs')}
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link 
                  to="/delivery" 
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('delivery')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="hidden lg:block space-y-4">
            <h3 className="text-lg font-semibold text-white">Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <div className="bg-white/5 p-2 rounded-lg mr-3 group-hover:bg-white/10 transition-all duration-300">
                  <Truck className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-base font-medium text-white">Free shipping</p>
                  <p className="text-xs text-gray-400 mt-0.5">For orders over 5000 ₽</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-white/5 p-2 rounded-lg mr-3 group-hover:bg-white/10 transition-all duration-300">
                  <Shield className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-base font-medium text-white">Quality guarantee</p>
                  <p className="text-xs text-gray-400 mt-0.5">On all products</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-white/5 p-2 rounded-lg mr-3 group-hover:bg-white/10 transition-all duration-300">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-base font-medium text-white">Fast delivery</p>
                  <p className="text-xs text-gray-400 mt-0.5">1-3 business days</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-xs sm:text-sm text-gray-400">
              © 2024 Bora. {t('allRightsReserved')}
            </div>
            <div className="flex space-x-4 sm:space-x-6 mt-3 sm:mt-0">
              <Link to="" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                {t('privacyPolicy')}
              </Link>
              <Link to="" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                {t('termsOfUse')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;