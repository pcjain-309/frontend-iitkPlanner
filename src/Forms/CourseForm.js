import React, {useEffect, useState} from 'react';
import './CourseForm.css';

const CourseForm = ({course, onRefresh, endEdit}) => {

  console.log(course?.length)
  console.log(course)

  const [check, setCheck] = useState(true);

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

  const handleTimingChange = (index, e) => {
    const { name, value } = e.target;
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


  const timeOptions = generateTimeOptions();
  const [courseData, setCourseData] = useState({
    id : course ? course.id : null,
    name: '',
    courseCode: '',
    credits: 9,
    professor: '',
    timings: [{ startTime: '08:00 AM', endTime: '08:15 AM', day : 'Monday' }],
  });

  useEffect(() => {
    if (course) {
      setCourseData({
        id: course.id,
        name: course.name,
        courseCode: course.courseCode,
        credits: parseInt(course.credits),
        professor: course.professor,
        timings: course.timings,
      });
    }
  }, [course]);


  const handleAddCourse = (newCourse) => {
    console.log(newCourse);
    fetch('http://localhost:8080/selectedCourse/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((error) => {
          console.error('Error adding course:', error);
        });
    // setCourses([...courses, { ...newCourse, id: Date.now().toString() }]);
  };

  const handleUpdateCourse =  (updatedCourse) => {
    try {
          console.log(updatedCourse);
      const authToken = localStorage.getItem('authToken');
      const auth = "Bearer " + authToken;
      // Make the API call to update the course details

      console.log(authToken, updatedCourse, auth);
      fetch('http://localhost:8080/auth/updateCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth, // Set the authToken in the request headers
        },
        body: JSON.stringify(updatedCourse),
      })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response (e.g., show a success message)
            console.log('Course details updated successfully!', data);
          });
    }
    catch (error) {
      console.error('Error updating course:', error);
    }
    // console.log(updatedCourse);
    // const updatedCourses = courses.map((course) => (course.id === id ? { ...updatedCourse, id } : course));
    // setCourses(updatedCourse);
    // setSelectedCourse(null);
  };
;

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (
      courseData.name.trim() !== '' &&
      courseData.courseCode.trim() !== '' &&
      courseData.professor.trim() !== ''
    ) {
      if (course) {

        // const credits = parseInt(courseData.credits);

        // setCourseData({
        //   ...courseData,
        //   credits: credits,
        // });
        console.log(courseData)
        handleUpdateCourse(courseData);
        setCheck(false);
        console.log("Refrshing...")
        // onRefresh();
        endEdit();
      }

      else
      {
        handleAddCourse(courseData);
        setCourseData({
          name: '',
          courseCode: '',
          credits: 9,
          professor: '',
          timings: [{ startTime: '08:00 AM', endTime: '08:15 AM', day: 'Monday' }],
        });
      }

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleAddTiming = () => {
    setCourseData({
      ...courseData,
      timings: [...courseData.timings, { startTime: '08:00 AM', endTime: '08:15 AM', day: 'Monday' }],
    });
  };

  const handleRemoveTiming = (index) => {
    const updatedTimings = courseData.timings.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      timings: updatedTimings,
    });
  };

  if(!check) {
    return null;
  }

  console.log("Just Above return")

  return (

    <form onSubmit={handleCourseSubmit} className="course-form">
      <div>
        <label>Course Name:</label>
        <input
          type="text"
          name="name"
          value={courseData.name}
          onChange={handleChange}
          placeholder="Enter course name"
        />
      </div>
      <div>
        <label>Course Code:</label>
        <input
          type="text"
          name="courseCode"
          value={courseData.courseCode}
          onChange={handleChange}
          placeholder="Enter course code"
        />
      </div>
      <div>
        <label>Credits:</label>
        <input
          type="number"
          name="credits"
          value={parseInt(courseData.credits)}
          onChange={handleChange}
          placeholder="Enter course credits"
        />
      </div>
      <div>
        <label>Professor:</label>
        <input
          type="text"
          name="professor"
          value={courseData.professor}
          onChange={handleChange}
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
                name="startTime"
                value={timing.startTime}
                onChange={(e) => handleTimingChange(index, e)}
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
                name="endTime"
                value={timing.endTime}
                onChange={(e) => handleTimingChange(index, e)}
              >
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="timing-day">
              <label>Day:</label>
              <select
                  name="day"
                  value={timing.day}
                  onChange={(e) => handleTimingChange(index, e)}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                {/* Add more options for other days of the week if needed */}
              </select>
            </div>


            <button type="button" onClick={() => handleRemoveTiming(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTiming}>
          Add Timing
        </button>
      </div>

      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
