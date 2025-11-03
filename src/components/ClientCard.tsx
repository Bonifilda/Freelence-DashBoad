// src/components/ClientCard.tsx
import {type Client } from '../types';

interface ClientCardProps {
  client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold">{client.name}</h3>
      <p>Country: {client.country}</p>
      <p>Email: {client.email ?? 'Not provided'}</p> {/* Handle optional safely */}
    </div>
  );
};
