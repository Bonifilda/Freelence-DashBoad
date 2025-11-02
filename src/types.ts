export type ProjectStatus = "pending" | "in-progress" | "completed";
export type PaymentStatus = "paid" | "unpaid";

export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: ProjectStatus;
  paymentStatus: PaymentStatus;
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string; 
}

export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}
