import type { Store } from '../types/product'
import { foodCategories } from './categories'

export const stores = [
  {
    id: 'flash-market',
    mode: 'shopping',
    name: 'FlashMarket',
    description: 'Marketplace ficticio de gadgets, hogar y tecnología cotidiana.',
    tagline: 'Lo útil también puede esperar.',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#16796d',
    categories: ['gadgets', 'tecnología', 'gaming', 'hogar', 'decoración'],
  },
  {
    id: 'todo-innecesario',
    mode: 'shopping',
    name: 'TodoInnecesario',
    description: 'Objetos virales, absurdos y curiosamente tentadores.',
    tagline: 'Lo viste. Te dio risa. Lo dejaste pasar.',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#e97857',
    categories: ['viral', 'hogar', 'decoración', 'gadgets', 'fomo'],
  },
  {
    id: 'wishlist-club',
    mode: 'shopping',
    name: 'Wishlist Club',
    description: 'Caprichos aspiracionales y compras grandes para mirar sin pagar.',
    tagline: 'Sueña grande, compra de mentira.',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#705a9e',
    categories: ['hogar', 'belleza', 'tecnología', 'decoración', 'gaming', 'gadgets'],
  },
  {
    id: 'antojo-go',
    mode: 'food',
    name: 'AntojoGo',
    description: 'Delivery ficticio de comidas, postres, snacks y bebidas.',
    tagline: 'El antojo pasa. La dirección no se pide.',
    imageUrl: '/store-placeholder.svg',
    accentColor: '#d66a38',
    categories: foodCategories,
  },
] as const satisfies readonly Store[]
