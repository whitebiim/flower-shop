import type{ CartItem } from '../types';

// подсчет общей суммы корзины
export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// применение промокода
export const applyDiscount = (total: number, promoCode: string): number => {
  if (promoCode === 'СКИДКА10') {
    return total * 0.9; // скидка 10%
  }
  return total;
};