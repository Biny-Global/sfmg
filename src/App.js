import React, { useState } from 'react';
import './App.css';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './pages/HomePage';
import SkinPage from './pages/SkinPage';
import DietPage from './pages/DietPage';
import ExercisePage from './pages/ExercisePage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'skin':
        return <SkinPage />;
      case 'diet':
        return <DietPage />;
      case 'exercise':
        return <ExercisePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}

export default App;
