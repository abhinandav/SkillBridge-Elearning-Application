import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { set_Authentication } from "../../../Redux/autehnticationSlice"; 
import { useDispatch ,useSelector} from 'react-redux';
import ProfileSidebar from './ProfileSidebar';


const UserProfile = () => {

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
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <ProfileSidebar/>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-gray-700">

              {/* {userDetails.name?userDetails?.name: 'Not set yet' } */}
              </p>

              <h3 className="font-semibold text-center mt-3 -mb-2">Find me on</h3>
              <div className="flex justify-center items-center gap-6 my-6">
              <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href="#" target="_blank" alt="">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                    <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                {/* Add other social media icons here */}
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
              <div className="mb-6">
                {/* Experience details */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
