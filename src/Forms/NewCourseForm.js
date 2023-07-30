import React, { useState } from 'react';
import './NewCourseForm.css'; // Import the CSS file

const NewCourseForm = () => {
    const [courseCode, setCourseCode] = useState('');
    const [courseDetails, setCourseDetails] = useState(null);
    const [editedCourseDetails, setEditedCourseDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleCourseCodeChange = (e) => {
        setCourseCode(e.target.value);
    };

    const handleFetchDetails = (e) => {
        e.preventDefault();
        setError(null);

        // Make an API call to fetch course details using the entered course code
        fetch(`http://localhost:8080/course/courses/${courseCode}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Course not found');
                }
                return response.json();
            })
            .then((data) => {
                setCourseDetails(data);
                // Initialize editedCourseDetails with the fetched data to enable editing
                setEditedCourseDetails(data);
            })
            .catch((error) => {
                setError(error.message);
                setCourseDetails(null);
                setEditedCourseDetails(null);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCourseDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTimingChange = (index, field, value) => {
        setEditedCourseDetails((prev) => {
            const updatedTimings = [...prev.timings];
            updatedTimings[index][field] = value;
            return { ...prev, timings: updatedTimings };
        });
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();

        const formattedTimings = editedCourseDetails.timings.map((timing) => {
            let start_time = timing.startTime;

            if (start_time.length === 7) {
                start_time = "0" + start_time;
            }
            let end_time = timing.endTime;

            if (end_time.length === 7){
                end_time = "0" + end_time;
            }

            console.log(start_time)
            console.log(end_time);
            return {
                ...timing,
                startTime: start_time,
                endTime: end_time,
            };
        });

        console.log(formattedTimings);

        const updatedCourseDetails = { ...editedCourseDetails, timings: formattedTimings };
        console.log(updatedCourseDetails)
        const authToken = localStorage.getItem("authToken");

        const auth = "Bearer " + authToken;// Replace this with the actual auth token from the request

        console.log(auth, updatedCourseDetails)
        fetch('http://localhost:8080/auth/addCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth, // Include the auth token in the "Authorization" header
            },
            body: JSON.stringify(updatedCourseDetails),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the post-submission action (e.g., show a success message)
                console.log('Course details submitted successfully!', data);
            });
        setCourseCode('');
        setCourseDetails(null);
        setEditedCourseDetails(null);
    };

    return (
        <div className="container">
            {/*<h2>Course Form</h2>*/}
            <div className="grid-container">
                <form className="form-grid" onSubmit={handleFetchDetails}>
                    <label htmlFor="courseCode">Enter Course Code:</label>
                    <input
                        type="text"
                        id="courseCode"
                        value={courseCode}
                        onChange={handleCourseCodeChange}
                    />
                    <button type="submit">Fetch Details</button>
                    {error && <p className="error">Error: {error}</p>}
                </form>

                {editedCourseDetails && (
                    <div className="details-grid">
                        <h3>Course Details:</h3>
                        <form>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editedCourseDetails.name}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="professor">Professor:</label>
                            <input
                                type="text"
                                id="professor"
                                name="professor"
                                value={editedCourseDetails.professor}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="credits">Credits:</label>
                            <input
                                type="number"
                                id="credits"
                                name="credits"
                                value={editedCourseDetails.credits}
                                onChange={handleInputChange}
                            />
                        </form>

                        <h3>Timings:</h3>
                        <ul>
                            {editedCourseDetails.timings.map((timing, index) => (
                                <li key={timing.id}>
                                    <label htmlFor={`startTime${index}`}>Start Time:</label>
                                    <input
                                        type="text"
                                        id={`startTime${index}`}
                                        name={`startTime${index}`}
                                        value={timing.startTime}
                                        onChange={(e) =>
                                            handleTimingChange(index, 'startTime', e.target.value)
                                        }
                                    />
                                    <label htmlFor={`endTime${index}`}>End Time:</label>
                                    <input
                                        type="text"
                                        id={`endTime${index}`}
                                        name={`endTime${index}`}
                                        value={timing.endTime}
                                        onChange={(e) =>
                                            handleTimingChange(index, 'endTime', e.target.value)
                                        }
                                    />
                                    <label htmlFor={`day${index}`}>Day:</label>
                                    <input
                                        type="text"
                                        id={`day${index}`}
                                        name={`day${index}`}
                                        value={timing.day}
                                        onChange={(e) =>
                                            handleTimingChange(index, 'day', e.target.value)
                                        }
                                    />
                                </li>
                            ))}
                        </ul>

                        <button type="submit" onClick={handleFinalSubmit}>
                            Final Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewCourseForm;
