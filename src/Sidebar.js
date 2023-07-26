// Sidebar.js
import React from 'react';
import './App.css'

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <ul>
        
        <li
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          Home
        </li>
        <li
          className={activeTab === 'tasks' ? 'active' : ''}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </li>
        <li
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </li>
        <li
          className={activeTab === 'schedule' ? 'active' : ''}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
