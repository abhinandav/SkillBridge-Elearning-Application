import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userimg from '../../../Images/user.png'
import { set_Authentication } from "../../../Redux/autehnticationSlice"; 

function ProfileSidebar() {
    const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user)
  const [userDetails, setUserDetails] = useState(null)

  const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access');

  const fetchUserData = async () => {
    try {
        const res = await axios.get(baseURL+'/api/accounts/user/details/',{headers: {
          'authorization': `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }})
        .then(res => {
            setUserDetails(res.data)
          })
    }
    catch (error) {
      console.log(error);
      
    }

  };

  useEffect(() => {
    fetchUserData();
  
  }, [authentication_user])

  return (
    

        <div className="col-span-4 sm:col-span-3">
           
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img src={userDetails?userDetails.profile_pic?userDetails.profile_pic:userimg:userimg} 
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="Profile" />
                <h1 className="text-xl font-bold">{userDetails?.username}</h1>
                <p className="text-gray-700">{userDetails?.email}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                  <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                <ul>
                  <li className="mb-2">JavaScript</li>
                  <li className="mb-2">React</li>
                  <li className="mb-2">Node.js</li>
                  <li className="mb-2">HTML/CSS</li>
                  <li className="mb-2">Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </div>
  )
}

export default ProfileSidebar