import { useRef, useState } from "react";
import React  from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FPEmails() {
    const [emailExists, setEmailExists] = useState(null);
    const [message,setMessage]=useState('')
    const navigate=useNavigate()

    const handleEmailCheck = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/accounts/forgotpassword/",
            {
              email: email,
            }
          );

          if (response.status == 200){
            console.log('Server Response:', response.data);
            const registeredEmail = response.data.email;
            localStorage.setItem('registeredEmail', registeredEmail);
            localStorage.setItem('user_id',  response.data.user_id);
            navigate('/forgot_otp');
            toast.success(' Otp Sented to your Email');
            return response;
          }
          
          
          else {
            console.log("Email does not exist.");
          }
        } catch (error) {
          console.error("Error checking user existence:", error);
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
                      <p>Enter Your Registerd Email Address</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                     
                    </div>
                  </div>
  
                  <div>
                    <form onSubmit={handleEmailCheck} method="post">
                      <div className="flex flex-col space-y-16">
                

                        <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input id="email" className="pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
                        </div>
                        {/* {emailError && <span className="text-md text-red-800 mt-1 mb-5">{emailError}</span>} */}

                                    
                        <div className="flex flex-col space-y-5">
                          <div>
                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-orange-500 border-none text-white text-sm shadow-sm">
                              Verify Email
                            </button>
                          </div>
                        </div>

                       {message && <span className="text-md text-green-800 mt-1 mb-5">{message}</span>} 

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
  
  export default FPEmails;
  
























// import { useRef, useState } from "react";
// import React  from 'react'
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// function FPEmails() {
//     const [emailExists, setEmailExists] = useState(null);
//     const navigate=useNavigate()

//     const handleEmailCheck = async (event) => {
//         event.preventDefault();
//         const email = event.target.email.value;
        
//         try {
//           const response = await axios.post(
//             "http://127.0.0.1:8000/api/accounts/check_user_exists/",
//             {
//               email: email,
//             }
//           );
//           const registeredEmail = response.data.email;
//           localStorage.setItem('registeredEmail', registeredEmail);
    
//           setEmailExists(response.data.exists);
    
//           if (response.data.exists) {
//             console.log("Email exists. Sending OTP...");
    
//             navigate('/fpotp');
//           } else {
//             console.log("Email does not exist.");
//           }
//         } catch (error) {
//           console.error("Error checking user existence:", error);
//         }
//       };
    

   
//     return (
//       <div className="bg-white " style={{ marginTop: -65 }}>
//         <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
//           <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
//             {/* Left Section (Image) */}
//             <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
//               <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10 mr-10">
//                 <img
//                   src="https://img.freepik.com/free-vector/college-entrance-exam-concept-illustration_114360-13742.jpg?w=740&t=st=1709633300~exp=1709633900~hmac=c153fcf71de0a144bc3792f0a01e386c95d823c570cf1c9957fb05353274c092"
//                   alt="Health Run"
//                   className="btn-"
//                   style={{ marginRight: 100, height: 500 }}
//                 />
//               </div>
//             </div>
//             {/* Right Section (Sign-up Form) */}
//             <div
//               className=" flex min-h-screen flex-col justify-center overflow-hidden bg-white-50 py-12 -20"
//               style={{ marginTop: -70 }}
//             >
//               <div className="relative -white px-6 bg-gray-50 p-9 shadow-2xl mx-auto w-full max-w-lg rounded-2xl">
//                 <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
//                   <div className="flex flex-col items-center justify-center text-center space-y-2">
//                     <div className="font-semibold text-3xl">
//                       <p>Enter Your Registerd Email Address</p>
//                     </div>
//                     <div className="flex flex-row text-sm font-medium text-gray-400">
                     
//                     </div>
//                   </div>
  
//                   <div>
//                     <form onSubmit={handleEmailCheck} method="post">
//                       <div className="flex flex-col space-y-16">
                

//                         <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                         </svg>
//                         <input id="email" className="pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
//                         </div>
//                         {/* {emailError && <span className="text-md text-red-800 mt-1 mb-5">{emailError}</span>} */}

                                    
//                         <div className="flex flex-col space-y-5">
//                           <div>
//                             <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-orange-500 border-none text-white text-sm shadow-sm">
//                               Verify Email
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default FPEmails;
  











