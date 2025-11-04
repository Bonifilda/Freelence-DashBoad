// src/components/ProjectList.tsx
import { useContext } from 'react';

import {type Project, type Client } from '../types';
import { validateAndCreatePayment, findClientById } from '../utils.ts/freelanceUtils';
import { CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import { FreelanceContext } from '../context/freelanceContext';

interface ProjectListProps {
  projects: Project[];
  clients: Client[];
}

export const ProjectList = ({ projects, clients }: ProjectListProps) => {
  const { dispatch } = useContext(FreelanceContext)!;

  const getStatusBadge = (status: Project['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status}</span>;
  };

  const getPaymentBadge = (status: Project['paymentStatus']) => {
    return status === 'paid' ? (
      <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
        <CheckCircle className="w-4 h-4" /> Paid
      </span>
    ) : (
      <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
        <AlertCircle className="w-4 h-4" /> Unpaid
      </span>
    );
  };

  const handlePayNow = (project: Project) => {
    const payment = validateAndCreatePayment(project.id, project.budget, new Date().toISOString());
    if (payment) {
      dispatch({ type: 'ADD_PAYMENT', payload: payment });
      // Auto-mark as paid since full amount is paid
      dispatch({ type: 'MARK_PROJECT_PAID', payload: { projectId: project.id } });
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((proj) => {
        const client = findClientById(clients, proj.clientId);
        return (
          <div
            key={proj.id}
            className="p-6 rounded-xl border bg-white dark:bg-sky-800 dark:border-sky-700 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold">{proj.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Client: <span className="font-medium">{client?.name || 'Unknown Client'}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${proj.budget.toLocaleString()}</p>
                {getPaymentBadge(proj.paymentStatus)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>{getStatusBadge(proj.status)}</div>
              {proj.paymentStatus === 'unpaid' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch({ type: 'MARK_PROJECT_PAID', payload: { projectId: proj.id } })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm"
                  >
                    Mark as Paid
                  </button>
                  <button
                    onClick={() => handlePayNow(proj)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 text-sm"
                  >
                    <DollarSign className="w-4 h-4" />
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};