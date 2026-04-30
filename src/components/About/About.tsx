export const About = () => {
  return (
    <>
      <div id="about" className="about-container">
        <div className="about-images">
          <img 
            src="/images/fon1.png" 
            alt="Цветы" 
            className="about-back-image" 
          />
        </div>
        <div className="about-content">
          <h2 className="about-title">О нас</h2>
          <p className="about-text">
            Мы — команда, которая любит цветы так же сильно, как вы любите радовать близких.
            Наш магазин начинался с маленькой цветочной мастерской, где каждый букет собирали
            вручную с душой. Сегодня мы выросли, но главное осталось прежним: мы хотим,
            чтобы свежие цветы дарили радость и становились тёплыми воспоминаниями.
          </p>
          <p className="text-dark">Наша история</p>
        </div>
      </div>

      <div className="about-container-other">
        <div className="about-content">
          <h2 className="about-title">Что мы делаем</h2>
          <p className="about-text">
            Мы собираем букеты, которые хочется дарить. От нежных весенних тюльпанов до роскошных красных роз — каждый цветок мы выбираем с особым вниманием. Готовые композиции на любой вкус или возможность собрать свой уникальный букет — решать только вам.
          </p>
          <p className="text-dark">Как мы работаем</p>
        </div>
        <div className="about-images-right">
          <img 
            src="/images/fon2.png" 
            alt="Цветы" 
            className="about-back-image-other" 
          />
        </div>
      </div>
    </>
  );
};