import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ShortcutCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export function ShortcutCard({ title, description, icon: Icon, color, onClick }: ShortcutCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left"
    >
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}