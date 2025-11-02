import { Client , Project, Payment } from "./types";

export const clients = [
  { id: "c1", name: "Ariella Designs", country: "Rwanda", email: "hello@ariella.design" },
  { id: "c2", name: "Mount Tech", country: "Kenya" }, // no email
] as Client[];

export const projects = [
  { id: "p1", clientId: "c1", title: "Landing Page Redesign", budget: 800, status: "in-progress", paymentStatus: "unpaid" },
  { id: "p2", clientId: "c2", title: "API Integration", budget: 1200, status: "pending", paymentStatus: "paid" },
] as Project[];

export const payments = [
  { projectId: "p2", amount: 1200, date: new Date().toISOString() },
] as Payment[];
