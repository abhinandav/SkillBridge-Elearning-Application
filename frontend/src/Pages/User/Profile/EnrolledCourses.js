import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProfileSidebar from './ProfileSidebar';

const EnrolledCourses = () => {
    const baseUrl = 'http://127.0.0.1:8000';
    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem('access');

    useEffect(() => {
        const fetchPurchasedCourses = async () => {
            try {
                const response = await axios.get(`${baseUrl}/student/enrolled_courses/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const filterCourse=response.data.filter((course)=>!course.course.is_blocked)
                console.log(filterCourse);
                setCourses(filterCourse);
            } catch (error) {
                console.error('Error fetching purchased courses:', error);
            }
        };

        fetchPurchasedCourses();
    }, [token]);

    return (
        <div className="bg-gray-100 px-10">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <ProfileSidebar />
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div className='flex justify-between'>
                                    <h3 className="text-4xl font-bold m-2 text-orange-500">My Courses</h3>
                                </div>

                                <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                                    {courses.length === 0 && <tr><td>No Courses Purchased</td></tr>}
                                    {courses.map((purchase) => (
                                        <div key={purchase.course.id}>
                                            <Link to={`/course_view/${purchase.course.id}`}>
                                                <span className="relative my-10 block p-8 overflow-hidden border bg-white border-slate-300 rounded-lg ml-6 mr-6">
                                                    <div className="justify-between sm:flex">
                                                        <div>
                                                            <h5 className="text-2xl font-bold text-slate-900">
                                                                {purchase.course.course_name}
                                                            </h5>
                                                            <p className="mt-1 text-xl font-medium text-slate-600">By  {purchase.course.user} </p>
                                                        </div>
                                                        <div className="flex-shrink-0 hidden ml-3 sm:block">
                                                            <img
                                                                className="object-cover w-100 h-16 rounded-lg shadow-sm"
                                                                src={purchase.course.thumbnail}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 sm:pr-8">
                                                        <p className="text-md text-slate-500">
                                                            {purchase.course.description}
                                                        </p>
                                                    </div>
                                                    <dl className="flex justify-between mt-6">
                                                        <div className="flex ">
                                                            <div className="flex flex-col-reverse">
                                                                <dt className="text-sm font-medium text-slate-600">Published</dt>
                                                                <dd className="text-xs text-slate-500"> {purchase.date_purchased}</dd>
                                                            </div>
                                                            <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                                                <dt className="text-sm font-large text-slate-600">Level</dt>
                                                                <dd className="text-xs text-slate-500">{purchase.course.level}</dd>
                                                            </div>
                                                            <div className="flex flex-col-reverse ml-3 sm:ml-6 mx-20">
                                                                <dd className="text-md text-black-500 "><strike>Rs {purchase.course.original_price}</strike></dd>
                                                                <dd className="text-xl text-green-500 ">Rs {purchase.course.offer_price}</dd>
                                                            </div>
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
            </div>
        </div>
    );
};

export default EnrolledCourses;















// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import ProfileSidebar from './ProfileSidebar';

// const EnrolledCourses = () => {
//     const baseUrl = 'http://127.0.0.1:8000';
//     const [courses, setCourses] = useState([]);
//     const token=localStorage.getItem('access')



//     const fetchPurchasedCourses = async () => {
//         try {
//             const response = await axios.get(`${baseUrl}/student/enrolled_courses/`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setCourses(response.data);
//         } catch (error) {
//             console.error('Error fetching purchased courses:', error);
//         }
//     };

//     useEffect(() => {
//         fetchPurchasedCourses();
//     }, [token]);


//     console.log('ppppp',courses);


//   return (
//     <>
//     <div className="bg-gray-100">
//         <div className="container mx-auto py-8">
//             <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
//                 <ProfileSidebar/>
//                     <div className="col-span-4 sm:col-span-9">
               
//                     <div className="col-span-4 sm:col-span-9">
//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//                 <div className='flex justify-between'>
//                   <h3 className="text-4xl font-bold m-2 text-orange-500">My Courses</h3>
//                 </div>

//                 <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
//                   {courses.length === 0 && <tr><td>No Courses Purchased</td></tr>}
//                   {courses.map((course) => (
//                     <div key={course.course.id}>
//                       <Link to={`/teacher/view_course/${course.id}`}>
//                         <span className="relative my-10 block p-8 overflow-hidden border bg-white border-slate-300 rounded-lg ml-6 mr-6">
//                           <div className="justify-between sm:flex">
//                             <div>
//                               <h5 className="text-2xl font-bold text-slate-900">
//                                 {course.course_name}  
//                               </h5>
//                               <p className="mt-1 text-xl font-medium text-slate-600">By  {course.user} </p>
//                             </div>
//                             <div className="flex-shrink-0 hidden ml-3 sm:block">
//                               <img
//                                 className="object-cover w-100 h-16 rounded-lg shadow-sm"
//                                 src="https://github.com/creativetimofficial/argon-design-system/blob/master/assets/img/faces/team-2.jpg?raw=true"
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                           <div className="mt-4 sm:pr-8">
//                             <p className="text-md text-slate-500">
//                               {course.description}
//                             </p>
//                           </div>
//                           <dl className="flex justify-between mt-6">
//                             <div className="flex ">
//                               <div className="flex flex-col-reverse">
//                                 <dt className="text-sm font-medium text-slate-600">Published</dt>
//                                 <dd className="text-xs text-slate-500"> {course.date_added}</dd>
//                               </div>
//                               <div className="flex flex-col-reverse ml-3 sm:ml-6">
//                                 <dt className="text-sm font-large text-slate-600">Level</dt>
//                                 <dd className="text-xs text-slate-500">{course.level}</dd>
//                               </div>
//                               <div className="flex flex-col-reverse ml-3 sm:ml-6 mx-20">
//                                 <dd className="text-md text-black-500 "><strike>Rs {course.original_price}</strike></dd>
//                                 <dd className="text-xl text-green-500 ">Rs {course.offer_price}</dd>
//                               </div>
//                             </div>
//                             <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', borderRadius: '50%', backgroundColor: course.is_blocked ? 'red' : 'green', color: 'white', fontWeight: 'bold' }}>
//                               {course.is_blocked ? "Blocked" : "Active"}
//                             </div>
//                           </dl>
//                         </span>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
                  


             

                          
               
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
//   );
// };

// export default EnrolledCourses;
