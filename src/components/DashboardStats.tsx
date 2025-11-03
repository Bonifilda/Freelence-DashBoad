
import { type Project,type Payment } from '../types';
import { Briefcase, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { getDashboardStats } from '../utils.ts/freelanceUtils';

interface DashboardStatsProps {
  projects: Project[];
  payments: Payment[];
}

export const DashboardStats = ({ projects, payments }: DashboardStatsProps) => {
  const stats = getDashboardStats(projects, payments);

  const cards = [
    { label: 'Total Projects', value: stats.totalProjects, icon: <Briefcase className="w-6 h-6" />, color: 'blue' },
    { label: 'Paid', value: stats.paid, icon: <CheckCircle className="w-6 h-6" />, color: 'green' },
    { label: 'Unpaid', value: stats.unpaid, icon: <AlertCircle className="w-6 h-6" />, color: 'red' },
    { label: 'Total Revenue', value: `$${stats.totalPayments.toLocaleString()}`, icon: <DollarSign className="w-6 h-6" />, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="p-6 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-lg bg-${card.color}-100 dark:bg-${card.color}-900`}>
              <div className={`text-${card.color}-600 dark:text-${card.color}-400`}>{card.icon}</div>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{card.label}</p>
        </div>
      ))}
    </div>
  );
};
