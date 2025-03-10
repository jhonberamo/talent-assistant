import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Home } from './views/Home';
import { CandidateSearch } from './views/CandidateSearch';
import { TalentPool } from './views/TalentPool';
import { Reports } from './views/Reports';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'search':
        return <CandidateSearch />;
      case 'pool':
        return <TalentPool />;
      case 'reports':
        return <Reports />;
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}

export default App