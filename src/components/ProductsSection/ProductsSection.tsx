import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductsSectionProps {
  title: string;
  products: Product[];
  id: string;
  viewAllLink?: string;
}

export const ProductsSection = ({ 
  title, 
  products, 
  id, 
  viewAllLink 
}: ProductsSectionProps) => {
  return (
    <div id={id} className={id === 'flowers' ? 'all-flowers-container' : 'all-bunch-container'}>
      <h1 className="hero-word">{title}</h1>
      <ul className="all-bunch-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      {viewAllLink && (
        <a href={viewAllLink} className="button-dark">
          Все {title.toLowerCase()}
        </a>
      )}
    </div>
  );
};