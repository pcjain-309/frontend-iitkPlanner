// TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState({
    taskName: '',
    course: '',
    description: '',
    deadline: '',
  });

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskData.taskName.trim() !== '') {
      onAddTask(taskData);
      setTaskData({
        taskName: '',
        course: '',
        description: '',
        deadline: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleTaskSubmit} className="task-form">
      <input
        type="text"
        name="taskName"
        value={taskData.taskName}
        onChange={handleChange}
        placeholder="Enter task name"
      />
      <input
        type="text"
        name="course"
        value={taskData.course}
        onChange={handleChange}
        placeholder="Enter course name"
      />
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Enter task description"
      ></textarea>
      <input
        type="date"
        name="deadline"
        value={taskData.deadline}
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
