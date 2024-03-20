import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FPreset() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
  
    const handlePasswordReset = async (event) => {
      event.preventDefault();
  
     
      const formData = new FormData();
      formData.append('password', event.target.fpassword.value);

  
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/accounts/change_password/"+id+"/",
          formData
        );
  
        if (response.data.success) {
          navigate("/login");
          toast.success(' Password Reset Successfull');
          localStorage.clear()
        } else {
          // Handle unsuccessful password reset
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error resetting password:", error);
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
                      <p>Enter New Password</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                     
                    </div>
                  </div>
  
                  <div>
                    <form onSubmit={handlePasswordReset} method="post">
                      <div className="flex flex-col space-y-16">
                

                      <div className="flex items-center border-2  py-2 px-3 rounded-2xl ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 w-full outline-none border-none" type="password" name="fpassword" id="fpassword" placeholder="Enter New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {/* {emailError && <span className="text-md text-red-800 mt-1 mb-5">{emailError}</span>} */}
                        
                        
                        <div className="flex items-center border-2  py-2 px-3 rounded-2xl ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="spassword" placeholder="Confirm your Password" value={confirmPassword } onChange={(e) =>setConfirmPassword(e.target.value)}/>
                        </div>
                                    
                        <div className="flex flex-col space-y-5">
                          <div>
                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-orange-500 border-none text-white text-sm shadow-sm">
                              Confirm 
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
  )
}

export default FPreset