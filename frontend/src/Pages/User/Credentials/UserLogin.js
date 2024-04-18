import React,{useEffect,useState} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { set_authentication } from '../../../Redux/autehnticationSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleOAuthProvider,GoogleLogin  } from '@react-oauth/google';


const UserLogin = () => {
  const {state}=useLocation()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [message,setMessage]=useState(null)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const baseURL='http://127.0.0.1:8000'


  const authentication_user=useSelector(state=>(state.authentication_user))
  console.log('auth admin',authentication_user.isAdmin);
  console.log('auth teacher',authentication_user.isTeacher);
  console.log('name',authentication_user.isAuthenticated);



  useEffect(() => {
    if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin && !authentication_user.isTeacher)) {
      console.log('User is already authenticated. Redirecting...');
      navigate('/');
    }
  }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.Teacher, navigate]);
  

  useEffect(() => {
    if (state) {
      setMessage(state)
      
    }
    // navigate('/', {})
  }, [state, navigate])
  


  const handleLoginSubmit = async (event) => {
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

    const formData = new FormData();
    formData.append('email', event.target.email.value);
    formData.append('password', event.target.password.value);

    try {
        const res = await axios.post(baseURL + '/api/accounts/login/', formData);
        console.log('Response', res)
        if (res.status === 200) {
            localStorage.setItem('access', res.data.access_token);
            localStorage.setItem('refresh', res.data.refresh_token);
            localStorage.setItem('userid', res.data.userid);

            console.log('logined', res.data);
            console.log('Access Token:', res.data.access_token);
            console.log('Refresh Token:', res.data.refresh_token);

            dispatch(
                set_authentication({
                    name: jwtDecode(res.data.access_token).username,
                    isAuthenticated: true,
                    userid:res.data.userid,
                    isAdmin: false,
                    isTeacher: false,
                    isActive:res.data.userid
                })
            );
            navigate('/');
        }

    } catch (error) {

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
};




  return (
    <div className=" flex -mt-2 px-10 py-5">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
        <div className="py-8 white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <h2 className="mb-12 text-center text-2xl text-gray-900 font-bold md:text-4xl">What's our customers say</h2>
            <div className="grid gap-8 md:grid-rows-2 lg:grid-cols-2">
              <div className="row-span-2 p-6 border border-gray-100 rounded-xl bg-gray-50 text-center sm:p-8">
                <div className="h-full flex flex-col justify-center space-y-4">
                  <img className="w-20 h-20 mx-auto rounded-full" src="https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1711411200&semt=ais" alt="user avatar" height="220" width="220" loading="lazy" />
                  <p className="text-gray-600 md:text-xl"><span className="font-serif">"</span>With skillbridge - e learning, we have finally accomplished things that have been waiting forever to get done. <span className="font-serif">"</span></p>
                  <div>
                    <h6 className="text-lg font-semibold leading-none">Jane Doe</h6>
                    <span className="text-xs text-gray-500">Robotic Engineer</span>
                  </div>
                </div>
              </div>
              <div className="row-span-2 p-6 border border-gray-100 rounded-xl bg-gray-50 text-center sm:p-8">
                <div className="h-full flex flex-col justify-center space-y-4">
                  <img className="w-20 h-20 mx-auto rounded-full" src="https://i.pinimg.com/236x/54/6b/2d/546b2d4e9bddbcb894fa8e416739339b.jpg" alt="user avatar" height="220" width="220" loading="lazy" />
                  <p className="text-gray-600 md:text-xl"><span className="font-serif">"</span> I have tried a few software of this kind and skillbridge - e learning is the best by far! <span className="font-serif">"</span></p>
                  <div>
                    <h6 className="text-lg font-semibold leading-none">Teresa Martin</h6>
                    <span className="text-xs text-gray-500">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">

          
          <form method='post' onSubmit={handleLoginSubmit} className="bg-white rounded-md shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>

            <div className='mb-5'>
            <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input id="email" className="pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
            </div>
            {emailError && <span className="text-md text-red-800 mt-1 mb-5">{emailError}</span>}
            </div>

            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
            </div>
            {passwordError ? (<>
              {passwordError && <span className="text-md text-red-800 " >{passwordError}</span>}
            </>):(<>
              {loginError && <span className="text-md text-red-800 " >{loginError}</span>}
            </>)}
            
            
            <button type="submit" className="block w-full bg-orange-600 mt-5 py-2 rounded-2xl hover:bg-orange-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
     
      

            <div className="flex justify-between mt-4">
              <Link className='nav-link' to='/fpemail'>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</span>
              </Link>
              <Link className='nav-link' to='/signup'>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</span>
              </Link>
            </div>
            <div className='mt-5'>
            {/* <GoogleOAuthProvider clientId="985183011822-pdkvo8vc1hs1is7nin2hk3ai2gh59uk7.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={credentialResponse => {
                  var decoded=jwtDecode(credentialResponse.credential)
                  console.log(decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              </GoogleOAuthProvider> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
