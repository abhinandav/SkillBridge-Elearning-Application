import React from 'react'
import {  useSelector } from 'react-redux';
import userimg from '../../../Images/user.png'
import { Link } from 'react-router-dom';


function ProfileSidebar() {
    const profileDetails = useSelector(state => state.profile_details);


  return (
    

        <div className="col-span-4 sm:col-span-3">
           
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
              <img src={profileDetails && profileDetails.profile_pic ? profileDetails.profile_pic : userimg} 
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="Profile" />
              <h1 className="text-xl font-bold">{ profileDetails.username}</h1>
              <p className="text-gray-700">{profileDetails.email}</p>

                {/* <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <Link to='/profile_edit'>
                  <span className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Settings</span>
                  </Link>
                  <Link to='/profile'>
                  <span className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Dashboard</span>
                  </Link>
                </div> */}
              </div>

              
              <hr className="my-6 border-t border-gray-300" />
              <Link to='/profile'>
              <div className="flex flex-col">
                <span className="text-gray-700 text-lg  font-bold tracking-wider mb-2">Dashboard</span>
              </div>
              </Link>

              <hr className="my-6 border-t border-gray-300" />
              <Link to='/enrolled_courses'>
              <div className="flex flex-col">
                <span className="text-gray-700 text-lg  font-bold tracking-wider mb-2">Enrolled Courses</span>
              </div>
              </Link>


              <hr className="my-6 border-t border-gray-300" />
              <Link to='/profile_edit'>
              <div className="flex flex-col">
                <span className="text-gray-700 text-lg  font-bold tracking-wider mb-2">Settings</span>
              </div>
              </Link>


            </div>
          </div>
  )
}

export default ProfileSidebar