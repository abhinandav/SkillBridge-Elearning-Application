import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminCourseRequests() {
  const authentication_user = useSelector(state => state.authentication_user);
  console.log('authicate', authentication_user.isAuthenticated);
  const token=localStorage.getItem('access')

  const baseURL = "http://127.0.0.1:8000";
  const [courses, setCourses] = useState([]);
  const [rcourses, setRCourses] = useState([]);

  const fetchCourse = (url) => {
    axios.get(url)
      .then((response) => {
        console.log('API response:', response.data);
        if (response.data) {
          if (Array.isArray(response.data)) {
            const filteredUsers = response.data.filter(course =>  !course.is_rejected && !course.is_accepted );
            console.log(filteredUsers);
            setCourses(filteredUsers);
          } else {
            console.error("Error fetching users: Data is not an array", response.data);
          }
        } else {
          console.error("Error fetching users: Response data is undefined", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  

  const fetchRejectedCourse = (url) => {
    axios.get(url,{
      headers: {
        'authorization': `Bearer ${token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  })
      .then((response) => {
        console.log('API response:', response.data);
        if (response.data) {
          if (Array.isArray(response.data)) {
            const filteredUsers = response.data.filter(course => !course.is_accepted  && course.is_rejected);
            console.log(filteredUsers);
            setRCourses(filteredUsers);
          } else {
            console.error("Error fetching users: Data is not an array", response.data);
          }
        } else {
          console.error("Error fetching users: Response data is undefined", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  
  


  

  useEffect(() => {
    fetchCourse(baseURL + "/adminapp/courses/");
    fetchRejectedCourse(baseURL + "/adminapp/courses/")
  }, []);



  return (
    <div>
      <Sidebar />
      <AdminHeader />
      <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <div className='p-6'>
          <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
              <div>
              <h2 className="text-indigo-600 font-semibold">Pending Requests</h2>
                <span className="text-xs">Accept or Reject courses</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  
                </div>
              </div>
            </div>
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                         Course Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date Added
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          View
                        </th>
                      

                      
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length === 0 && <tr><td>No Users Found</td></tr>}

                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">{course.course_name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{course.user}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{course.date_added}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{course.level}</p>
                          </td>
                          

                          <td>
                            <Link to={`/admin/view_course/${course.id}`}>
                            <button className="bg-blue-600 px-2 py-2  rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
                              View
                            </button>
                            </Link>
                          </td>


                       

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='p-6 mt-10'>
          <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="text-red-600 font-semibold">Rejected courses</h2>
                {/* <span className="text-xs">Accept or Reject courses</span> */}
              </div>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  
                </div>
              </div>
            </div>
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                         Course Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date Added
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          View
                        </th>
                      

                      
                      </tr>
                    </thead>
                    <tbody>
                      {rcourses.length === 0 && <tr><td>No Users Found</td></tr>}

                      {rcourses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">{course.course_name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{course.user}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{course.date_added}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{course.level}</p>
                          </td>
                          

                          <td>
                            <Link to={`/admin/view_course/${course.id}`}>
                            <button className="bg-blue-600 px-2 py-2  rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
                              View
                            </button>
                            </Link>
                          </td>


                       

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCourseRequests;
