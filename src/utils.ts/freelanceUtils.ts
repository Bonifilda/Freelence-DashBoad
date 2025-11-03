// src/utils/freelanceUtils.ts
import {type Client,type Project, type Payment } from '../types';

// Count paid vs unpaid projects
export const countPaidUnpaid = (projects: Project[]): { paid: number; unpaid: number } => {
  return projects.reduce(
    (acc, proj) => {
      proj.paymentStatus === 'paid' ? acc.paid++ : acc.unpaid++;
      return acc;
    },
    { paid: 0, unpaid: 0 }
  );
};

// Find client by ID safely (type narrowing for undefined)
export const findClientById = (clients: Client[], id: string): Client | undefined => {
  return clients.find((client) => client.id === id);
};

// Record a new payment with validation (ensure amount > 0)
export const validateAndCreatePayment = (projectId: string, amount: number, date: string): Payment | null => {
  if (amount <= 0) return null; // Validation
  return { projectId, amount, date };
};

// Filter projects by status or payment
export const filterProjects = (
  projects: Project[],
  status?: Project['status'],
  paymentStatus?: Project['paymentStatus']
): Project[] => {
  return projects.filter(
    (proj) => (!status || proj.status === status) && (!paymentStatus || proj.paymentStatus === paymentStatus)
  );
};

// Search clients or projects by name (generic for reusability)
export const searchByName = <T extends { name?: string; title?: string }>(items: T[], query: string): T[] => {
  return items.filter((item) => {
    const name = item.name || item.title || '';
    return name.toLowerCase().includes(query.toLowerCase());
  });
};

// Dashboard stats (totals)
export const getDashboardStats = (projects: Project[], payments: Payment[]) => {
  const totalProjects = projects.length;
  const { paid, unpaid } = countPaidUnpaid(projects);
  const totalPayments = payments.reduce((sum, pay) => sum + pay.amount, 0);
  return { totalProjects, paid, unpaid, totalPayments };
};