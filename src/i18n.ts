import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      home: 'Home',
      catalog: 'Catalog',
      about: 'About',
      delivery: 'Delivery',
      search: 'Search...',
      cart: 'Cart',
      favorites: 'Favorites',
      profile: 'Profile',

      // Product filters
      filters: 'Filters',
      resetAll: 'Reset all',
      category: 'Category',
      sinks: 'Sinks',
      faucets: 'Faucets',
      material: 'Material',
      ceramic: 'Ceramic',
      artificialStone: 'Artificial stone',
      stainlessSteel: 'Stainless steel',
      brass: 'Brass',
      marble: 'Marble',
      style: 'Style',
      modern: 'Modern',
      classic: 'Classic',
      minimalist: 'Minimalist',
      retro: 'Retro',
      loft: 'Loft',
      price: 'Price',
      under5000: 'Under 5000 ₽',
      from5000to10000: '5000 - 10000 ₽',
      from10000to15000: '10000 - 15000 ₽',
      over15000: 'Over 15000 ₽',

      // Product list
      sortBy: 'Sort by:',
      default: 'Default',
      priceAsc: 'Price: low to high',
      priceDesc: 'Price: high to low',
      byRating: 'By rating',
      newFirst: 'New first',
      productsFound: 'Products found:',
      noProducts: 'No products found',
      tryChangingSearch: 'Sorry, no items found. Try changing your search parameters.',

      // Product card
      addToCart: 'Add to cart',
      addToFavorites: 'Add to favorites',
      removeFromFavorites: 'Remove from favorites',
      inStock: 'In stock',
      outOfStock: 'Out of stock',
      new: 'New',
      discount: 'Discount',
      features: 'Features',
      specifications: 'Specifications',
      showAllSpecs: 'Show all specifications',
      showLessSpecs: 'Show less specifications',
      colors: 'Available colors',
      shipping: 'Free shipping on orders over 5000 ₽',
      warranty: 'Warranty',
      reviews: 'reviews',
      relatedProducts: 'Related products',
      backToProducts: 'Back to products',

      // Cart
      yourCart: 'Your Cart',
      itemsInCart: 'Items in cart',
      emptyCart: 'Your cart is empty',
      orderSummary: 'Order Summary',
      items: 'Items',
      free: 'Free',
      total: 'Total',
      promoCode: 'Promo Code',
      enterPromoCode: 'Enter promo code',
      apply: 'Apply',
      checkout: 'Checkout',
      securePayment: 'Secure Payment',
      orderSuccess: 'Order successfully sent!',
      orderError: 'An error occurred while sending the order. Please try again later.',
      decreaseQuantity: 'Decrease quantity',
      increaseQuantity: 'Increase quantity',
      removeItem: 'Remove item',

      // Favorites
      yourFavorites: 'Your Favorites',
      emptyFavorites: 'Your favorites list is empty',
      addToCartFromFavorites: 'Add to cart',

      // 404
      pageNotFound: 'Page Not Found',
      pageNotFoundDescription: 'The page you are looking for does not exist or has been moved.',
      backToHome: 'Back to Home',

      // Footer
      company: 'Company',
      contacts: 'Contacts',
      menu: 'Menu',
      privacyPolicy: 'Privacy Policy',
      termsOfUse: 'Terms of Use',
      allRightsReserved: 'All rights reserved',
      aboutUs: 'About Us',
      subscribe: 'Subscribe to our newsletter',
      subscribePlaceholder: 'Enter your email',
      subscribeButton: 'Subscribe',
      socialMedia: 'Follow us',

      // HomePage
      viewAll: 'View All',
      categories: 'Our Categories',
      featuredProducts: 'Featured Products',
      newArrivals: 'New Arrivals',
      saleProducts: 'Sale Products',
      whyChooseUs: 'Why Choose Us',
      quality: 'Quality',
      qualityDescription: 'We offer only high-quality products from trusted manufacturers',
      fastDelivery: 'Fast Delivery',
      fastDeliveryDescription: 'We deliver orders quickly throughout Russia',
      customerSupport: 'Customer Support',
      customerSupportDescription: 'Our specialists are always ready to help with selection and answer questions',
    },
  },
  ru: {
    translation: {
      // Header
      home: 'Главная',
      catalog: 'Каталог',
      about: 'О компании',
      delivery: 'Доставка',
      search: 'Поиск...',
      cart: 'Корзина',
      favorites: 'Избранное',
      profile: 'Профиль',

      // Product filters
      filters: 'Фильтры',
      resetAll: 'Сбросить все',
      category: 'Категория',
      sinks: 'Раковины',
      faucets: 'Смесители',
      material: 'Материал',
      ceramic: 'Керамика',
      artificialStone: 'Искусственный камень',
      stainlessSteel: 'Нержавеющая сталь',
      brass: 'Латунь',
      marble: 'Мрамор',
      style: 'Стиль',
      modern: 'Современный',
      classic: 'Классический',
      minimalist: 'Минимализм',
      retro: 'Ретро',
      loft: 'Лофт',
      price: 'Цена',
      under5000: 'До 5000 ₽',
      from5000to10000: '5000 - 10000 ₽',
      from10000to15000: '10000 - 15000 ₽',
      over15000: 'Более 15000 ₽',

      // Product list
      sortBy: 'Сортировать:',
      default: 'По умолчанию',
      priceAsc: 'Цена: по возрастанию',
      priceDesc: 'Цена: по убыванию',
      byRating: 'По рейтингу',
      newFirst: 'Сначала новинки',
      productsFound: 'Найдено товаров:',
      noProducts: 'Товары не найдены',
      tryChangingSearch: 'К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.',

      // Product card
      addToCart: 'В корзину',
      addToFavorites: 'В избранное',
      removeFromFavorites: 'Удалить из избранного',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      new: 'Новинка',
      discount: 'Скидка',
      features: 'Особенности',
      specifications: 'Характеристики',
      showAllSpecs: 'Показать все характеристики',
      showLessSpecs: 'Показать меньше характеристик',
      colors: 'Доступные цвета',
      shipping: 'Бесплатная доставка при заказе от 5000 ₽',
      warranty: 'Гарантия',
      reviews: 'отзывов',
      relatedProducts: 'Похожие товары',
      backToProducts: 'Назад к товарам',

      // Cart
      yourCart: 'Корзина',
      itemsInCart: 'Товары в корзине',
      emptyCart: 'Ваша корзина пуста',
      orderSummary: 'Сводка заказа',
      items: 'Товары',
      free: 'Бесплатно',
      total: 'Итого',
      promoCode: 'Промокод',
      enterPromoCode: 'Введите промокод',
      apply: 'Применить',
      checkout: 'Оформить заказ',
      securePayment: 'Безопасная оплата',
      orderSuccess: 'Заказ успешно отправлен!',
      orderError: 'Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.',
      decreaseQuantity: 'Уменьшить количество',
      increaseQuantity: 'Увеличить количество',
      removeItem: 'Удалить товар',

      // Favorites
      yourFavorites: 'Избранное',
      emptyFavorites: 'Ваш список избранного пуст',
      addToCartFromFavorites: 'Добавить в корзину',

      // 404
      pageNotFound: 'Страница не найдена',
      pageNotFoundDescription: 'Страница, которую вы ищете, не существует или была перемещена.',
      backToHome: 'Вернуться на главную',

      // Footer
      company: 'Компания',
      contacts: 'Контакты',
      menu: 'Меню',
      privacyPolicy: 'Политика конфиденциальности',
      termsOfUse: 'Условия использования',
      allRightsReserved: 'Все права защищены',
      aboutUs: 'О нас',
      subscribe: 'Подпишитесь на нашу рассылку',
      subscribePlaceholder: 'Введите ваш email',
      subscribeButton: 'Подписаться',
      socialMedia: 'Мы в соцсетях',

      // HomePage
      viewAll: 'Смотреть все',
      categories: 'Наши категории',
      featuredProducts: 'Популярные товары',
      newArrivals: 'Новинки',
      saleProducts: 'Товары со скидкой',
      whyChooseUs: 'Почему выбирают нас',
      quality: 'Качество',
      qualityDescription: 'Мы предлагаем только высококачественные товары от проверенных производителей',
      fastDelivery: 'Быстрая доставка',
      fastDeliveryDescription: 'Доставляем заказы в кратчайшие сроки по всей России',
      customerSupport: 'Поддержка клиентов',
      customerSupportDescription: 'Наши специалисты всегда готовы помочь с выбором и ответить на вопросы',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 