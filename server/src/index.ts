import express from 'express';
import cors from 'cors';
import * as nodemailer from 'nodemailer';

const app = express();
const port = 3001;

// Настройка CORS для разрешения запросов с фронтенда
app.use(cors({
  origin: '*', // В продакшене замените на конкретный домен
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Тестовый endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Сервер работает!' });
});

// Настройка транспорта для отправки email
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'eliseevivan05@mail.ru',
    pass: 'burwox-ziRkup-7qahko'
  }
});

// Интерфейс для данных заказа
interface OrderData {
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

// Обработчик POST запроса для создания заказа
app.post('/api/orders', async (req, res) => {
  try {
    const orderData: OrderData = req.body;
    console.log('Получен новый заказ:', orderData); // Добавляем логирование

    // Формирование текста письма
    const mailText = `
Новый заказ!

Клиент: ${orderData.name}
Email: ${orderData.email}
Телефон: ${orderData.phone}
Адрес: ${orderData.address}

Товары:
${orderData.items.map(item => `- ${item.name} x${item.quantity} - ${item.price}₽`).join('\n')}

Итого: ${orderData.totalPrice}₽

Комментарий к заказу:
${orderData.comment}
    `;

    // Отправка email
    await transporter.sendMail({
      from: 'eliseevivan05@mail.ru',
      to: 'eliseevivan05@mail.ru',
      subject: 'Новый заказ с сайта',
      text: mailText,
      html: mailText.replace(/\n/g, '<br>')
    });

    console.log('Email успешно отправлен'); // Добавляем логирование
    res.status(200).json({ message: 'Заказ успешно создан' });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
});

// Запуск сервера
app.listen(port, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту ${port}`);
}); 