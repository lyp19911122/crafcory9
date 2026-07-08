// In-memory order store
// In production, replace with Vercel KV / Postgres / Supabase

import { Product, Order } from './types'

// Initial products (hardcoded, admin can edit via API)
let productsData: Product[] = []

// Lazy load products to avoid circular dependency
export function initProducts(products: Product[]) {
  if (productsData.length === 0) {
    productsData = [...products]
  }
}

export function getProducts(): Product[] {
  return productsData
}

export function setProducts(products: Product[]) {
  productsData = products
}

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id)
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const idx = productsData.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  productsData[idx] = { ...productsData[idx], ...updates }
  return productsData[idx]
}

export function addProduct(product: Product): Product {
  productsData.push(product)
  return product
}

export function deleteProduct(id: string): boolean {
  const idx = productsData.findIndex((p) => p.id === id)
  if (idx === -1) return false
  productsData.splice(idx, 1)
  return true
}

// Order store
let ordersData: Order[] = []

export function getOrders(): Order[] {
  return ordersData
}

export function getOrderById(id: string): Order | undefined {
  return ordersData.find((o) => o.id === id)
}

export function addOrder(order: Order): Order {
  ordersData.push(order)
  return order
}

export function updateOrderStatus(id: string, status: Order['status']): Order | undefined {
  const order = ordersData.find((o) => o.id === id)
  if (!order) return undefined
  order.status = status
  return order
}

// Generate order ID
export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CRF-${ts}-${rand}`
}
