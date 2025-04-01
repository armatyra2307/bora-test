import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: OrderData) => Promise<boolean>;
  totalPrice: number;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSubmit, totalPrice }) => {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const success = await onSubmit(formData);
      if (!success) {
        setError('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.');
      }
    } catch (error) {
      setError('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при отправке формы:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      comment: ''
    });
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Оформление заказа</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              pattern="[0-9+\s()-]*"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Адрес доставки
            </label>
            <textarea
              id="address"
              name="address"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Комментарий к заказу
            </label>
            <textarea
              id="comment"
              name="comment"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Итого к оплате:</span>
              <span className="text-xl font-bold text-gray-800">
                {totalPrice.toLocaleString()} ₽
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.address}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Отправка заказа...
              </>
            ) : (
              'Подтвердить заказ'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal; 