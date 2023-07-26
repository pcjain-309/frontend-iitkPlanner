// CourseEditForm.js
import React, { useState, useEffect } from 'react';
import './CourseForm.css';

const CourseEditForm = ({ course, onUpdateCourse }) => {
  const [courseData, setCourseData] = useState({
    id: course.id,
    name: course.name || '',
    courseCode: course.courseCode || '',
    credits: course.credits || '',
    professor: course.professor || '',
    timings: course.timings || [{ startTime: '08:00 AM', endTime: '08:15 AM' }],
  });

  useEffect(() => {
    setCourseData({
      id: course.id,
      name: course.name || '',
      courseCode: course.courseCode || '',
      credits: course.credits || '',
      professor: course.professor || '',
      timings: course.timings || [{ startTime: '08:00 AM', endTime: '08:15 AM' }],
    });
  }, [course]);

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (
      courseData.name.trim() !== '' &&
      courseData.courseCode.trim() !== '' &&
      courseData.credits.trim() !== '' &&
      courseData.professor.trim() !== ''
    ) {
      console.log(courseData);
      onUpdateCourse(courseData);
    }
  };

  const handleTimingChange = (index, name, value) => {
    const updatedTimings = [...courseData.timings];
    updatedTimings[index] = {
      ...updatedTimings[index],
      [name]: value,
    };
    setCourseData({
      ...courseData,
      timings: updatedTimings,
    });
  };

  const handleAddTiming = () => {
    setCourseData({
      ...courseData,
      timings: [...courseData.timings, { startTime: '08:00 AM', endTime: '08:15 AM' }],
    });
  };

  const handleRemoveTiming = (index) => {
    const updatedTimings = [...courseData.timings];
    updatedTimings.splice(index, 1);
    setCourseData({
      ...courseData,
      timings: updatedTimings,
    });
  };

  // Helper function to generate time options from 8:00 AM to 6:30 PM with 15 minutes interval
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourString = hour.toString().padStart(2, '0');
        const minuteString = minute.toString().padStart(2, '0');
        const time = `${hourString}:${minuteString} ${hour >= 12 ? 'PM' : 'AM'}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <form onSubmit={handleCourseSubmit} className="course-form">
      <div>
        <label>Course Name:</label>
        <input
          type="text"
          name="name"
          value={courseData.name}
          onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
          placeholder="Enter course name"
        />
      </div>
      <div>
        <label>Course Code:</label>
        <input
          type="text"
          name="courseCode"
          value={courseData.courseCode}
          onChange={(e) => setCourseData({ ...courseData, courseCode: e.target.value })}
          placeholder="Enter course code"
        />
      </div>
      <div>
        <label>Credits:</label>
        <input
          type="text"
          name="credits"
          value={courseData.credits}
          onChange={(e) => setCourseData({ ...courseData, credits: e.target.value })}
          placeholder="Enter course credits"
        />
      </div>
      <div>
        <label>Professor:</label>
        <input
          type="text"
          name="professor"
          value={courseData.professor}
          onChange={(e) => setCourseData({ ...courseData, professor: e.target.value })}
          placeholder="Enter professor's name"
        />
      </div>

      {/* Timings */}
      <div className="timings-section">
        <h3>Class Timings:</h3>
        {courseData.timings.map((timing, index) => (
          <div key={index} className="timing-row">
            <div className="timing-start">
              <label>Class Starting Time:</label>
              <select
                name={`timings[${index}].startTime`}
                value={timing.startTime}
                onChange={(e) => handleTimingChange(index, 'startTime', e.target.value)}
              >
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="timing-end">
              <label>Class Ending Time:</label>
              <select
                name={`timings[${index}].endTime`}
                value={timing.endTime}
                onChange={(e) => handleTimingChange(index, 'endTime', e.target.value)}
              >
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {index > 0 && (
              <button type="button" onClick={() => handleRemoveTiming(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddTiming}>
          Add Timing
        </button>
      </div>

      <button type="submit">Update Course</button>
    </form>
  );
};

export default CourseEditForm;
