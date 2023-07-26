// TaskPage.js
import React, { useState, useEffect } from 'react';
import TaskForm from './../Forms/TaskForm';
import TaskList from './../Lists/TaskList';

const TaskPage = () => {
  // Load tasks from local storage when the component mounts
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(), // Add a unique ID to the task
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (taskId, updatedTaskData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTaskData } : task
      )
    );
  };

  return (
    <div className="container">
      <main className="content">
        <h1>Task Page</h1>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onEditTask={handleEditTask} />
      </main>
    </div>
  );
};

export default TaskPage;