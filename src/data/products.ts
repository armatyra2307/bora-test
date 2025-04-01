import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Классическая керамическая раковина",
    price: 5990,
    description: "Элегантная классическая раковина из высококачественной керамики. Идеально подходит для традиционных интерьеров ванных комнат.",
    category: "sink",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622781867-bc4ba9a27856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Высококачественная керамика",
      "Устойчивое к царапинам покрытие",
      "Легкая очистка",
      "Классический дизайн"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 124,
    material: "Керамика",
    style: "Классический",
    dimensions: {
      width: 60,
      depth: 45,
      height: 20
    },
    specifications: {
      "Назначение": "для ванной комнаты",
      "Монтаж": "настенный, накладной",
      "Форма": "прямоугольная",
      "Материал": "керамика",
      "Цвет": "белый",
      "Страна": "Италия",
      "Гарантия": "5 лет",
      "Перелив": "есть",
      "Отверстие под смеситель": "1 отверстие",
      "Способ монтажа": "на столешницу или подвесной",
      "Стилистика дизайна": "классический",
      "Донный клапан": "в комплекте"
    }
  },
  {
    id: 2,
    name: "Современная подвесная раковина",
    price: 7490,
    description: "Минималистичная подвесная раковина для современных интерьеров. Экономит пространство и создает ощущение легкости в ванной комнате.",
    category: "sink",
    imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Настенный монтаж",
      "Компактный дизайн",
      "Прочный материал",
      "Скрытая система слива"
    ],
    inStock: true,
    rating: 4.5,
    reviews: 89,
    new: true,
    material: "Искусственный камень",
    style: "Современный",
    dimensions: {
      width: 50,
      depth: 40,
      height: 15
    },
    specifications: {
      "Назначение": "для ванной комнаты",
      "Монтаж": "подвесной",
      "Форма": "овальная",
      "Материал": "искусственный камень",
      "Цвет": "белый",
      "Страна": "Германия",
      "Гарантия": "10 лет",
      "Перелив": "скрытый",
      "Отверстие под смеситель": "без отверстия",
      "Способ монтажа": "настенный",
      "Стилистика дизайна": "современный",
      "Донный клапан": "в комплекте"
    }
  },
  {
    id: 3,
    name: "Двойная раковина для пары",
    price: 12990,
    description: "Просторная двойная раковина для семейных ванных комнат. Позволяет двум людям комфортно пользоваться ванной одновременно.",
    category: "sink",
    imageUrl: "https://images.unsplash.com/photo-1613849925594-415a32298f54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Двойная чаша",
      "Большая рабочая поверхность",
      "Прочная конструкция",
      "Двойная система слива"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 56,
    material: "Мрамор",
    style: "Современный",
    dimensions: {
      width: 120,
      depth: 50,
      height: 20
    },
    specifications: {
      "Назначение": "для ванной комнаты",
      "Монтаж": "встраиваемый",
      "Форма": "прямоугольная",
      "Материал": "мрамор",
      "Цвет": "бежевый",
      "Страна": "Италия",
      "Гарантия": "15 лет",
      "Перелив": "есть",
      "Отверстие под смеситель": "2 отверстия",
      "Способ монтажа": "встраиваемый",
      "Стилистика дизайна": "современный",
      "Донный клапан": "в комплекте"
    }
  },
  {
    id: 4,
    name: "Раковина из искусственного камня",
    price: 9990,
    description: "Элегантная раковина из искусственного камня с гладкой поверхностью и современным дизайном. Устойчива к пятнам и легко чистится.",
    category: "sink",
    imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Искусственный камень премиум-класса",
      "Бесшовная конструкция",
      "Устойчивость к пятнам",
      "Матовая отделка"
    ],
    inStock: true,
    rating: 4.6,
    reviews: 78,
    material: "Искусственный камень",
    style: "Современный",
    dimensions: {
      width: 65,
      depth: 45,
      height: 18
    },
    specifications: {
      "Назначение": "для ванной комнаты",
      "Монтаж": "накладной",
      "Форма": "круглая",
      "Материал": "искусственный камень",
      "Цвет": "белый",
      "Страна": "Швейцария",
      "Гарантия": "10 лет",
      "Перелив": "есть",
      "Отверстие под смеситель": "без отверстия",
      "Способ монтажа": "накладной",
      "Стилистика дизайна": "современный",
      "Донный клапан": "в комплекте"
    }
  },
  {
    id: 5,
    name: "Накладная раковина в стиле лофт",
    price: 8490,
    description: "Стильная накладная раковина в индустриальном стиле. Идеально подходит для интерьеров в стиле лофт или индустриальном стиле.",
    category: "sink",
    imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Накладной монтаж",
      "Индустриальный дизайн",
      "Прочная конструкция",
      "Устойчивость к высоким температурам"
    ],
    inStock: false,
    rating: 4.4,
    reviews: 42,
    material: "Бетон",
    style: "Лофт",
    dimensions: {
      width: 55,
      depth: 40,
      height: 15
    },
    specifications: {
      "Назначение": "для ванной комнаты",
      "Монтаж": "накладной",
      "Форма": "квадратная",
      "Материал": "бетон",
      "Цвет": "серый",
      "Страна": "Германия",
      "Гарантия": "5 лет",
      "Перелив": "нет",
      "Отверстие под смеситель": "без отверстия",
      "Способ монтажа": "накладной",
      "Стилистика дизайна": "лофт",
      "Донный клапан": "приобретается отдельно"
    }
  },
  {
    id: 6,
    name: "Dorsa Single-Lever Bath Mixer Chrome",
    price: 4990,
    description: "Современный хромированный смеситель для ванной комнаты с однорычажным управлением. Сочетает в себе элегантный дизайн и функциональность.",
    category: "faucet",
    imageUrl: "/images/Dorsa Single-Lever Bath Mixer Chrome/photo_6_2025-03-07_13-16-22.jpg",
    images: [
      "/images/Dorsa Single-Lever Bath Mixer Chrome/photo_7_2025-03-07_13-16-22.jpg",
      "/images/Dorsa Single-Lever Bath Mixer Chrome/photo_3_2025-03-07_13-16-22.jpg",
      "/images/Dorsa Single-Lever Bath Mixer Chrome/photo_2025-03-20_22-12-18.jpg",
    ],
    features: [
      "Хромированное покрытие",
      "Однорычажное управление",
      "Керамический картридж",
      "Аэратор для экономии воды"
    ],
    inStock: true,
    rating: 4.6,
    reviews: 112,
    material: "Латунь с хромированным покрытием",
    style: "Современный",
    colors: ["Хром"],
    specifications: {
      "Назначение": "для ванны и душа",
      "Монтаж": "вертикальный (на стену)",
      "Встраиваемый": "да",
      "Управление": "однорычажное",
      "Цвет": "хром",
      "Страна": "Иран",
      "Гарантия": "5 год",
      "Подводка": "гибкая",
      "Поворотный излив": "нет",
      "Форма излива": "обычный",
      "Стилистика дизайна": "современный",
      "Донный клапан": "-",
      "Механизм": "-",
      "Материал корпуса": "латунь",
      "Высота":"110мм",
      "Длина":"100мм",
      "Ширина":"180мм",
      "Вес":"1.158кг",
    }
  },
  {
    id: 7,
    name: "Garnet Basim Mixer Black RoseGold",
    price: 7990,
    description: "Элегантный смеситель в современном стиле с однорычажным механизмом. Идеально подходит для классических и новомодных интерьеров ванных комнат.",
    category: "faucet",
    imageUrl: "/images/Garnet Basim Mixer Black RoseGold/photo_8_2025-03-07_16-50-28.jpg",
    images: [
      "/images/Garnet Basim Mixer Black RoseGold/photo_9_2025-03-07_16-50-28.jpg",
      "/images/Garnet Basim Mixer Black RoseGold/photo_12_2025-03-07_16-50-28.jpg",
      "/images/Garnet Basim Mixer Black RoseGold/photo_8_2025-03-07_16-50-28.jpg"
    ],
    features: [
      "Однорычажное управление",
      "Современный дизайн",
      "Высококачественный пластик",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 67,
    material: "Пластк с позолотой",
    style: "Современный",
    colors: ["Черный" , "Розовый"],
    specifications: {
      "Назначение": "для раковины",
      "Монтаж": "горизонтальный (на раковину)",
      "Встраиваемый": "нет",
      "Управление": "рычажное",
      "Цвет": "черный",
      "Страна": "Иран",
      "Гарантия": "1 год",
      "Подводка": "гибкая",
      "Поворотный излив": "нет",
      "Форма излива": "-",
      "Стилистика дизайна": "Современный",
      "Донный клапан": "-",
      "Механизм": "-",
      "Материал корпуса": "Латунь",
      "Длина":"250мм",
      "Ширина":"120мм",
      "Вес":"1.3кг",
    }
  },
  {
    id: 8,
    name: "Сенсорный смеситель",
    price: 11990,
    description: "Инновационный сенсорный смеситель с автоматическим включением и выключением воды. Экономит воду и обеспечивает максимальную гигиену.",
    category: "faucet",
    imageUrl: "/images/Sarina SinkMixer With Extractable Chrome/photo_2_2025-03-07_15-56-08.jpg",
    images: [
      "/images/Sarina SinkMixer With Extractable Chrome/photo_1_2025-03-07_15-56-08.jpg",
      "/images/Sarina SinkMixer With Extractable Chrome/photo_3_2025-03-07_15-56-08.jpg",
      "/images/Sarina SinkMixer With Extractable Chrome/photo_4_2025-03-07_15-56-08.jpg"
    ],
    features: [
      "Сенсорное управление",
      "Автоматическое отключение",
      "Регулировка температуры",
      "Энергосберегающая технология"
    ],
    inStock: true,
    rating: 4.5,
    reviews: 43,
    new: true,
    material: "Нержавеющая сталь",
    style: "Современный",
    specifications: {
      "Назначение": "для раковины",
      "Монтаж": "горизонтальный (на раковину)",
      "Встраиваемый": "нет",
      "Управление": "сенсорное",
      "Цвет": "хром",
      "Страна": "Япония",
      "Гарантия": "5 лет",
      "Подводка": "гибкая",
      "Поворотный излив": "нет",
      "Форма излива": "современный",
      "Стилистика дизайна": "хай-тек",
      "Донный клапан": "в комплекте",
      "Механизм": "электронный",
      "Материал корпуса": "нержавеющая сталь",
      "Питание": "от батареек или сети"
    }
  },
  {
    id: 9,
    name: "Каскадный смеситель",
    price: 8990,
    description: "Стильный каскадный смеситель, создающий эффект водопада. Станет ярким акцентом в любой ванной комнате.",
    category: "faucet",
    imageUrl: "https://images.unsplash.com/photo-1584622781867-bc4ba9a27856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1632292220916-e9c34dd75db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    features: [
      "Эффект водопада",
      "Широкий излив",
      "Однорычажное управление",
      "Прочная конструкция"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 89,
    material: "Латунь с хромированным покрытием",
    style: "Современный",
    specifications: {
      "Назначение": "для раковины",
      "Монтаж": "горизонтальный (на раковину)",
      "Встраиваемый": "нет",
      "Управление": "однорычажное",
      "Цвет": "хром",
      "Страна": "Германия",
      "Гарантия": "5 лет",
      "Подводка": "гибкая",
      "Поворотный излив": "нет",
      "Форма излива": "каскадный",
      "Стилистика дизайна": "современный",
      "Донный клапан": "в комплекте",
      "Механизм": "керамический картридж",
      "Материал корпуса": "латунь"
    }
  },
  {
    id: 10,
    name: "Настенный смеситель",
    price: 6490,
    description: "Компактный настенный смеситель, экономящий пространство на раковине. Идеально подходит для небольших ванных комнат.",
    category: "faucet",
    imageUrl: "https://images.unsplash.com/photo-1584622781867-bc4ba9a27856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1632292220916-e9c34dd75db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Настенный монтаж",
      "Экономия пространства",
      "Регулируемая длина излива",
      "Простая установка"
    ],
    inStock: false,
    rating: 4.3,
    reviews: 56,
    discount: 15,
    material: "Латунь с матовым покрытием",
    style: "Минимализм",
    specifications: {
      "Назначение": "для раковины",
      "Монтаж": "вертикальный (на стену)",
      "Встраиваемый": "нет",
      "Управление": "однорычажное",
      "Цвет": "матовый черный",
      "Страна": "Италия",
      "Гарантия": "5 лет",
      "Подводка": "жесткая",
      "Поворотный излив": "да",
      "Форма излива": "прямой",
      "Стилистика дизайна": "минимализм",
      "Донный клапан": "приобретается отдельно",
      "Механизм": "керамический картридж",
      "Материал корпуса": "латунь"
    }
  }
];

export const getProductsByCategory = (category: 'sink' | 'faucet' | 'all') => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (id: number, limit = 4) => {
  const product = getProductById(id);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== id)
    .slice(0, limit);
};