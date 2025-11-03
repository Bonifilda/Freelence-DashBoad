// src/App.tsx
import { useContext, useState } from 'react';
import { FreelanceContext } from './context/freelanceContext';
import { ClientCard } from './components/ClientCard';
import { ProjectList } from './components/ProjectList';
import { DashboardStats } from './components/DashboardStats';
import { Briefcase, DollarSign, Users, Calendar, Sun, Moon, Search } from 'lucide-react';


import { filterProjects, searchByName, validateAndCreatePayment } from './utils.ts/freelanceUtils';
import type { Project } from './types';

function App() {
  const { state, dispatch } = useContext(FreelanceContext)!;
  const { clients, projects, payments } = state;

  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Project['status'] | undefined>(undefined);
  const [filterPayment, setFilterPayment] = useState<Project['paymentStatus'] | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'projects' | 'payments'>('dashboard');

  const searchedProjects = searchByName(projects, searchQuery);
  const filteredProjects = filterProjects(searchedProjects, filterStatus, filterPayment);

  const handleAddPayment = (projectId: string) => {
    const payment = validateAndCreatePayment(projectId, 5000, new Date().toISOString());
    if (payment) dispatch({ type: 'ADD_PAYMENT', payload: payment });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors`}>
      {/* Header */}
      <header className={`shadow-sm border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              FreelanceHub
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <DollarSign className="w-5 h-5" /> },
              { id: 'clients', label: 'Clients', icon: <Users className="w-5 h-5" /> },
              { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
              { id: 'payments', label: 'Payments', icon: <Calendar className="w-5 h-5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl mx-auto">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>
              <DashboardStats projects={projects} payments={payments} />
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Clients</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-3xl font-bold">Projects</h2>
                <div className="flex gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 pr-4 py-2 rounded-lg border w-full ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <select
                    value={filterStatus || ''}
                    onChange={(e) => setFilterStatus(e.target.value as Project['status'] || undefined)}
                    className={`px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    value={filterPayment || ''}
                    onChange={(e) => setFilterPayment(e.target.value as Project['paymentStatus'] || undefined)}
                    className={`px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  >
                    <option value="">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>
              </div>

              <ProjectList projects={filteredProjects} clients={clients} />
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Payment Records</h2>
              <div className="grid gap-4">
                {payments.length === 0 ? (
                  <p className="text-gray-500">No payments recorded yet.</p>
                ) : (
                  payments.map((pay, i) => (
                    <div
                      key={i}
                      className={`p-5 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Project ID: {pay.projectId}</p>
                          <p className="text-sm text-gray-500">Date: {new Date(pay.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-xl font-bold text-green-600">${pay.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => handleAddPayment('1')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Record Test Payment
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;



  