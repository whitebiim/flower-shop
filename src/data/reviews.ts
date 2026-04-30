export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  image: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Людмила С.',
    rating: 5,
    text: 'Букет привезли точь-в-точь как на сайте, даже лучше. Розы свежайшие, упаковка аккуратная.',
    image: '/images/client (1).png'
  },
  {
    id: 2,
    name: 'Марина К.',
    rating: 5,
    text: 'Заказывала на день рождения подруги — она была в восторге. Доставили вовремя, всё свежее!',
    image: '/images/client (2).png'
  },
  {
    id: 3,
    name: 'Анна В.',
    rating: 5,
    text: 'Очень красивые букеты и внимательный сервис. Буду заказывать снова и снова!',
    image: '/images/client (3).png'
  }
];