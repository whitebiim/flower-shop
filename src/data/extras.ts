import type { Product } from '../types';

export const packagingProduct: Product = {
  id: 999,
  name: 'Упаковка для букета',
  price: 0,
  stock: 999,
  type: 'packaging',
  image: '/images/package.png',
  category: 'extra',
  isExtra: true
};

export const cardProduct: Product = {
  id: 998,
  name: 'Открытка',
  price: 150,
  stock: 999,
  type: 'card',
  image: '/images/card.png',
  category: 'extra',
  isExtra: true
};