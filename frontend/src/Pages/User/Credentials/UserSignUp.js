import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserSignUp = () => {


  const baseURL='http://127.0.0.1:8000'
  const navigate=useNavigate()
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [cpasswordError, setCPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')

  const authentication_user=useSelector(state=>(state.authentication_user))


  useEffect(() => {
    if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin && !authentication_user.isTeacher)) {
      console.log('User is already authenticated. Redirecting...');
      navigate('/');
    }
  }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.isAdmin, navigate]);










  const handleFormSumbmit= async (event)=>{
    event.preventDefault();

      setEmailError('')
      setPasswordError('')
      setLoginError('')
      setUsernameError('')
      setCPasswordError('')

      const username=event.target.username.value
      const email=event.target.email.value
      const password=event.target.password.value
      const cpassword=event.target.cpassword.value
      const alphabeticRegex = /^[A-Za-z]+$/;

      if (!username.trim()) {
        setUsernameError('Username is required *')
     
      }

      if (!alphabeticRegex.test(username)) {
        setUsernameError('Username must contain only alphabetic characters');
        return;
      }

      if (username.length > 0 && username.length < 4) {
        setUsernameError('length must be atleast 4 characters *')
      }

      if (!email.trim()) {
        setEmailError('Email is required *')
      }
  
      if (!password.trim()) {
        setPasswordError('Password is required *');
      }

      if (password.length > 0 && password.length < 8) {
        setPasswordError('Password must be at least 8 characters *');
      }


      if (!cpassword.trim()) {
        setCPasswordError('Confirm Password is required *');
        return
      }

      if (cpassword.length > 0 && cpassword.length < 8) {
        setCPasswordError('Confirm Password must be at least 8 characters *');
        return
      }

      if  (String(cpassword) !== String(password)){
        setCPasswordError('Passwords are not matching!!');
        setPasswordError('Passwords are not matching!!');
        return
      }


    const formData=new FormData()
    formData.append('username',event.target.username.value)
    formData.append('email',event.target.email.value)
    formData.append('password',event.target.password.value)
    formData.append('cpassword',event.target.cpassword.value)



    try{
      const res = await axios.post(baseURL+'/api/accounts/signup/', formData);


      if (res.status == 200){
        console.log('Server Response:', res.data);
        const registeredEmail = res.data.email;
        localStorage.setItem('registeredEmail', registeredEmail);
        navigate('/userotp');
        toast.success(' Otp Sented to your Email');
        return res;
      }
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Error:', error.response.data);
        const errorData = error.response.data;
        if (errorData.email && errorData.email.length > 0) {
          setEmailError(errorData.email[0]);
        } else {
          setLoginError('An error occurred during registration.');
        }
      } else {
        console.log('Error:', error.message); 
      }
    }


  }

  return (
    <div className="bg-white px-20  " >
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10  lg:flex-row">
          {/* Left Section (Image) */}
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10 mr-10" >
              <img src="https://img.freepik.com/free-vector/college-entrance-exam-concept-illustration_114360-13742.jpg?w=740&t=st=1709633300~exp=1709633900~hmac=c153fcf71de0a144bc3792f0a01e386c95d823c570cf1c9957fb05353274c092" alt="Health Run" className="btn-"  style={{marginRight:100}}/>
            </div>
          </div>

          {/* Right Section (Sign-up Form) */}
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Sign up for an account</p>

              {/* Form Inputs */}
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
              <form onSubmit={handleFormSumbmit} method='post'>
                <div className="relative mt-5">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Username</p>
                  <input
                    placeholder="Enter Your name"
                    type="text"
                    name='username'
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                 {usernameError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{usernameError}</span>}

                </div>

                <div className="relative mt-5">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                  <input
                    placeholder="Enter Your Email"
                    type="email"
                    name='email'
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {emailError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{emailError}</span>}
                </div>

                <div className="relative mt-5">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p>
                  <input
                    placeholder="Enter Password"
                    type="password"
                    name='password'
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                {passwordError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{passwordError}</span>}

                </div>

                <div className="relative mt-5">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Confirm Password</p>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    name='cpassword'
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
               {cpasswordError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{cpasswordError}</span>}

                </div>

                {/* Submit Button */}



                {loginError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{loginError}</span>}
                <div className="relative mt-10">
                  <button
                    className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-orange-500 rounded-lg transition duration-200 hover:bg-orange-600 ease"
                  >
                    Submit
                  </button>
                  <Link className="nav-link" to='/login'>
                  <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all text-lg">Already Have an Account ? </span>
                  </Link>
                </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
