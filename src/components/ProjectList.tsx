// src/components/ProjectList.tsx
import { useContext } from 'react';

import type { Project, Client } from '../types';
import { findClientById } from '../utils.ts/freelanceUtils';
import { FreelanceContext } from '../context/freelanceContext';




interface ProjectListProps {
  projects: Project[];
  clients: Client[]; // For linking client names
}

export const ProjectList = ({ projects, clients }: ProjectListProps) => {
  const { dispatch } = useContext(FreelanceContext)!; // ! for non-null assertion (context is provided)

  const handleMarkPaid = (projectId: string) => {
    dispatch({ type: 'MARK_PROJECT_PAID', payload: { projectId } });
  };

  return (
    <ul className="space-y-4">
      {projects.map((proj) => {
        const client = findClientById(clients, proj.clientId);
        const statusColor = proj.paymentStatus === 'paid' ? 'bg-green-200' : 'bg-red-200'; // Conditional styling
        return (
          <li key={proj.id} className={`p-4 border rounded ${statusColor}`}>
            <h3 className="font-bold">{proj.title}</h3>
            <p>Client: {client ? client.name : 'Client not found'}</p> {/* Handle missing data */}
            <p>Status: {proj.status}</p>
            <p>Payment: {proj.paymentStatus}</p>
            {proj.paymentStatus === 'unpaid' && (
              <button
                className="bg-blue-500 text-white px-2 py-1"
                onClick={() => handleMarkPaid(proj.id)}
              >
                Mark as Paid
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};
