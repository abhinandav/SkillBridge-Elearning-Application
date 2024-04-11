import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch ,useSelector} from 'react-redux';
import ProfileSidebar from './ProfileSidebar';
import {set_profile_details} from '../../../Redux/ProfileSlice';
import TeacherChart from './TeacherChart';



const TeacherProfile = () => {

  const profileDetails = useSelector(state => state.profile_details);
  const baseUrl = 'http://127.0.0.1:8000';
  const token = localStorage.getItem('access');
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user);
  const [orderdata,setOrderdata]=useState({'total_course':0,'total_order': 0, 'total_students': 0, 'total_amount': 0,'orders':[]})
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    phone: '',
    linkedinurl: '',
    fburl: '',
    about: '',
    profilePic: null,
});




  const fetchUserData = async () => {
    try {
        const res = await axios.get(baseUrl + '/student/user_details/', {
            headers: {
                'authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const userData = res.data; 

        let profilePic = null;
        if (userData.user_profile.profile_pic instanceof File) {
            profilePic = userData.user_profile.profile_pic;
        } else {
            profilePic = userData.user_profile.profile_pic ? baseUrl + userData.user_profile.profile_pic : null;
        }

        setFormData({
            username: userData.user.username,
            email:userData.user.email,
            phone: userData.user_profile.phone,
            linkedinurl: userData.user_profile.social_link1,
            fburl: userData.user_profile.social_link2,
            about: userData.user_profile.about,
            profilePic: profilePic,
        });



        dispatch(
          set_profile_details({
            username: userData.user.username,
            email: userData.user.email,
            phone: userData.user_profile.phone,
            linkedinurl: userData.user_profile.social_link1,
            fburl: userData.user_profile.social_link2,
            about: userData.user_profile.about,
            profile_pic: profilePic
          })
        );

    } catch (error) {
        console.log('Error fetching user data:', error);
    }
};


// console.log('homepage',profileDetails);

useEffect(() => {
  fetchUserData();
}, []);



useEffect(()=>{
    const fetchOrderdata=async()=>{
      const res =await axios.get(baseUrl+'/teacher/tprofile_orderdata/',{
        headers: {
          'authorization': `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
      });
        setOrderdata(res.data)
        console.log('orderdata',res.data);
    }
    fetchOrderdata()
},[])



  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <ProfileSidebar/>



        <div className="col-span-4 sm:col-span-9">



            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center text-gray-800">
                <div className="p-4 w-full">
                  <div className="grid grid-cols-12 gap-4">

                  <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">Total Course</div>
                          <div className="font-bold text-lg">{orderdata.total_course}</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">Users</div>
                          <div className="font-bold text-lg">{orderdata.total_students}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">Orders</div>
                          <div className="font-bold text-lg">{orderdata.total_order}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">Revenue</div>
                          <div className="font-bold text-lg">₹ {orderdata.total_amount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>



              <div className="bg-white shadow rounded-lg mt-3 p-6">

                <h2 className="text-lg font-bold mb-4">About Me</h2>
                <p className="text-gray-700 mb-5 mx-20">
                  {formData.about ? (<p>{formData.about}</p>) : (<p>Not Set Yet</p>)}
                </p>


                <h2 className="text-lg font-bold mb-4">Phone Number</h2>
                <p className="text-gray-700 mx-20 mb-5">
                {formData.phone ? (<p>{formData.phone}</p>) : (<p>Not Set Yet</p>)}
                </p>



                <h3 className="font-semibold text-center mt-3 -mb-2">Find me on</h3>
                <div className="flex justify-center items-center gap-6 my-6">
                <a
                  href={formData.linkedinurl ? `https://${formData.linkedinurl}` : "#"}
                  className="text-gray-700 hover:text-orange-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn"
  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 text-blue-600">
                      <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>
                  {/* Add other social media icons here */}
                </div>




              </div>


              <div className="bg-white shadow rounded-lg mt-3 p-6">
                <TeacherChart orders={orderdata.orders}/>
              </div>
            </div>





        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
