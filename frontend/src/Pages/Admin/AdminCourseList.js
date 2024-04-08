import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminTeacherList() {
  const authentication_user = useSelector(state => state.authentication_user);
  console.log('authicate', authentication_user.isAuthenticated);

  const baseURL = "http://127.0.0.1:8000";
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCourses = (url) => {
    axios.get(url)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {     
          const filteredCourses = response.data.filter(course => course.is_accepted );   
          console.log(response.data);
          setCourses(filteredCourses);
        } else {
          console.error("Error fetching courses: Data is not an array or undefined", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  useEffect(() => {
    fetchCourses(`${baseURL}/adminapp/courses/`);
  }, []);

  const handleInputChange = event => {
    setSearch(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    (course.course_name?.toLowerCase().includes(search.toLowerCase()) ||
    course.user?.toLowerCase().includes(search.toLowerCase())) ?? false
);



  const blockCourse = (id) => {
    const confirmBlock = window.confirm('Are you sure you want to block this course?');
    if (confirmBlock) {
      axios.patch(`${baseURL}/adminapp/course_status/${id}/`, { is_blocked: true })
        .then((response) => {
          console.log('Course blocked successfully', response);
          fetchCourses(`${baseURL}/adminapp/courses/`);
        })
        .catch((error) => {
          console.error('Error blocking course:', error);
        });
    }
  };

  const unblockUser = (id) => {
    const confirmUnblock = window.confirm('Are you sure you want to unblock this user?');
    if (confirmUnblock) {
      axios.patch(`${baseURL}/adminapp/course_status/${id}/`, { is_blocked:false })
        .then((response) => {
          console.log('course unblocked successfully', response);
          fetchCourses(`${baseURL}/adminapp/courses/`);
        })
        .catch((error) => {
          console.error('Error unblocking course:', error);
        });
    }
  };
  
  

  return (
    <div>
      <Sidebar />
      <AdminHeader />
      <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <div className='p-6'>
          <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="text-gray-600 font-semibold">Course List</h2>
                <span className="text-xs">Manage all course</span>
              </div>

              <div className='flex items-center justify-center  ml-10 '>
                <div className="flex items-center border border-gray-500  bg-white rounded-lg">
                  <form onSubmit={e => e.preventDefault()} className="w-full flex items-center">
                    <input 
                      type="search" 
                      value={search} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-1   text-gray-800 rounded-full focus:outline-none"
                      placeholder="Search" 
                    />
                  </form>
                </div>
              </div>

              <Link to='/admin/course_request'>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  <span className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide ">
                    View New Courses
                  </span>
                </div>
              </div>
              </Link>

            </div>
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date Added
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Action
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.length === 0 && <tr><td colSpan="6">No Courses Found</td></tr>}

                      {filteredCourses.map((course) => (
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
                            {!course.is_blocked ? (
                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                <span className="relative">Active</span>
                              </span>
                            ) : (
                              <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                <span className="relative">Blocked</span>
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {!course.is_blocked ? (
                              <button onClick={() => blockCourse(course.id)} className="bg-red-600 px-2 py-2 rounded-md ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                Block
                              </button>
                            ) : (
                              <button onClick={() => unblockUser(course.id)} className="bg-green-600 px-2 py-2 rounded-md ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                Unblock
                              </button>
                            )}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link to={`/admin/course_view/${course.id}`}>
                              <button className="bg-blue-600 px-2 py-2 rounded-md ml-3 text-white font-semibold tracking-wide cursor-pointer">
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

export default AdminTeacherList;




// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../Components/Admin/Sidebar';
// import AdminHeader from '../../Components/Admin/AdminHeader';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// function AdminTeacherList() {
//   const authentication_user = useSelector(state => state.authentication_user);
//   console.log('authicate', authentication_user.isAuthenticated);

//   const baseURL = "http://127.0.0.1:8000";
//   const [courses, setCourse] = useState([]);
//   const [search, setSearch] = useState('');

  

//   const fetchCourse = (url) => {
//     axios.get(url)
//       .then((response) => {
//         if (response.data && Array.isArray(response.data)) {     
//           const filteredUsers = response.data.filter(course => course.is_accepted );   
//           console.log(response.data);
//           setCourse(filteredUsers);
//         } else {
//           console.error("Error fetching users: Data is not an array or undefined", response);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });
//   };


//   console.log('hahahah',courses);


  // const blockCourse = (id) => {
  //   const confirmBlock = window.confirm('Are you sure you want to block this course?');
  //   if (confirmBlock) {
  //     axios.patch(`${baseURL}/adminapp/course_status/${id}/`, { is_blocked: true })
  //       .then((response) => {
  //         console.log('Course blocked successfully', response);
  //         fetchCourse(`${baseURL}/adminapp/courses/`);
  //       })
  //       .catch((error) => {
  //         console.error('Error blocking course:', error);
  //       });
  //   }
  // };

  // const unblockUser = (id) => {
  //   const confirmUnblock = window.confirm('Are you sure you want to unblock this user?');
  //   if (confirmUnblock) {
  //     axios.patch(`${baseURL}/adminapp/course_status/${id}/`, { is_blocked:false })
  //       .then((response) => {
  //         console.log('course unblocked successfully', response);
  //         fetchCourse(`${baseURL}/adminapp/courses/`);
  //       })
  //       .catch((error) => {
  //         console.error('Error unblocking course:', error);
  //       });
  //   }
  // };
  
  

//   useEffect(() => {
//     fetchCourse(baseURL + "/adminapp/courses/");
//   }, []);




//   const handleInputChange = event => {
//     setSearch(event.target.value);
//   };


//   const filteredCourses = courses.filter(course =>
//     course.course_name.toLowerCase().includes(search.toLowerCase()) ||
//     course.user.toLowerCase().includes(search.toLowerCase()) ||
//     course.author.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <Sidebar />
//       <AdminHeader />
//       <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
//         <div className='p-6'>
//           <div className="bg-white p-8 rounded-md w-full">
//             <div className="flex items-center justify-between pb-6">
//               <div>
//                 <h2 className="text-gray-600 font-semibold">Course List</h2>
//                 <span className="text-xs">Manage all course</span>
//               </div>

//               <div className='flex items-center justify-center  '>
//                 <div className="flex items-center border   bg-white rounded-lg">
//                   <form onSubmit={e => e.preventDefault()} className="w-full flex items-center">
//                     <input 
//                       type="search" 
//                       value={search} 
//                       onChange={handleInputChange} 
//                       className="w-full px-4 py-1   text-gray-800 rounded-full focus:outline-none"
//                       placeholder="Search" 
//                     />
//                   </form>
//                 </div>
//               </div>

//               <Link to='/admin/course_request'>
//               <div className="flex items-center justify-between">
//                 <div className="lg:ml-40 ml-10 space-x-8">
//                   <span className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide ">
//                     View New Courses
//                   </span>
//                 </div>
//               </div>
//               </Link>

//             </div>
//             <div>
//               <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//                 <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//                   <table className="min-w-full leading-normal">
//                     <thead>
//                       <tr>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Name
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Author
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Date Added
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Action
//                         </th>

//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           View
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {courses.length === 0 && <tr><td>No Users Found</td></tr>}

//                       {filteredCourses.map((course) => (
//                         <tr key={course.id}>
//                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                             <div className="flex items-center">
//                               <div className="ml-3">
//                                 <p className="text-gray-900 whitespace-no-wrap">{course.course_name}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">{course.user}</p>
//                           </td>
//                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">{course.date_added}</p>
//                           </td>


//                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                           {!course.is_blocked ? (
//                             <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
//                               <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
//                               <span className="relative">Active</span>
//                             </span>
//                           ) : (
//                             <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
//                               <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
//                               <span className="relative">Blocked</span>
//                             </span>
//                           )}
//                           </td>



//                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

//                           {!course.is_blocked ? (
//                           <>
//                           <button onClick={() => blockCourse(course.id)} className="bg-red-600 px-2 py-2 rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
//                             Block
//                           </button>
//                           </>
//                           ) : (<>
//                             <button onClick={() => unblockUser(course.id)} className="bg-green-600 px-2 py-2 rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
//                             Unblock
//                           </button>
//                           </>
//                             )}
//                           </td>


//                             <td>
//                             <Link to={`/admin/course_view/${course.id}`}>
//                             <button className="bg-blue-600 px-2 py-2  rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
//                               View
//                             </button>
//                             </Link>
//                             </td>

//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminTeacherList;
