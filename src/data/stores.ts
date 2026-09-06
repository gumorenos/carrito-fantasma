import type { Store } from '../types/product'
import { foodCategories } from './categories'

export const stores = [
  {
    id: 'flash-market',
    mode: 'shopping',
    name: 'FlashMarket',
    description:
      'Descubre tecnología, objetos para tu casa y accesorios de todos los días.',
    tagline: 'Encuentra tu próximo favorito.',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#16796d',
    categories: ['gadgets', 'tecnología', 'gaming', 'hogar', 'decoración'],
  },
  {
    id: 'todo-innecesario',
    mode: 'shopping',
    name: 'Casa & Objetos',
    description: 'Detalles y utensilios para hacer tu espacio más tuyo.',
    tagline: 'Tu casa, a tu manera.',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#e97857',
    categories: ['viral', 'hogar', 'decoración', 'gadgets', 'fomo'],
  },
  {
    id: 'wishlist-club',
    mode: 'shopping',
    name: 'Estudio',
    description: 'Tecnología y accesorios para acompañar tu rutina.',
    tagline: 'Una selección para ti.',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#705a9e',
    categories: [
      'hogar',
      'belleza',
      'tecnología',
      'decoración',
      'gaming',
      'gadgets',
    ],
  },
  {
    id: 'antojo-go',
    mode: 'food',
    name: 'AntojoGo',
    description: 'Pizzas, pastas, platos y algo dulce para terminar.',
    tagline: '¿Qué se te antoja hoy?',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#d66a38',
    categories: foodCategories,
  },
] as const satisfies readonly Store[]
