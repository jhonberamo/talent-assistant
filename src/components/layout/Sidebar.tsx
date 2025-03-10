import React from 'react';
import { Home, Users, Database, BarChart3, Search as SearchIcon } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const navigation = [
  { name: 'Home', icon: Home, id: 'home', color: 'text-blue-500' },
  { name: 'Candidate Search', icon: SearchIcon, id: 'search', color: 'text-blue-500' },
  { name: 'Talent Pool', icon: Database, id: 'pool', color: 'text-purple-500' },
  { name: 'Reports', icon: BarChart3, id: 'reports', color: 'text-green-500' },
];

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Talent Assistant</h1>
      </div>
      <nav className="mt-4">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              currentPage === item.id
                ? `${item.color} bg-gray-50 border-r-4 border-current`
                : `${item.color} hover:bg-gray-50 opacity-60 hover:opacity-100`
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}