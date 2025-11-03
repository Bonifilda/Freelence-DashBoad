// src/types.ts
export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string; // Optional property as required
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: "pending" | "in-progress" | "completed"; // Union type
  paymentStatus: "paid" | "unpaid"; // Union type
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string; // ISO format, e.g., "2025-11-03"
}


