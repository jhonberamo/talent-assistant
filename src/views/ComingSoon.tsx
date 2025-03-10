import React from 'react';
import { Construction } from 'lucide-react';

export function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Under Construction</h2>
      <p className="text-gray-600 max-w-md">
        We're working hard to bring you exciting new features. This section will be available soon with powerful tools to enhance your recruitment process.
      </p>
    </div>
  );
}