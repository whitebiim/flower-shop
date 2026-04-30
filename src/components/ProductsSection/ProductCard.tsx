import { useState } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();

  // есть ли товар уже в корзине
  const cartItem = cart.find(item => item.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const isFlower = product.type === 'flower';
  const isOutOfStock = product.stock === 0;

  return (
    <li className="bunch-item">
      <div className={isFlower ? 'flower-image-wrapper' : ''}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="flower-bunch" 
        />
        {isFlower && (
          <span className="flower-stock">в наличии: {product.stock}</span>
        )}
      </div>

      {/* инфо и кнопка/счетчик */}
      <div className="bunch-info-wrapper">
        <div className="bunch-text">
          <p className="text-dark bunch-name">{product.name}</p>
          <p className="text-dark bunch-price">{product.price.toLocaleString()} ₽</p>
        </div>
        
        {cartQuantity > 0 ? (
          <div className="product-quantity">
            <button 
              className="quantity-btn"
              onClick={() => addToCart(product, -1)}
            >
              −
            </button>
            <span className="quantity-count">{cartQuantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => addToCart(product, 1)}
              disabled={cartQuantity >= product.stock}
            >
              +
            </button>
          </div>
        ) : (
          <button 
            className="add-cart" 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <img src="/images/cart-icon.svg" alt="Корзина" width="18" height="18" />
          </button>
        )}
      </div>

      {/* нет в наличии */}
      {isOutOfStock && (
        <div style={{ marginTop: '12px', color: '#D32F2F', fontSize: '14px' }}>
          Нет в наличии
        </div>
      )}
    </li>
  );
};