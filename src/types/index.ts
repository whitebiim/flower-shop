export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  type: 'bunch' | 'flower' | 'packaging' | 'card';
  image: string;
  category: string;
  isExtra?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  cardText?: string;
  packagingWish?: string;
}

export interface PackagingOption {
  id: string;
  name: string;
  price: number;
}

export const packagingOptions: PackagingOption[] = [
  { id: 'standart', name: 'Стандартная', price: 0 },
  { id: 'premium', name: 'Премиум', price: 300 },
  { id: 'deluxe', name: 'Делюкс', price: 500 },
  { id: 'eco', name: 'Эко-упаковка', price: 200 },
];