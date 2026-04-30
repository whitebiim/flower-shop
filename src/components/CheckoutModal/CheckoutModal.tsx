import { useState } from 'react';
import { useCart } from '../../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  comment: string;
}

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { cart, totalPrice, clearCart, promoDiscount } = useCart();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 буквы';
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Введите телефон';
    } else if (phoneDigits.length !== 10 && phoneDigits.length !== 11) {
      newErrors.phone = 'Введите 10 или 11 цифр';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес доставки';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const order = {
      id: Date.now().toString().slice(-6),
      items: cart,
      total: totalPrice,
      discount: promoDiscount,
      customer: formData,
      createdAt: new Date().toISOString()
    };
    
    const savedOrders = localStorage.getItem('orders');
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    clearCart();
    
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name as keyof FormData]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined
      });
    }
  };

  if (!isOpen) return null;

  const regularItems = cart.filter(item => item.type === 'bunch' || item.type === 'flower');
  const packagingItem = cart.find(item => item.type === 'packaging');
  const cardItem = cart.find(item => item.type === 'card');

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="close-modal" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        {isSubmitted ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ marginBottom: '10px' }}>Заказ принят!</h2>
            <p style={{ color: '#666' }}>Спасибо за покупку! Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <>
            <div className="modal-left">
              <img src="/images/rose1.jpg" alt="Цветы" />
              <div className="left-content">
                <h3>Оформление заказа</h3>
                <p>Заполните форму, и мы свяжемся с вами для подтверждения доставки</p>
              </div>
            </div>

            <div className="modal-right">
              <h2>Оформление заказа</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>ФИО *</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Иванова Анна Сергеевна"
                    value={formData.name}
                    onChange={handleChange}
                    style={errors.name ? { borderColor: '#D32F2F' } : {}}
                  />
                  {errors.name && <small style={{ color: '#D32F2F', fontSize: '12px' }}>{errors.name}</small>}
                </div>
                
                <div className="form-group">
                  <label>Телефон *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={handleChange}
                    style={errors.phone ? { borderColor: '#D32F2F' } : {}}
                  />
                  {errors.phone && <small style={{ color: '#D32F2F', fontSize: '12px' }}>{errors.phone}</small>}
                </div>
                
                <div className="form-group">
                  <label>Адрес доставки *</label>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Улица, дом, квартира"
                    value={formData.address}
                    onChange={handleChange}
                    style={errors.address ? { borderColor: '#D32F2F' } : {}}
                  />
                  {errors.address && <small style={{ color: '#D32F2F', fontSize: '12px' }}>{errors.address}</small>}
                </div>
                
                <div className="form-group">
                  <label>Комментарий к заказу</label>
                  <textarea 
                    name="comment"
                    placeholder="Пожелания по доставке, время и т.д."
                    value={formData.comment}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                
                <div className="order-summary">
                  <h3>Содержимое заказа</h3>
                  <div className="order-items">
                    {regularItems.map(item => (
                      <div key={item.id} className="order-item">
                        <span className="order-item-name">{item.name} x{item.quantity}</span>
                        <span className="order-item-price">{(item.price * item.quantity).toLocaleString()} ₽</span>
                      </div>
                    ))}
                    {packagingItem && (
                      <div className="order-item">
                        <span className="order-item-name">{packagingItem.name}</span>
                        <span className="order-item-price">{packagingItem.price.toLocaleString()} ₽</span>
                      </div>
                    )}
                   {cardItem && (
                      <div className="order-item">
                        <span className="order-item-name">
                          Открытка {cardItem.cardText ? `: "${cardItem.cardText}"` : '(без текста)'}
                        </span>
                        <span className="order-item-price">{cardItem.price.toLocaleString()} ₽</span>
                      </div>
                    )}
                      </div>
                  
                  <div className="order-total-line">
                    <span>Товары ({cart.reduce((sum, i) => sum + i.quantity, 0)} шт):</span>
                    <span>{cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString()} ₽</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="order-total-line">
                      <span>Скидка {promoDiscount * 100}%:</span>
                      <span>-{Math.round(cart.reduce((sum, i) => sum + i.price * i.quantity, 0) * promoDiscount).toLocaleString()} ₽</span>
                    </div>
                  )}
                  <div className="order-total-line total">
                    <span>Итог:</span>
                    <span>{totalPrice.toLocaleString()} ₽</span>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={onClose}>
                    Отмена
                  </button>
                  <button type="submit" className="btn-submit">
                    Оформить заказ
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};