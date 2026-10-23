import React from 'react';
import '../css/Navbar.css';

export default function Navbar({ activeView, setActiveView, todoCount, completedCount }) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setActiveView('viewAll')}>
        TaskMaster
      </div>
      <div className="nav-links">
        <button 
          className={`nav-btn ${activeView === 'viewAll' ? 'active' : ''}`} 
          onClick={() => setActiveView('viewAll')}
        >
          View All
        </button>
        <button 
          className={`nav-btn ${activeView === 'create' ? 'active' : ''}`} 
          onClick={() => setActiveView('create')}
        >
          + Create Task
        </button>
      </div>
      <div className="nav-counters">
        <span className="badge pending">To-Do: {todoCount}</span>
        <span className="badge completed">Completed: {completedCount}</span>
      </div>
    </nav>
  );
}