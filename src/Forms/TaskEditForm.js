// TaskEditForm.js
import React, { useState } from 'react';
import './TaskEditForm.css';

const TaskEditForm = ({ task, onCancelEdit, onSubmit }) => {
  const [editedTaskData, setEditedTaskData] = useState({
    taskName: task.taskName,
    course: task.course,
    description: task.description,
    deadline: task.deadline,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTaskData({
      ...editedTaskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedTaskData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-edit-form">
      <input
        type="text"
        name="taskName"
        value={editedTaskData.taskName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="course"
        value={editedTaskData.course}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={editedTaskData.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="date"
        name="deadline"
        value={editedTaskData.deadline}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancelEdit}>
        Cancel
      </button>
    </form>
  );
};

export default TaskEditForm;
