import type { Product } from '../types';

export const bouquets: Product[] = [
  {
    id: 1,
    name: 'Первое свидание',
    price: 5000,
    stock: 1,
    type: 'bunch',
    image: '/images/Bunch1.jpg',
    category: 'bouquet'
  },
  {
    id: 2,
    name: 'Лунный свет',
    price: 5000,
    stock: 1,
    type: 'bunch',
    image: '/images/Bunch2.jpg',
    category: 'bouquet'
  },
  {
    id: 3,
    name: 'Лесная сказка',
    price: 5000,
    stock: 1,
    type: 'bunch',
    image: '/images/Bunch3.jpg',
    category: 'bouquet'
  },
  {
    id: 4,
    name: 'Дыхание весны',
    price: 5000,
    stock: 1,
    type: 'bunch',
    image: '/images/Bunch4.jpg',
    category: 'bouquet'
  }
];

export const flowers: Product[] = [
  {
    id: 5,
    name: 'Роза красная',
    price: 100,
    stock: 20,
    type: 'flower',
    image: '/images/flower (1).png',
    category: 'flower'
  },
  {
    id: 6,
    name: 'Тюльпан жёлтый',
    price: 100,
    stock: 15,
    type: 'flower',
    image: '/images/flower (2).png',
    category: 'flower'
  },
  {
    id: 7,
    name: 'Хризантема',
    price: 100,
    stock: 10,
    type: 'flower',
    image: '/images/flower (3).png',
    category: 'flower'
  },
  {
    id: 8,
    name: 'Пион розовый',
    price: 150,
    stock: 8,
    type: 'flower',
    image: '/images/flower (4).png',
    category: 'flower'
  },
  {
    id: 9,
    name: 'Гортензия',
    price: 200,
    stock: 7,
    type: 'flower',
    image: '/images/flower (5).png',
    category: 'flower'
  },
  {
    id: 10,
    name: 'Лаванда',
    price: 120,
    stock: 12,
    type: 'flower',
    image: '/images/flower (6).png',
    category: 'flower'
  },
  {
    id: 11,
    name: 'Ирис',
    price: 90,
    stock: 15,
    type: 'flower',
    image: '/images/flower (7).png',
    category: 'flower'
  },
  {
    id: 12,
    name: 'Лилия',
    price: 180,
    stock: 6,
    type: 'flower',
    image: '/images/flower (8).png',
    category: 'flower'
  }
];

export const allProducts = [...bouquets, ...flowers];