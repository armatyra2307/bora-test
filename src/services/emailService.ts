import emailjs from '@emailjs/browser';

// Инициализация EmailJS
emailjs.init('Yl0jc0DjY9rYa0FVR');

const EMAIL_SERVICE_ID = 'service_mp55xba';
const EMAIL_TEMPLATE_ID = 'template_uu42zk6';
const EMAIL_PUBLIC_KEY = 'Yl0jc0DjY9rYa0FVR';

export interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  totalPrice: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const sendOrderEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    console.log('Отправка заказа:', orderData);
    
    const templateParams = {
      to_name: orderData.name,
      to_email: 'battel.net2022@mail.ru',
      from_name: orderData.name,
      from_email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      comment: orderData.comment || 'Без комментария',
      total_price: `${orderData.totalPrice.toLocaleString()} ₽`,
      items: orderData.items.map(item => 
        `${item.name} x${item.quantity} - ${item.price}₽`
      ).join('\n')
    };

    console.log('Параметры шаблона:', templateParams);

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_PUBLIC_KEY
    );

    console.log('Ответ от EmailJS:', response);

    if (response.status === 200) {
      return true;
    } else {
      console.error('Неожиданный статус ответа:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Подробная ошибка отправки email:', error);
    return false;
  }
}; 