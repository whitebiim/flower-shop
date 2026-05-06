import { describe, it, expect, beforeEach } from 'vitest';

interface TestCartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// функции для работы с localStorage
const saveCartToLocalStorage = (cart: TestCartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCartFromLocalStorage = (): TestCartItem[] => {
  const saved = localStorage.getItem('cart');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
};

const clearCartInLocalStorage = () => {
  localStorage.removeItem('cart');
};

const calculateTotal = (cart: TestCartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const addToCart = (
  cart: TestCartItem[], 
  product: TestCartItem, 
  quantity: number
): TestCartItem[] => {
  const existing = cart.find(item => item.id === product.id);
  
  if (existing) {
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }
  
  return [...cart, { ...product, quantity }];
};




// ИНТЕГРАЦИОННЫЕ ТЕСТЫ

describe('Интеграция корзины с localStorage', () => {
  
  // очищаем localStorage перед каждым тестом
  beforeEach(() => {
    localStorage.clear();
  });



  //  1: Сохранение корзины в localStorage
  it('должен сохранять корзину в localStorage после добавления товара', () => {
    // Подготовка
    const rose = { id: 1, name: 'Роза', price: 100, quantity: 0 };
    let cart: TestCartItem[] = [];
    
    // добавляем товар
    cart = addToCart(cart, rose, 2);
    saveCartToLocalStorage(cart);
    
    // в localStorage появилась корзина
    const saved = localStorage.getItem('cart');
    expect(saved).not.toBeNull();
    
    const parsed = JSON.parse(saved!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe('Роза');
    expect(parsed[0].quantity).toBe(2);
  });



  //  2: Загрузка корзины из localStorage
  it('должен загружать корзину из localStorage', () => {
    // Подготовка: сохраняем корзину в localStorage
    const savedCart = [{ id: 1, name: 'Тюльпан', price: 80, quantity: 3 }];
    saveCartToLocalStorage(savedCart);
    
    // загружаем корзину
    const loadedCart = loadCartFromLocalStorage();
    
    // загруженная корзина соответствует сохраненной
    expect(loadedCart).toHaveLength(1);
    expect(loadedCart[0].name).toBe('Тюльпан');
    expect(loadedCart[0].quantity).toBe(3);
  });




  //  3: Очистка корзины
  it('должен очищать корзину в localStorage', () => {
    // Подготовка: сохраняем корзину
    saveCartToLocalStorage([{ id: 1, name: 'Роза', price: 100, quantity: 2 }]);
    expect(localStorage.getItem('cart')).not.toBeNull();
    
    //  очищаем корзину
    clearCartInLocalStorage();
    
    //  localStorage ничего нет
    expect(localStorage.getItem('cart')).toBeNull();
  });
});

describe('Интеграция корзины и подсчета суммы', () => {
  
  //  4: Подсчет суммы после добавления товаров
  it('должен правильно считать сумму после добавления нескольких товаров', () => {
    let cart: TestCartItem[] = [];
    
    // + розы 
    cart = addToCart(cart, { id: 1, name: 'Роза', price: 100, quantity: 0 }, 2);
    // + тюльпаны 
    cart = addToCart(cart, { id: 2, name: 'Тюльпан', price: 80, quantity: 0 }, 3);
    
    const total = calculateTotal(cart);
    
    // 2*100 + 3*80 = 200 + 240 = 440
    expect(total).toBe(440);
  });
  

  
  // 5: Подсчет суммы после увеличения количества
  it('должен обновлять сумму при изменении количества', () => {
    let cart: TestCartItem[] = [];
    
    //  + роза (1 шт по 100₽)
    cart = addToCart(cart, { id: 1, name: 'Роза', price: 100, quantity: 0 }, 1);
    expect(calculateTotal(cart)).toBe(100);
    
    //  количество - 3
    cart = addToCart(cart, { id: 1, name: 'Роза', price: 100, quantity: 0 }, 2);
    expect(calculateTotal(cart)).toBe(300);
  });
  





  // 6: Сумма пустой корзины
  it('должен возвращать 0 для пустой корзины', () => {
    expect(calculateTotal([])).toBe(0);
  });
});