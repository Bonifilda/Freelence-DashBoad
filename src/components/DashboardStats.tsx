// src/components/DashboardStats.tsx
import {type Project,type Payment } from '../types';
import { getDashboardStats } from '../utils.ts/freelanceUtils';

interface DashboardStatsProps {
  projects: Project[];
  payments: Payment[];
}

export const DashboardStats = ({ projects, payments }: DashboardStatsProps) => {
  const stats = getDashboardStats(projects, payments);
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="font-bold">Dashboard Stats</h2>
      <p>Total Projects: {stats.totalProjects}</p>
      <p>Paid: {stats.paid}</p>
      <p>Unpaid: {stats.unpaid}</p>
      <p>Total Payments: ${stats.totalPayments}</p>
    </div>
  );
};
