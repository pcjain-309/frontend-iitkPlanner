// App.js or index.js
import React from 'react';
import MainPage from './MainPage';
import './App.css'

function App(){
  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="/" component={Homepage} />
    //     <Route path="/tasks" component={TasksPage} />
    //     <Route path="/courses" component={CoursesPage} />
    //     <Route path="/schedule" component={SchedulePage} />
    //   </Routes>
    // </Router>
    <MainPage></MainPage>
  );
};

export default App;
