import React, {useEffect, useState} from 'react';
import './CalendarPage.css';
import axios from "axios";

const daysOfWeek = ['M', 'T', 'W', 'Th', 'F'];
const startTime = '08:00 AM';
const endTime = '08:00 PM';

const formatTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';

    // Add leading zeroes for hour and minute
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinute} ${period}`;
};


const CalendarPage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        console.log('In the useEffect of Calendar Page');
        // console.log(courses);
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

    const timeSlots = [];
    const currentDate = new Date(`01/01/2023 ${startTime}`);
    const endDateTime = new Date(`01/01/2023 ${endTime}`);

    while (currentDate <= endDateTime) {
        timeSlots.push(formatTime(currentDate));
        currentDate.setMinutes(currentDate.getMinutes() + 15);
    }

    const getTimeSlotIndex = (time) => {
        return timeSlots.findIndex((slot) => slot === time);
    };

    const getDayIndex = (day) => {
        return daysOfWeek.findIndex((d) => d === day);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const renderTimeSlot = (time) => {
        const courseCells = daysOfWeek.map((day) => {
            const course = courses.find(
                (c) =>
                    c.timings.some(
                        (timing) =>
                            timing.day === day &&
                            getTimeSlotIndex(timing.startTime) <= getTimeSlotIndex(time) &&
                            getTimeSlotIndex(timing.endTime) >= getTimeSlotIndex(time)
                    )
            );

            if (course) {
                let courseColor = course.color || getRandomColor();
                course.color = courseColor;

                return (
                    <td key={`${day}_${time}`} style={{ backgroundColor: courseColor }}>
                        {course.name}
                    </td>
                );
            } else {
                return <td key={`${day}_${time}`}></td>;
            }
        });

        return (
            <tr key={time}>
                <td>{time}</td>
                {courseCells}
            </tr>
        );
    };

    console.log(courses)

    return (
        <div className="calendar-page">
            <h2>Weekly Calendar</h2>
            <table>
                <thead>
                <tr>
                    <th>Time</th>
                    {daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {timeSlots.map((time) => renderTimeSlot(time))}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarPage;
