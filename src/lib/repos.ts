export type Customer = {
  id: string;
  name: string;
  email: string;
  country: string;
  createdAt: number;
};

export type License = {
  key: string;
  productId: string;
  customerId: string;
  orderId: string;
  hardwareFingerprint?: string;
  status: "issued" | "activated" | "revoked";
  maxActivations: number;
  activations: number;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
};

export type OrderRecord = {
  id: string;
  productId: string;
  amountUSD: number;
  currency2: string;
  txnId?: string;
  status: "created" | "pending" | "confirmed" | "complete" | "failed" | "cancelled";
  buyerEmail?: string;
  customerId?: string;
  licenseKey?: string;
  createdAt: number;
  updatedAt: number;
};

const customers = new Map<string, Customer>();
const licenses = new Map<string, License>();
const orders = new Map<string, OrderRecord>();

export const CustomersRepo = {
  upsertByEmail(name: string, email: string, country: string): Customer {
    const existing = Array.from(customers.values()).find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return existing;
    }
    const id = crypto.randomUUID();
    const rec: Customer = { id, name, email, country, createdAt: Date.now() };
    customers.set(id, rec);
    return rec;
  },
  get(id: string) {
    return customers.get(id);
  },
};

export const OrdersRepo = {
  create(order: OrderRecord) {
    orders.set(order.id, order);
  },
  update(id: string, updates: Partial<OrderRecord>) {
    const current = orders.get(id);
    if (!current) return;
    orders.set(id, { ...current, ...updates, updatedAt: Date.now() });
  },
  get(id: string) {
    return orders.get(id);
  },
};

export const LicensesRepo = {
  create(license: License) {
    licenses.set(license.key, license);
  },
  get(key: string) {
    return licenses.get(key);
  },
  activate(key: string): boolean {
    const l = licenses.get(key);
    if (!l || l.status === "revoked") return false;
    if (l.activations >= l.maxActivations) return false;
    l.activations += 1;
    l.status = "activated";
    l.updatedAt = Date.now();
    licenses.set(key, l);
    return true;
  },
};


