export const HowToOrder = () => {
  const steps = [
    {
      icon: '/images/Flower1.svg',
      title: 'Выберите цветы',
      description: 'Добавьте в корзину цветы или готовые букеты'
    },
    {
      icon: '/images/Flower2.svg',
      title: 'Оформите заказ',
      description: 'Укажите адрес и удобное время доставки'
    },
    {
      icon: '/images/Flower3.svg',
      title: 'Получите букет',
      description: 'Мы доставим свежие цветы прямо к вашей двери'
    }
  ];

  return (
    <div id="how-to-order" className="info-order-container">
      <h2 className="main-word">Как оформить заказ?</h2>
      <ul className="how-order-list">
        {steps.map((step, index) => (
          <li key={index} className="how-order-item">
            <img 
              src={step.icon} 
              alt="Иконка цветка" 
              className="flower-icon" 
            />
            <p className="text-dark">{step.title}</p>
            <p className="text-light">{step.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};