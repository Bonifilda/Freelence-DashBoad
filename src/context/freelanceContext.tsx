// src/context/FreelanceContext.tsx
import { createContext, useReducer, type ReactNode } from 'react';
import {type Client, type Project, type Payment } from '../types';

// Global state interface
interface FreelanceState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// Discriminated union for actions (type-safe with 'type' discriminator)
type FreelanceAction =
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'MARK_PROJECT_PAID'; payload: { projectId: string } };

// Initial state with example data (at least 2 clients, 2 projects, 1 payment)
const initialState: FreelanceState = {
  clients: [
    { id: '1', name: 'Client A', country: 'USA', email: 'a@example.com' },
    { id: '2', name: 'Client B', country: 'Canada' },
  ],
  projects: [
    { id: '1', clientId: '1', title: 'Website Redesign', budget: 5000, status: 'in-progress', paymentStatus: 'unpaid' },
    { id: '2', clientId: '2', title: 'Mobile App', budget: 8000, status: 'pending', paymentStatus: 'paid' },
  ],
  payments: [
    { projectId: '2', amount: 8000, date: '2025-10-01' },
  ],
};

// Reducer with type narrowing (switch on action.type)
const freelanceReducer = (state: FreelanceState, action: FreelanceAction): FreelanceState => {
  switch (action.type) {
    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    case 'MARK_PROJECT_PAID':
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj.id === action.payload.projectId
            ? { ...proj, paymentStatus: 'paid' }
            : proj
        ),
      };
    default:
      return state; // TypeScript ensures all cases are handled
  }
};

// Context
export const FreelanceContext = createContext<{
  state: FreelanceState;
  dispatch: React.Dispatch<FreelanceAction>;
} | undefined>(undefined);

// Provider
export const FreelanceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(freelanceReducer, initialState);
  return (
    <FreelanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FreelanceContext.Provider>
  );
};



