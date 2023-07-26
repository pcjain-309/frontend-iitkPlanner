// TaskList.js
import React, { useState } from 'react';
import TaskEditForm from '../Forms/TaskEditForm';

const TaskList = ({ tasks, onEditTask }) => {
  const [editTaskId, setEditTaskId] = useState(null);

  const handleEditClick = (taskId) => {
    setEditTaskId(taskId);
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
  };

  const handleTaskSubmit = (taskId, updatedTaskData) => {
    onEditTask(taskId, updatedTaskData);
    setEditTaskId(null);
  };

  return (
    <div className="task-list">
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks created yet.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {editTaskId === task.id ? (
                <TaskEditForm
                  task={task}
                  onCancelEdit={handleCancelEdit}
                  onSubmit={(updatedTaskData) =>
                    handleTaskSubmit(task.id, updatedTaskData)
                  }
                />
              ) : (
                <>
                  <strong>Task: </strong>
                  {task.taskName}
                  <br />
                  <strong>Course: </strong>
                  {task.course}
                  <br />
                  <strong>Description: </strong>
                  {task.description}
                  <br />
                  <strong>Deadline: </strong>
                  {task.deadline}
                  <br />
                  <button onClick={() => handleEditClick(task.id)}>
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
