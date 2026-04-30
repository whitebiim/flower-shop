import { reviews } from '../../data/reviews';

export const Reviews = () => {
  return (
    <div id="feedback" className="info-client-container">
      <h2 className="main-word">Отзывы наших клиентов</h2>
      <ul className="how-order-list">
        {reviews.map((review) => (
          <li key={review.id} className="client-feedback-item">
            <img 
              src={review.image} 
              alt={`Фото клиента ${review.name}`} 
              className="flower-icon" 
            />
            <p className="text-dark">{review.name}</p>
            <p className="text-dark">{'★'.repeat(review.rating)}</p>
            <p className="text-light">{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};