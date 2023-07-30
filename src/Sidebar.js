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
            className={activeTab === 'cgpaCalculator' ? 'active' : ''}
            onClick={() => setActiveTab('cgpaCalculator')}
        >
          CPI Calculator
        </li>

        <li
            className={activeTab === 'calendar' ? 'active' : ''}
            onClick={() => setActiveTab('calendar')}
        >
          Weekly Schedule
        </li>

        <li
          className={activeTab === 'schedule' ? 'active' : ''}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </li>

        {/*<li*/}
        {/*    className={activeTab === 'login' ? 'active' : ''}*/}
        {/*    onClick={() => setActiveTab('login')}*/}
        {/*>*/}
        {/*  Login*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

export default Sidebar;
