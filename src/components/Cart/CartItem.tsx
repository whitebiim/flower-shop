import type { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const isFlower = item.type === 'flower';
  const totalPrice = item.price * item.quantity;

  return (
    <li className="products-item">
      <img 
        src={item.image} 
        alt={item.name} 
        className="product-foto" 
      />
      
      <div className="product-info">
        <p className="text-dark product-name">{item.name}</p>
        <p className="text-light product-desc">
          {isFlower ? `${item.price} ₽/шт` : 'Готовый букет'}
        </p>
        
        <div className="product-bottom">
          <div className="product-quantity">
            <button className="quantity-btn" onClick={handleDecrement}>−</button>
            <span className="quantity-count">{item.quantity}</span>
            <button 
              className="quantity-btn" 
              onClick={handleIncrement}
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
        <p className="text-dark price-amount">{totalPrice.toLocaleString()} ₽</p>
      </div>
    </li>
  );
};