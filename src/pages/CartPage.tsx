import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { packagingOptions } from '../types';
import { CheckoutModal } from '../components/CheckoutModal/CheckoutModal';  

export const CartPage = () => {
  const { 
    cart, 
    totalPrice, 
    clearCart, 
    applyPromoCode, 
    promoDiscount,
    updateQuantity,
    removeFromCart,
    updatePackagingOption,
    updateCardText,
    toggleCard,
    hasCard,
  } = useCart();
  
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleApplyPromo = () => {
    if (applyPromoCode(promoInput)) {
      setAppliedPromo(true);
    }
  };

  const regularItems = cart.filter(item => item.type === 'bunch' || item.type === 'flower');
  const packagingItem = cart.find(item => item.type === 'packaging');
  const cardItem = cart.find(item => item.type === 'card');

  const discountAmount = promoDiscount > 0 ? totalPrice / (1 - promoDiscount) * promoDiscount : 0;

  if (regularItems.length === 0) {
    return (
      <div className="cart-products">
        <h2 className="main-word">Моя корзина</h2>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>Корзина пуста</p>
          <Link to="/" className="button-dark empty-cart-button">Перейти в каталог</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="cart-products">
        <h2 className="main-word">Моя корзина</h2>
        
        {/* Основные товары */}
        <ul className="products-list">
          {regularItems.map(item => {
            const itemTotal = item.price * item.quantity;
            const isFlower = item.type === 'flower';
            
            return (
              <li key={item.id} className="products-item">
                <img src={item.image} alt={item.name} className="product-foto" />
                
                <div className="product-info">
                  <p className="text-dark product-name">{item.name}</p>
                  <p className="text-light product-desc">
                    {isFlower ? `${item.price} ₽/шт` : 'Готовый букет'}
                  </p>
                  
                  <div className="product-bottom">
                    <div className="product-quantity">
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="quantity-count">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="product-delete" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="product-price">
                  <p className="text-dark price-amount">{itemTotal.toLocaleString()} ₽</p>
                </div>
              </li>
            );
          })}
        </ul>

{/* упаковка */}
{packagingItem && (
  <ul className="products-list" style={{ marginTop: '20px' }}>
    <li className="products-item">
      <img src="/images/package.png" alt="Упаковка" className="product-foto" />
      <div className="product-info">
        <p className="text-dark product-name">{packagingItem.name}</p>
        <select 
          className="package-select"
          value={packagingOptions.find(p => `Упаковка: ${p.name}` === packagingItem.name)?.id || 'standart'}
          onChange={(e) => updatePackagingOption(e.target.value, packagingItem.packagingWish)}
        >
          {packagingOptions.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.name} {opt.price > 0 ? `+${opt.price} ₽` : '(бесплатно)'}
            </option>
          ))}
        </select>
        <input 
          type="text"
          className="package-wish"
          placeholder="Пожелания по упаковке..."
          value={packagingItem.packagingWish || ''}
          onChange={(e) => updatePackagingOption(
            packagingOptions.find(p => `Упаковка: ${p.name}` === packagingItem.name)?.id || 'standart',
            e.target.value
          )}
        />
      </div>
      <button 
        className="product-delete" 
        onClick={() => removeFromCart(packagingItem.id)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      </button>
      <div className="product-price">
        <p className="text-dark price-amount">{packagingItem.price} ₽</p>
      </div>
    </li>
  </ul>
)}
        {/* открытка */}
        <ul className="products-list" style={{ marginTop: '20px' }}>
          <li className="products-item">
            <img src="/images/card.png" alt="Открытка" className="product-foto" />
            <div className="product-info">
              <p className="text-dark product-name">Открытка</p>
              <div className="card-toggle">
                <label className="toggle-label">
                  <input 
                    type="radio" 
                    name="card-needed"
                    checked={hasCard}
                    onChange={() => !hasCard && toggleCard()}
                  /> 
                  Да, нужна (+50 ₽)
                </label>
                <label className="toggle-label">
                  <input 
                    type="radio" 
                    name="card-needed"
                    checked={!hasCard}
                    onChange={() => hasCard && toggleCard()}
                  /> 
                  Нет, не нужна
                </label>
              </div>
              {hasCard && cardItem && (
                <textarea 
                  className="card-text"
                  placeholder="Введите текст открытки..."
                  value={cardItem.cardText || ''}
                  onChange={(e) => updateCardText(e.target.value)}
                  rows={2}
                />
              )}
            </div>
            <div className="product-price">
              <p className="text-dark price-amount">{hasCard ? 50 : 0} ₽</p>
            </div>
          </li>
        </ul>

        {/* промокод */}
        <div className="promo-wrapper">
          <input 
            type="text" 
            className="promo-input" 
            placeholder="Введите промокод СКИДКА10"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            disabled={appliedPromo}
          />
          <button 
            className="promo-btn" 
            onClick={handleApplyPromo}
            disabled={appliedPromo}
          >
            {appliedPromo ? 'Промокод применен ✓' : 'Применить'}
          </button>
        </div>

        {/* итого */}
        <div className="cart-total-wrapper">
          <div className="cart-total">
            <span className="total-label">Итого:</span>
            <span className="total-price">{totalPrice.toLocaleString()} ₽</span>
          </div>
          {promoDiscount > 0 && (
            <div style={{ fontSize: '14px', color: '#2E7D32' }}>
              Скидка 10%: -{Math.round(discountAmount).toLocaleString()} ₽
            </div>
          )}
          <button 
            className="button-dark checkout-btn"
            onClick={() => setIsModalOpen(true)} 
          >
            Оформить заказ
          </button>
        </div>
      </div>

      {/* модалка */}
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};