// CoursePage.js
import React, { useState, useEffect } from 'react';
import CourseList from './../Lists/CourseList';
import CourseForm from './../Forms/CourseForm';
import CourseEditForm from './../Forms/CourseEditForm';
import './CoursePage.css'; // Import the CSS file
import axios from "axios";
import NewCourseForm from "../Forms/NewCourseForm";

const CoursePage = () => {

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [someValue, setSomeValue] = useState(0);

  useEffect( () => {
    console.log("In the useEffeect of COurse Page")
    console.log(courses)
    const authToken = localStorage.getItem("authToken")
    const apiUrl = 'http://localhost:8080/auth/user/selectedCourses';
    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      console.log(response)
      // Check if the response is successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        // Handle the data
        setCourses(response.data);
      } else {
        console.error('Network response was not ok');
      }
    })
        .catch((error) => {
          // Handle errors
          console.error('Error fetching courses:', error);
        });
    console.log("Here")
    console.log(courses?.length)
    console.log(courses)
  }, [someValue]);


  const refresh = () => {
    console.log(someValue);
    if(someValue < 10)
    {
      setSomeValue(someValue+1);
    }
    else setSomeValue(0);
  }

  const handleEditClick = (course) => {
    console.log("Into the edit click")
    console.log(selectedCourse)
    // if(selectedCourse!== null) setSelectedCourse(null);
    setSelectedCourse(course);
  };

  const handleEndEdit = () => {
    setSelectedCourse(null);
  }

  const handleDeleteCourse = (id) => {
    console.log(id);
    try {
      fetch(`http://localhost:8080/selectedCourse/${id}`, {
        method: 'DELETE',
      });
      // fetchCourses();
      // setSelectedCourse(null);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }

  if(courses?.length !== 0 || courses?.length === 0){
    // console.log(courses)
    const coursesArray = Object.values(courses);
    // console.log(coursesArray)
    const coursesList = coursesArray;
    // console.log(coursesList)

    return (
        <div className="course-page">
          <h1>IITK-Planner</h1>
          <div className="content">
            <div className="course-form-container">
              <h2>Add New Course</h2>
              {/*<CourseForm />*/}
              <NewCourseForm></NewCourseForm>
            </div>
            <div className="course-list-container" key={coursesList}>
              {/*<CourseList courses={coursesArray}*/}
              {/*/>*/}

              <div className="course-list" >
                <h2>Courses</h2>
                {coursesList.length === 0 ? (
                    <p>No courses to display.</p>
                ) : (
                    <ul>
                      {coursesList.map((course) => (
                          <li key={course.id}>
                            <span className="course-code">{course.courseCode}</span>
                            <span className="course-credits">Credits: {course.credits}</span>
                            <h3>Class Timings:</h3>
                            <ul className="timings-list">
                              {course.timings.map((timing) => (
                                  <li key={timing.id}>
                                    <span className="timing-day">{timing.day}</span>
                                    <span className="timing-start">Start: {timing.startTime}</span>
                                    <span className="timing-end">End: {timing.endTime}</span>
                                  </li>
                              ))}
                            </ul>
                            <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                            <button onClick={() => handleEditClick(course)}>Edit</button>
                          </li>
                      ))}
                    </ul>
                )}

                {selectedCourse && (
                    // <div></div>
                    <div className="edit-course-form">
                      {console.log(selectedCourse)}
                      <CourseForm
                          course={selectedCourse}
                          onRefresh={refresh}
                          endEdit = {handleEndEdit}
                          // onUpdateCourse={onUpdateCourse}
                      />
                    </div>
                )}
              </div>


            </div>

          </div>
        </div>
    );
  }

};

export default CoursePage;
