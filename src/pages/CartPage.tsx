import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OrderModal from '../components/OrderModal';
import { sendOrderEmail } from '../services/emailService';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const handleOrderSubmit = async (orderData: any) => {
    setIsSubmitting(true);
    try {
      console.log('Отправка заказа:', orderData);
      const success = await sendOrderEmail({
        ...orderData,
        totalPrice,
        items: cart.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        }))
      });

      if (success) {
        setSubmitStatus('success');
        clearCart();
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        console.error('Ошибка при отправке заказа');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка при обработке заказа:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Ваша корзина пуста
          </h2>
          <p className="text-gray-500 mb-8">
            Похоже, вы еще не добавили товары в корзину. Начните с просмотра наших товаров.
          </p>
          <Link 
            to="/products" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Перейти к покупкам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Корзина</h1>
      
      {/* Back button */}
      <Link 
        to="/products" 
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Продолжить покупки
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Товары в корзине ({cart.length})
              </h2>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => {
                // Calculate discounted price if applicable
                const finalPrice = item.product.discount 
                  ? item.product.price * (1 - item.product.discount / 100) 
                  : item.product.price;
                
                const itemTotal = finalPrice * item.quantity;
                
                return (
                  <li key={item.product.id} className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      {/* Product image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-6 mb-4 sm:mb-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                              {item.product.category === 'sink' ? 'Раковина' : 'Смеситель'}
                            </p>
                          </div>
                          
                          <div className="flex items-center sm:ml-4">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800"
                                aria-label="Уменьшить количество"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-gray-800 font-medium">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800"
                                aria-label="Увеличить количество"
                              >
                                +
                              </button>
                            </div>
                            
                            {/* Remove button */}
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-4 text-gray-400 hover:text-red-500"
                              aria-label="Удалить товар"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="flex justify-between items-center mt-3">
                          <div>
                            {item.product.discount ? (
                              <div className="flex items-center">
                                <span className="text-lg font-bold text-gray-800 mr-2">
                                  {finalPrice.toLocaleString()} ₽
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {item.product.price.toLocaleString()} ₽
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-gray-800">
                                {item.product.price.toLocaleString()} ₽
                              </span>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <span className="text-gray-600">Итого:</span>
                            <span className="ml-2 text-lg font-bold text-gray-800">
                              {itemTotal.toLocaleString()} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Сводка заказа
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Товары ({cart.length})</span>
                <span className="text-gray-800 font-medium">
                  {totalPrice.toLocaleString()} ₽
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span className="text-gray-800 font-medium">
                  {totalPrice >= 5000 ? 'Бесплатно' : '500 ₽'}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-gray-800 font-semibold">Итого</span>
                <span className="text-xl text-gray-800 font-bold">
                  {(totalPrice + (totalPrice >= 5000 ? 0 : 500)).toLocaleString()} ₽
                </span>
              </div>
            </div>
            
            {/* Promo code */}
            <div className="mb-6">
              <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                Промокод
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите промокод"
                />
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-r-lg transition-colors">
                  Применить
                </button>
              </div>
            </div>
            
            {/* Checkout button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-4"
            >
              Оформить заказ
            </button>
            
            {/* Secure checkout notice */}
            <div className="flex items-center justify-center text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>Безопасная оплата</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
        totalPrice={totalPrice + (totalPrice >= 5000 ? 0 : 500)}
      />

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Заказ успешно отправлен!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.
        </div>
      )}
    </div>
  );
};

export default CartPage;