import type {
  FoodCategory,
  ProductCategory,
  ShoppingCategory,
} from '../types/product'

export const shoppingCategories = [
  'gadgets',
  'tecnología',
  'gaming',
  'hogar',
  'decoración',
  'belleza',
  'viral',
  'fomo',
] as const satisfies readonly ShoppingCategory[]

export const foodCategories = [
  'pizzas',
  'pastas',
  'ensaladas',
  'platos',
  'hamburguesas',
  'pollo',
  'sushi',
  'postres',
  'snacks',
  'bebidas',
] as const satisfies readonly FoodCategory[]

export const productCategoryLabels: Record<ProductCategory, string> = {
  gadgets: 'Gadgets',
  tecnología: 'Tecnología',
  gaming: 'Gaming',
  hogar: 'Hogar',
  decoración: 'Decoración',
  belleza: 'Belleza',
  viral: 'Viral',
  fomo: 'FOMO',
  pizzas: 'Pizzas',
  pastas: 'Pastas',
  ensaladas: 'Ensaladas',
  platos: 'Platos',
  hamburguesas: 'Hamburguesas',
  pollo: 'Pollo',
  sushi: 'Sushi',
  postres: 'Postres',
  snacks: 'Snacks',
  bebidas: 'Bebidas',
}
