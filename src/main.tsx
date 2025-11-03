import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FreelanceProvider } from './context/freelanceContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FreelanceProvider>
      <App />
    </FreelanceProvider>
  </React.StrictMode>
);




