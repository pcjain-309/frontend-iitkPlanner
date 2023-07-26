// Homepage.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './App.css';
import TaskPage from './Pages/TaskPage';
import CoursePage from './Pages/CoursePage';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="content">


        {activeTab === 'home' && <div>This is the home page</div>}
        {activeTab === 'tasks' && <TaskPage></TaskPage>}
        {activeTab === 'courses' && <CoursePage></CoursePage>}
        {activeTab === 'schedule' && <div>Schedule Content</div>}
      </main>
    </div>
  );
};

export default MainPage;
