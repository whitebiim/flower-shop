import { Hero } from '../components/Hero/Hero';
import { HowToOrder } from '../components/HowToOrder/HowToOrder';
import { ProductsSection } from '../components/ProductsSection/ProductsSection';
import { Promo } from '../components/Promo/Promo';
import { Reviews } from '../components/Reviews/Reviews';
import { About } from '../components/About/About';
import { bouquets, flowers } from '../data/products';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <HowToOrder />
      <ProductsSection 
        title="Готовые букеты" 
        products={bouquets} 
        id="bunchs" 
        viewAllLink="/bouquets"
      />
      <ProductsSection 
        title="Цветы" 
        products={flowers} 
        id="flowers" 
        viewAllLink="/flowers"
      />
      <Promo />
      <Reviews />
      <About />
    </>
  );
};