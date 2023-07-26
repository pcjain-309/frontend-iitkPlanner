// import React, { useState, useEffect } from 'react';
// import './CourseList.css';
// import CourseForm from '../Forms/CourseForm';
//
// const CourseList = (courses) => {
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [refreshFlag, setRefreshFlag] = useState(false);
//
//   // Callback function to refresh the parent component
//   const handleRefresh = () => {
//     // setRefreshFlag(!refreshFlag);
//     console.log("IN")
//   };
//
//
//
//   return (
//     <div className="course-list">
//       <h2>Courses</h2>
//       {courseList.length === 0 ? (
//           <p>No courses to display.</p>
//       ) : (
//           <ul>
//             {courseList.map((course) => (
//                 <li key={course.id}>
//                   <span className="course-name">{course.name}</span>
//                   <span className="course-code">({course.courseCode})</span>
//                   <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
//                   <button onClick={() => handleEditClick(course)}>Edit</button>
//                 </li>
//             ))}
//           </ul>
//       )}
//
//       {selectedCourse && (
//         <div className="edit-course-form">
//           <CourseForm
//             course={selectedCourse}
//             onRefresh={handleRefresh}
//             // onUpdateCourse={onUpdateCourse}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default CourseList;
