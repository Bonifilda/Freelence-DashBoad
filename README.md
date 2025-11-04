
 Freelance Dashboard (React + TypeScript)

Amodern, type-safe freelance management dashboard that helps freelancers track clients, projects, and payments with a clean UI, dark mode, and real-time state management.

 Technologies Used
 Technology :Purpose
React:UI framework 
TypeScript :Strong typing, interfaces, discriminated unions |
Vite  :Fast dev server & build tool 
Tailwind CSS: Responsive, modern styling 
Lucide Icons : Beautiful SVG icons 
Context API + useReducer :Global state management 
 Main Features

- 6 Clients with name, country, optional email
- 6 Projects linked to clients with status & payment tracking
- 4 Payment Records in ISO date format
- Mark Project as Paid (type-safe state update)
- Search Projects by title
-  Projects by status or payment
- Dashboard Stats(total projects, paid/unpaid, revenue)
- Dark Mode Toggle
- Responsive Sidebar Navigation
- Status Badges(Pending, In Progress, Completed)
- Payment Badges (Paid/Unpaid)
- Type-Safe Components & Actions
- Utility Functions (count, filter, search, validation)
 Folder Structure
src/
├── components/         
│   ├── ClientCard.tsx
│   ├── ProjectList.tsx
│   └── DashboardStats.tsx
├── context/            
│   └── FreelanceContext.tsx
├── utils/              
│   └── freelanceUtils.ts
├── types.ts           
├── App.tsx             
└── main.tsx            
  3 screenshots while running `npm run dev`:
   - Dashboard (light mode)
   - Projects tab (dark mode)
   - Clients tab
   - Save as:
     - dashboard-light.png
     - projects-dark.png
     - clients.png

