// CourseList.js
import React from 'react';
import './CourseList.css'; // Import the CSS file

const CourseList = ({ courses, onDeleteCourse, onEditCourse }) => {

  const courses2 = localStorage.getItem('courses');
  return (
    <div className="course-list">
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses to display.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <span className="course-name">{course.name}</span>
              <span className="course-code">({course.courseCode})</span>
              <button onClick={() => onDeleteCourse(course.id)}>Delete</button>
              <button onClick={() => onEditCourse(course)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
