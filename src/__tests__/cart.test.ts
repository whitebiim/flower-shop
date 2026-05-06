import { describe, it, expect } from 'vitest';
import { calculateTotal, applyDiscount } from '../utils/cart';
import type { CartItem } from '../types';

// тестовые товары
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Роза красная',
    price: 100,
    quantity: 2,
    stock: 20,
    type: 'flower',
    image: '/images/flower1.png',
    category: 'flower'
  },
  {
    id: 2,
    name: 'Тюльпан жёлтый',
    price: 80,
    quantity: 3,
    stock: 15,
    type: 'flower',
    image: '/images/flower2.png',
    category: 'flower'
  }
];

describe('Подсчет суммы корзины', () => {
  
  it('пустая корзина должна давать сумму 0', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('корзина с одним товаром: 100₽ × 2 = 200₽', () => {
    const cart = [{ ...mockCartItems[0], quantity: 2 }];
    expect(calculateTotal(cart)).toBe(200);
  });

  it('корзина с двумя товарами: (100×2) + (80×3) = 440₽', () => {
    expect(calculateTotal(mockCartItems)).toBe(440);
  });
});

describe('Применение промокода', () => {
  
  it('промокод "СКИДКА10" дает скидку 10%', () => {
    expect(applyDiscount(1000, 'СКИДКА10')).toBe(900);
  });

  it('неверный промокод не дает скидку', () => {
    expect(applyDiscount(1000, 'НЕВЕРНЫЙ')).toBe(1000);
  });

  it('пустой промокод не дает скидку', () => {
    expect(applyDiscount(1000, '')).toBe(1000);
  });

  it('скидка 10% от 500 = 450', () => {
    expect(applyDiscount(500, 'СКИДКА10')).toBe(450);
  });
});