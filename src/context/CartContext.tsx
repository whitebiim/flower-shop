import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem, PackagingOption } from '../types';
import { packagingOptions } from '../types';

const packagingProduct: Product = {
  id: 999,
  name: 'Упаковка: Стандартная',
  price: 0,
  stock: 999,
  type: 'packaging',
  image: '/images/package.png',
  category: 'extra',
  isExtra: true
};

const cardProduct: Product = {
  id: 998,
  name: 'Открытка',
  price: 150,
  stock: 999,
  type: 'card',
  image: '/images/card.png',
  category: 'extra',
  isExtra: true
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updatePackagingOption: (packagingId: string, wish?: string) => void;
  updateCardText: (text: string) => void;
  toggleCard: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  applyPromoCode: (code: string) => boolean;
  promoDiscount: number;
  hasCard: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const hasCard = cart.some(item => item.type === 'card');
  const hasRegularItems = cart.some(item => item.type === 'bunch' || item.type === 'flower');

  //  из localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedPromo = localStorage.getItem('promoCode');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Ошибка загрузки корзины', e);
      }
    }
    if (savedPromo) {
      setPromoCode(savedPromo);
      setPromoDiscount(0.1);
    }
  }, []);

  // в localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //общая сумма
  const totalPriceRaw = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = promoDiscount > 0 ? totalPriceRaw * (1 - promoDiscount) : totalPriceRaw;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // в корзину
  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      let newCart = [...prev];
      const existingItem = newCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          alert(`Недостаточно товара. Доступно: ${product.stock}`);
          return prev;
        }
        newCart = newCart.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        if (quantity > product.stock) {
          alert(`Недостаточно товара. Доступно: ${product.stock}`);
          return prev;
        }
        newCart.push({ ...product, quantity });
      }

      // +  упаковка
      if (product.type === 'flower' && !newCart.find(i => i.type === 'packaging')) {
        newCart.push({ ...packagingProduct, quantity: 1 });
      }

      //+ добавляем открытка
      if ((product.type === 'bunch' || product.type === 'flower') && !newCart.find(i => i.type === 'card')) {
        newCart.push({ ...cardProduct, quantity: 1, cardText: '' });
      }

      return newCart;
    });
  };

  // удаление
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // обновление 
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (quantity > item.stock) {
            alert(`Недостаточно товара. Доступно: ${item.stock}`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // обновление опции упаковки
  const updatePackagingOption = (packagingId: string, wish?: string) => {
    const selected = packagingOptions.find(p => p.id === packagingId);
    if (selected) {
      setCart(prev =>
        prev.map(item =>
          item.type === 'packaging'
            ? { 
                ...item, 
                price: selected.price,
                name: `Упаковка: ${selected.name}`,
                packagingWish: wish || item.packagingWish 
              }
            : item
        )
      );
    }
  };

  // обновление текста открытки
  const updateCardText = (text: string) => {
    setCart(prev =>
      prev.map(item =>
        item.type === 'card'
          ? { ...item, cardText: text }
          : item
      )
    );
  };

  // вкл/выкл открытки
  const toggleCard = () => {
    if (hasCard) {
      setCart(prev => prev.filter(item => item.type !== 'card'));
    } else {
      if (hasRegularItems) {
        setCart(prev => [...prev, { ...cardProduct, quantity: 1, cardText: '' }]);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setPromoDiscount(0);
  };

  const applyPromoCode = (code: string): boolean => {
    if (code === 'СКИДКА10') {
      setPromoCode(code);
      setPromoDiscount(0.1);
      alert('Промокод применен! Скидка 10%');
      return true;
    }
    alert('Неверный промокод');
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updatePackagingOption,
        updateCardText,
        toggleCard,
        clearCart,
        totalItems,
        totalPrice,
        applyPromoCode,
        promoDiscount,
        hasCard,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};