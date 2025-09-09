export type OrderStatus = "created" | "pending" | "confirmed" | "complete" | "failed" | "cancelled";

export type Order = {
  id: string; // productId or generated
  productId: string;
  amountUSD: number;
  currency2: string;
  txnId?: string;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
};

const orders = new Map<string, Order>();

export function createOrder(order: Order) {
  orders.set(order.id, order);
}

export function updateOrder(id: string, updates: Partial<Order>) {
  const current = orders.get(id);
  if (!current) return;
  orders.set(id, { ...current, ...updates, updatedAt: Date.now() });
}

export function findOrder(id: string): Order | undefined {
  return orders.get(id);
}


