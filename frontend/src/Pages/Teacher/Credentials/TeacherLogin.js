import React, { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,  faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { set_authentication } from '../../../Redux/autehnticationSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const TeacherLogin = () => {
  const authentication_user=useSelector(state=>(state.authentication_user))

    const {state}=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')
    const [message,setMessage]=useState(null)
    const baseURL='http://127.0.0.1:8000'


    useEffect(() => {
      if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin )) {
        console.log('User is already authenticated. Redirecting...');
        navigate('/teacher');
      }
    }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.isAdmin, navigate]);
  

    const handleLoginSubmit=async (event)=>{
        event.preventDefault()
        setEmailError('')
        setPasswordError('')
        setLoginError('')

        const email = event.target.email.value
        const password = event.target.password.value
        if (!email.trim()) {
          setEmailError('Email is required')
        }
    
        if (!password.trim()) {
          setPasswordError('Password is required');
        }
  
        if (password.length > 0 && password.length < 8) {
          setPasswordError('Password must be at least 8 characters');
        }


        const formData=new FormData()
        formData.append('email',event.target.email.value)
        formData.append('password',event.target.password.value)

        try{
            const res=await axios.post(baseURL+'/api/accounts/teacher/teacher_login/',formData)
            console.log('Response',res)
            if(res.status==200){
                localStorage.setItem('access', res.data.access_token);
                localStorage.setItem('refresh', res.data.refresh_token);
                localStorage.setItem('userid', res.data.userid);

                console.log('logined', res.data);
                console.log('Access Token:', res.data.access_token);
                console.log('Refresh Token:', res.data.refresh_token);

                console.log(jwtDecode(res.data.access_token).username,);

            dispatch(
                set_authentication({
                  name: jwtDecode(res.data.access_token).username,
                  userid:res.data.userid,
                  isAuthenticated: true,
                  isAdmin: false,
                  isTeacher:true
                })
              );
              navigate('/teacher');
            }
        }catch (error) {

          console.error('Error during login:', error);
  
          if (error.response) {
              console.error('Response data:', error.response);
              if (error.response.status === 403) {
                  // toast.error('Your account is blocked by admin');
                  toast.error('Your account is blocked by admin', {
                    style: {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'fixed',
                      top: '10%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                  },
                });
              } else {
                  setLoginError('Invalid Credentials');
              }
          } else {
              setLoginError('Invalid Credentials');
          }
      }
}
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-100 my-0 py-20" >
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-20 py-20 px-20 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-orange-500">
          Join us Now
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>

        <div className="mt-10">
          <form method='post' onSubmit={handleLoginSubmit}>
           
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-orange-400">
                <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              {emailError && <span className="text-md text-red-800 mt-1 ">{emailError}</span>}
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-orange-400">
                  <span>
                  <FontAwesomeIcon icon={faLock} />
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
              </div>
              {passwordError ? (<>
              {passwordError && <span className="text-md text-red-800 " >{passwordError}</span>}
            </>):(<>
              {loginError && <span className="text-md text-red-800 " >{loginError}</span>}
            </>)}
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-orange-500 hover:bg-orange-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase ">Sign Up</span>
                <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <span target="_blank" className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
          <span className="ml-2">You have an account?<span className="text-xs ml-2 text-blue-500 font-semibold">Login here</span></span>
        </span>
      </div>
    </div>
  );
};

export default TeacherLogin;




