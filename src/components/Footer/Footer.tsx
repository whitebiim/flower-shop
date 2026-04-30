export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img 
            src="/images/logo-light.png" 
            alt="Bloom" 
            width="280" 
            height="85" 
            className="footer-logo-image" 
          />
        </div>
        <ul className="footer-links">
          <li className="footer-links-item">
            <a href="/" className="footer-link">Политика конфиденциальности</a>
          </li>
          <li className="footer-links-item">
            <span className="footer-copyright">© 2026 Магазин цветов</span>
          </li>
          <li className="footer-links-item">
            <a href="/" className="footer-link">Условия использования</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};