import { useRef, useState } from "react";
import React  from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotOtp() {
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const[error,setError]=useState([])
    const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));
    const baseURL='http://127.0.0.1:8000'
    const navigate = useNavigate();
    const registeredEmail = localStorage.getItem('registeredEmail')
    const user_id = localStorage.getItem('user_id')
    console.log(registeredEmail);

  
    const handleInputChange = (index, value) => {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
  
      if (value !== '' && index < otpValues.length - 1 && inputRefs.current[index + 1]?.current) {
        inputRefs.current[index + 1].current.focus();
      }
    };
  
    const handleVerification = async (event) => {
      event.preventDefault();
      setError([])
      const enteredOtp = otpValues.join('');
      console.log(enteredOtp);
      console.log('Request payload:', { email: registeredEmail, otp: enteredOtp });
      try {
        const res = await axios.post(baseURL + '/api/accounts/userotp/', {
          email: registeredEmail,
          otp: enteredOtp,
        });
        if (res.status === 200) {
          console.log('verified');
          navigate(`/change_password/${user_id}`);
          
        } else {
          console.log('Verification failed');
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
        setError(error.response.data)

      }
    };
  
    return (
      <div className="bg-white " style={{ marginTop: -65 }}>
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            {/* Left Section (Image) */}
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10 mr-10">
                <img
                  src="https://img.freepik.com/free-vector/college-entrance-exam-concept-illustration_114360-13742.jpg?w=740&t=st=1709633300~exp=1709633900~hmac=c153fcf71de0a144bc3792f0a01e386c95d823c570cf1c9957fb05353274c092"
                  alt="Health Run"
                  className="btn-"
                  style={{ marginRight: 100, height: 500 }}
                />
              </div>
            </div>
            {/* Right Section (Sign-up Form) */}
            <div
              className=" flex min-h-screen flex-col justify-center overflow-hidden bg-white-50 py-12 -20"
              style={{ marginTop: -70 }}
            >
              <div className="relative -white px-6 bg-gray-50 p-9 shadow-2xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="font-semibold text-3xl">
                      <p>Email Verification</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                      <p>We have sent a code to your email {registeredEmail}</p>
                    </div>
                  </div>
  
                  <div>
                    <form onSubmit={handleVerification} method="post">
                      <div className="flex flex-col space-y-16">
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                          {otpValues.map((value, index) => (
                            <div key={index} className="w-16 h-16 border border-solid border-black rounded-xl">
                              <input
                                type="text"
                                name={`otp${index + 1}`}
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-100 focus:ring-1 ring-black-700"
                                ref={inputRefs.current[index]}
                              />
                            </div>
                          ))}
                        </div>

                        <ul className='text-red-500 mx-10'>
                          {error['error'] && <li>
                          {error['error']}
                            </li>}
                        </ul>
  
                        <div className="flex flex-col space-y-5">
                          <div>
                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-orange-500 border-none text-white text-sm shadow-sm">
                              Verify Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ForgotOtp;
  
