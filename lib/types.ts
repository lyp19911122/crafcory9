export interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  category: string
  material: string
  dimensions: string
  inStock: boolean
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered'
  createdAt: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
}
