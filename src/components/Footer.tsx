import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Droplets className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Bora</span>
            </div>
            <p className="text-gray-300 mb-4">
              Премиальные раковины и смесители для вашего дома. Качество, стиль и надежность.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Главная</Link>
              </li>
              <li>
                <Link to="/products/sinks" className="text-gray-300 hover:text-white">Раковины</Link>
              </li>
              <li>
                <Link to="/products/faucets" className="text-gray-300 hover:text-white">Смесители</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">Все товары</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Обслуживание клиентов</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Доставка и оплата</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Возврат и обмен</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Гарантия</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Часто задаваемые вопросы</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-300">ул. Водопроводная, 123, Москва</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@aquastyle.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bora. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;