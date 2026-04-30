import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (targetId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo" onClick={() => setIsMenuOpen(false)}>
        <img
          src="/images/logo.png"
          alt="Bloom-logo"
          className="header-logo-image"
          width="240"
          height="60"
          loading="lazy"
        />
      </Link>

      <nav className={`header-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="header-menu-list">
          <li className="header-menu-item">
            <button 
              className="header-menu-link"
              onClick={() => handleNavClick('how-to-order')}
            >
              КАК ОФОРМИТЬ ЗАКАЗ
            </button>
          </li>
          <li className="header-menu-item">
            <button 
              className="header-menu-link"
              onClick={() => handleNavClick('bunchs')}
            >
              БУКЕТЫ
            </button>
          </li>
          <li className="header-menu-item">
            <button 
              className="header-menu-link"
              onClick={() => handleNavClick('flowers')}
            >
              ЦВЕТЫ
            </button>
          </li>
          <li className="header-menu-item">
            <button 
              className="header-menu-link"
              onClick={() => handleNavClick('feedback')}
            >
              ОТЗЫВЫ
            </button>
          </li>
          <li className="header-menu-item">
            <button 
              className="header-menu-link"
              onClick={() => handleNavClick('about')}
            >
              О НАС
            </button>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <button 
          className="header-menu-item-other"
          onClick={() => handleNavClick('flowers')}
        >
          Выбрать цветы
        </button>
        <Link to="/cart" className="header-menu-item-cart" onClick={() => setIsMenuOpen(false)}>
          Корзина
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-count">{totalItems}</span>
        </Link>
        <button className="burger" onClick={toggleMenu} aria-label="Меню">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};