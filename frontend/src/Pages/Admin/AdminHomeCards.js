import React, { useEffect, useState } from 'react'
import axios from 'axios'
import teacherimg from '../..//Images/teacher.png'
import courseimg from '../..//Images/course.png'
import ublock from '../..//Images/userblock.png'
import tblock from '../..//Images/teacherblock.png'
import cblock from '../..//Images/cblock.png'
import videoimg from '../..//Images/video.png'

function AdminHomeCards() {
    const baseURL = "http://127.0.0.1:8000";
    const [data,setData]=useState(null)
  
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(baseURL + '/adminapp/admin_home/',{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              }
            });
            if (res.status === 200) {
              console.log(res.data);
              setData(res.data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    
      if (!data) {
        return <div>Loading...</div>;
      }
  
    console.log('data............',data);
  return (

    <div className="py-5">
    <main className="h-full overflow-y-auto">
      <div className="container mx-auto grid">
      
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Students
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {data.user}
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
            <img className="w-5 h-5" src={teacherimg} alt=''/>

            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Teachers
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.teacher}
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
            <img className="w-5 h-5" src={courseimg} alt=''/>

            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Available Courses
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.course}
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                All Orders
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.orders}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
            <img className="w-5 h-5" src={ublock} alt=''/>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Blocked Students
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {data.buser}
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
            <img className="w-5 h-5" src={tblock} alt=''/>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Blocked Teachers
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.bteacher}
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
            <img className="w-5 h-5" src={cblock} alt=''/>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Blocked Courses
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.bcourse}
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <img className="w-5 h-5" src={videoimg} alt=''/>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                All Videos
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.videos}
              </p>
            </div>
          </div>
        </div>
  
      </div>
    </main>
  </div>
  )
}

export default AdminHomeCards