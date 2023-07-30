// CGPACalculator.js
import React, { useEffect, useState } from 'react';
import './CGPAPage.css';
import axios from "axios";

const gradeScores = {
    A: 10,
    'B+': 9,
    B: 8,
    'C+': 7,
    C: 6,
    'D+': 5,
    D: 4,
    Fail: 0,
};

const CGPAPage = () => {
    const [courseGrades, setCourseGrades] = useState({});
    const [courses, setCourses] = useState([]);
    const [cgpa, setCgpa] = useState(0.0);

    useEffect(() => {
        console.log('In the useEffect of Course Page');
        console.log(courses);
        // fetch('http://localhost:8080/selectedCourse/getAll')
        //     .then((response) => response.json())
        //     .then((data) => setCourses(data))
        //     .catch((error) => console.error('Error fetching courses:', error));

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

        console.log(courses?.length);
        console.log(courses)
    }, []);

    // Function to handle grade selection from dropdown
    const handleGradeChange = (courseId, grade) => {
        setCourseGrades((prevGrades) => ({
            ...prevGrades,
            [courseId]: grade,
        }));
    };

    // Function to calculate CGPA
    const calculateCGPA = () => {
        let totalCreditHours = 0;
        let totalGradePoints = 0;

        courses.forEach((course) => {
            const creditHours = course.credits;
            const grade = courseGrades[course.id];

            if (grade && gradeScores.hasOwnProperty(grade)) {
                totalCreditHours += creditHours;
                totalGradePoints += creditHours * gradeScores[grade];
            }
        });

        const cgp = totalGradePoints / totalCreditHours;
        setCgpa(cgp);
    };


    return (
        <div>
            <h2>CGPA Calculator: </h2>
            <div className="container">
                <div className="table-container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Credits</th>
                            <th>Grade</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.courseCode}</td>
                                <td>{course.credits}</td>
                                <td>
                                    <select
                                        className="grade-select"
                                        value={courseGrades[course.id] || ''}
                                        onChange={(e) => handleGradeChange(course.id, e.target.value)}
                                    >
                                        <option value="">Select Grade</option>
                                        {Object.keys(gradeScores).map((grade) => (
                                            <option key={grade} value={grade}>
                                                {grade}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className="calculate-button" onClick={calculateCGPA}>
                        Calculate CGPA
                    </button>
                </div>
            </div>
            <div className="cgpa-result">Your CGPA is: {cgpa.toFixed(2)}</div>
        </div>
    );
};

export default CGPAPage;
