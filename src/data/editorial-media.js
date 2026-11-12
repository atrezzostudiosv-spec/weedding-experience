import { images } from './site.js';

const base = import.meta.env.BASE_URL;
const stock = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=82`;

export const editorialMedia = {
  ceremony: { src: images.expand, alt: 'Flowers frame an aisle lined with white chairs.' },
  hall: { src: images.hall, alt: 'A reception room with cream draping and tall floral arrangements.' },
  table: { src: images.reception, alt: 'A reception table with cane chairs and a white floral centerpiece.' },
  detail: { src: images.details, alt: 'Glasses, folded napkins and flowers on a table set for dinner.' },
  flowers: { src: images.hero, alt: 'White flowers and candles at an evening table.' },
  veil: { src: base + 'assets/home/under-the-veil.jpg', alt: 'A couple and a bouquet beneath a wedding veil.' },
  hands: { src: base + 'assets/home/holding-hands.jpg', alt: 'Two people hold hands beneath a veil.' },
  dance: { src: stock('photo-1769230387364-8b0c2b63e18b'), alt: 'A couple dances outdoors beneath strings of lights.' },
  gathering: { src: stock('photo-1769230366356-beca3c698fe0'), alt: 'Guests watch a couple dance at an evening reception.' },
  candle: { src: stock('photo-1707333515825-c07061a97e5a'), alt: 'Candlelight falls across a table with flowers.' },
  garden: { src: stock('photo-1773370812331-4e534dcf0ce1'), alt: 'Flowers and green candles dress a table outdoors.' },
};
