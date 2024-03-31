import React from 'react'
import {  useSelector } from 'react-redux';
import userimg from '../../../Images/user.png'
import { Link } from 'react-router-dom';


function ProfileSidebar() {
    const profileDetails = useSelector(state => state.profile_details);
    console.log('pp',profileDetails);

  return (
    

        <div className="col-span-4 sm:col-span-3">
           
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
              <img src={profileDetails && profileDetails.profile_pic ? profileDetails.profile_pic : userimg} 
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="Profile" />
              <h1 className="text-xl font-bold">{ profileDetails.username}</h1>
              <p className="text-gray-700">{profileDetails.email}</p>
          
              </div>

              
              <hr className="my-4 border-t border-gray-300" />
              <Link to='/teacher/teacher_profile'>
              <div className="flex flex-col text-center">
                <span className="text-gray-700 text-md  font-bold tracking-wider mb-2">Dashboard</span>
              </div>
              </Link>

              <hr className="my-4 border-t border-gray-300" />
              <Link to='/teacher/teacher_mycourse_list '>
              <div className="flex flex-col text-center">
                <span className="text-gray-700 text-md  font-bold tracking-wider mb-2">My Courses</span>
              </div>
              </Link>


              <hr className="my-4 border-t border-gray-300" />
              <Link to='/teacher/teacher_profile_edit'>
              <div className="flex flex-col text-center">
                <span className="text-gray-700 text-md  font-bold tracking-wider mb-2">Settings</span>
              </div>
              </Link>


            </div>
          </div>
  )
}

export default ProfileSidebar