import React, { useState } from 'react';
import axios from 'axios';

const CourseForm2 = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    courseCode: '',
    credits: '',
    professor: '',
    startTime: '08:00 AM',
    endTime: '08:15 AM',
  });

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/courses', courseData)
      .then((response) => {
        console.log('Course added successfully!', response.data);
        // Clear form data
        setCourseData({
          name: '',
          courseCode: '',
          credits: '',
          professor: '',
          startTime: '08:00 AM',
          endTime: '08:15 AM',
        });
      })
      .catch((error) => {
        console.error('Error adding course:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  // ... Rest of the component (JSX)

  return (
    // ... Form JSX
  );
};

export default CourseForm2;
