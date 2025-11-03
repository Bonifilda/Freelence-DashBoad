// src/components/ClientCard.tsx
import { type Client } from '../types';
import { Mail, MapPin, User } from 'lucide-react';

interface ClientCardProps {
  client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <div className="group p-6 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-bold">{client.name}</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {client.country}
        </p>
        {client.email ? (
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {client.email}
          </p>
        ) : (
          <p className="italic">No email provided</p>
        )}
      </div>
    </div>
  );
};
