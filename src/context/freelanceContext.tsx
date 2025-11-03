import { createContext, useReducer, type ReactNode } from 'react';
import {type Client, type Payment, type Project,   } from '../types';

// === 1. Global State Interface ===
interface FreelanceState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// === 2. Discriminated Union for Actions ===
type FreelanceAction =
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'MARK_PROJECT_PAID'; payload: { projectId: string } };

// === 3. Initial State with 6 Clients, 6 Projects, 4 Payments ===
const initialState: FreelanceState = {
  clients: [
    { id: '1', name: 'Client A', country: 'USA', email: 'a@example.com' },
    { id: '2', name: 'Client B', country: 'Canada' },
    { id: '3', name: 'Sarah Johnson', country: 'United Kingdom', email: 'sarah@acme.co.uk' },
    { id: '4', name: 'Tokyo Design Studio', country: 'Japan', email: 'hello@tokyodesign.jp' },
    { id: '5', name: 'Maria García', country: 'Spain' },
    { id: '6', name: 'TechFlow GmbH', country: 'Germany', email: 'info@techflow.de' },
  ],
  projects: [
    {
      id: '1',
      clientId: '1',
      title: 'Website Redesign',
      budget: 5000,
      status: 'in-progress',
      paymentStatus: 'unpaid',
    },
    {
      id: '2',
      clientId: '2',
      title: 'Mobile App',
      budget: 8000,
      status: 'pending',
      paymentStatus: 'paid',
    },
    {
      id: '3',
      clientId: '3',
      title: 'Brand Identity Package',
      budget: 3500,
      status: 'completed',
      paymentStatus: 'paid',
    },
    {
      id: '4',
      clientId: '4',
      title: 'E-commerce Platform',
      budget: 12000,
      status: 'in-progress',
      paymentStatus: 'unpaid',
    },
    {
      id: '5',
      clientId: '5',
      title: 'Marketing Campaign',
      budget: 2800,
      status: 'pending',
      paymentStatus: 'unpaid',
    },
    {
      id: '6',
      clientId: '6',
      title: 'SaaS Dashboard',
      budget: 9500,
      status: 'completed',
      paymentStatus: 'paid',
    },
  ],
  payments: [
    { projectId: '2', amount: 8000, date: '2025-10-01' },
    { projectId: '3', amount: 3500, date: '2025-09-15' },
    { projectId: '6', amount: 9500, date: '2025-08-20' },
    { projectId: '1', amount: 5000, date: '2025-11-03' }, // Example recent payment
  ],
};

// === 4. Reducer with Type Narrowing ===
const freelanceReducer = (state: FreelanceState, action: FreelanceAction): FreelanceState => {
  switch (action.type) {
    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload],
        // Optionally auto-mark project as paid if amount matches budget
        projects: state.projects.map((proj) =>
          proj.id === action.payload.projectId && action.payload.amount >= proj.budget
            ? { ...proj, paymentStatus: 'paid' }
            : proj
        ),
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
      // TypeScript ensures all cases are covered
      return state;
  }
};

// === 5. Context Creation ===
interface FreelanceContextProps {
  state: FreelanceState;
  dispatch: React.Dispatch<FreelanceAction>;
}

export const FreelanceContext = createContext<FreelanceContextProps | undefined>(undefined);

// === 6. Provider Component ===
export const FreelanceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(freelanceReducer, initialState);

  return (
    <FreelanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FreelanceContext.Provider>
  );
};



