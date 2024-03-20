import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const TeacherCourseList = () => {
  const token=localStorage.getItem('access')
  const baseURL = "http://127.0.0.1:8000";
  const [courses, setCourses] = useState([]);


  const fetchCourses = () => {
    axios.get(baseURL + "/teacher/my_courses/",{
        headers: {
            'Authorization': `Bearer ${token}`,
          },
    })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {        
          console.log(response.data);
          setCourses(response.data);
        } else {
          console.error("Error fetching course: Data is not an array or undefined", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };


  useEffect(() => {
    fetchCourses();
  }, []);




  return (

    <div className=" p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max--screen-lg mx-auto my-10">
        <div>
        

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            
            <div className='flex justify-between'>
              <h1 className="text-4xl font-bold  m-5 text-orange-500">All Courses</h1>
              <Link to='/teacher/add_course'>
              <span className="h-10 mt-3 text-indigo-500 text-md font-semibold border px-4 py-2 rounded-lg hover:text-indigo-500 hover:border-indigo-500">
                  Add New
              </span>
              </Link>
            </div>

            <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
              
            {courses.length === 0 && <tr><td>No Courses Avialable now</td></tr>}
            {courses.map((course) => (
            <div key={course.id}>
              <Link to={`/teacher/view_course/${course.id}`}>
              <span   className="relative my-10 block p-8 overflow-hidden border bg-white border-slate-300 rounded-lg ml-6 mr-6">
                <div className="justify-between sm:flex">
                  <div>
                    <h5 className="text-2xl font-bold text-slate-900">
                      {course.course_name}  
                    </h5>
                    <p className="mt-1 text-xl font-medium text-slate-600">By  {course.user} </p>
                  </div>

                  <div className="flex-shrink-0 hidden ml-3 sm:block">
                    <img
                      className="object-cover w-100 h-16 rounded-lg shadow-sm"
                      src={course.thumbnail}
                      alt=""
                    />
                  </div>
                </div>

                <div className="mt-4 sm:pr-8">
                  <p className="text-md text-slate-500">
                  {course.description}
                  </p>
                </div>


                <dl className="flex justify-between mt-6">
                  <div className="flex ">
                      <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-slate-600">Published</dt>
                        <dd className="text-xs text-slate-500"> {course.date_added}</dd>
                      </div>
                      <div className="flex flex-col-reverse ml-3 sm:ml-6">
                        <dt className="text-sm font-large text-slate-600">Level</dt>
                        <dd className="text-xs text-slate-500">{course.level}</dd>
                      </div>
                      <div className="flex flex-col-reverse ml-3 sm:ml-6 mx-20">
                        <dd className="text-md text-black-500 "><strike>Rs {course.original_price}</strike></dd>
                        <dd className="text-xl text-green-500 ">Rs {course.offer_price}</dd>
                      </div>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', borderRadius: '50%', backgroundColor: course.is_blocked ? 'red' : 'green', color: 'white', fontWeight: 'bold' }}>
                    {course.is_blocked ? "Blocked" : "Active"}
                  </div>




                </dl>
              </span>
              </Link>
            </div>

            ))}


            
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default TeacherCourseList;
