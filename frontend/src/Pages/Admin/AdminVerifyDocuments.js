import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import userimg from '../../Images/user.png'
import userimg from '../../Images/userprofile.webp'

function AdminVerifyDocuments() {
    const navigate = useNavigate();
    const token=localStorage.getItem('access')
    const baseURL = "http://127.0.0.1:8000";
    const { id } = useParams();

    const [userData, setUserData] = useState(null);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [showModal0, setShowModal0] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/adminapp/teacher_detail/${id}/`,{
                    headers: {
                      'authorization': `Bearer ${localStorage.getItem('access')}`,
                      'Accept' : 'application/json',
                      'Content-Type': 'application/json'
                  }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchData();

        return () => {
            setUserData(null);
        };
    }, [id]);

    if (!userData) {
        return <div>Loading...</div>;
    }





    const verifyDocuments = (id, fieldName) => {
        // const confirmVerify = window.confirm(`Are you sure you want to accept this ${fieldName}?`);
        // if (confirmVerify) {

          const payload = {};
          payload[fieldName] = true;
      
          axios.patch(`${baseURL}/adminapp/document_status/${id}/`, payload,{
            headers: {
              'authorization': `Bearer ${localStorage.getItem('access')}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }
        })
            .then((response) => {
              console.log(`${fieldName} verified successfully`, response);
              setUserData(prevUserData => ({
                ...prevUserData,
                teacher_documents: {
                  ...prevUserData.teacher_documents,
                  [fieldName]: true
                }
              }));
            })
            .catch((error) => {
              console.error(`Error verifying ${fieldName}:`, error);
            });
        // }
      };


      const acceptUser = (userId) => {

          axios.patch(`${baseURL}/adminapp/teachers/accept/${userId}/`, { is_email_verified: true },{
            headers: {
              'authorization': `Bearer ${localStorage.getItem('access')}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }
        })
            .then((response) => {
              console.log('teacher accepted successfully', response);
              setShowModal0(false)
              setUserData(prevUserData => ({
                ...prevUserData,
                user: {
                    ...prevUserData.user,
                    is_email_verified: true
                }
            }));
            })
            .catch((error) => {
              console.error('Error accepting user:', error);
            });
      };


    // modal




  return (
        <>
            <Sidebar/>
            <AdminHeader/>
            <div className="w-full  md:w-[calc(100%-286px)] md:ml-64 bg-gray-200  transition-all main">
                <div className='p-6'>
                
            
                <div className="md:grid grid-cols-4   bg-white gap-2 p-4 rounded-xl">
                    <div className="md:col-span-1 h-100 ">
                    <div className="flex w-full h-full relative">
                        <img src={userimg} className="w-44 h-44 m-auto" alt="" />
                    </div>
                    </div>
                    <div className="md:col-span-3 h-48  space-y-2 p-3 my-20 mb-5">

                    <div className="flex">
                        <span className="text-sm   font-bold uppercase  rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-1/6">Name:</span>
                        <input
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text"
                        value={userData.user.username}
                        readOnly
                        />
                    </div>

                    <div className="flex">
                        <span className="text-sm   font-bold uppercase  rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-1/6">Email:</span>
                        <input
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text"
                        value={userData.user.email}
                        readOnly
                        />
                    </div>


                    
                    <div className="flex">
                        <span className="text-sm   font-bold uppercase  rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-1/6">Experience</span>
                        <input
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text"
                        value={userData.teacher_details.experience}
                        readOnly
                        />
                    </div>

                    <div className="flex">
                        <span className="text-sm   font-bold uppercase  rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-1/6">Age</span>
                        <input
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text"
                        value={userData.teacher_details.age}
                        readOnly
                        />
                    </div>
                    <div className="flex">
                        <span className="text-sm   font-bold uppercase  rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-1/6">Address</span>
                        <input
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text"
                        value={userData.teacher_details.address}
                        readOnly
                        />
                    </div>
                    <div className="flex">
                        <span className="text-sm   font-bold uppercase  rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-1/6">Phone number</span>
                        <input
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text"
                        value={userData.teacher_details.number}
                        readOnly
                        />
                    </div>
                    </div>
                </div>




                <div className="bg-white p-10 rounded-md w-full -my-5">
                    <div className="flex items-center justify-between pb-6">
                            <div>
                                <h2 className="text-gray-600 font-semibold">Documents</h2>
                                <span className="text-xs">Verify Document and accept</span>
                            </div>


                        <div className="flex items-center justify-between">
                            <div className="lg:ml-40 ml-10 space-x-8">
                            <div>
                            {userData.teacher_documents.id_verify &&
                            userData.teacher_documents.photo_verify &&
                            userData.teacher_documents.tenth_verify &&
                            userData.teacher_documents.plustwo_verify &&
                            userData.teacher_documents.graduation_verify &&
                            userData.teacher_documents.experience_verify ? (
                                <>
                                    {userData.user.is_email_verified ? (
                                    
                                        <span className='text-green-500'> Accepted</span>
                                    ) : (
                                    
                                        <button onClick={() => setShowModal0(true)} className="mt-3 bg-green-500 px-4 py-2 text-white rounded-md mt-4 font-semibold">
                                            Accept Teacher
                                        </button>
                                    )}

                        {showModal0 && (
                              <>    
                                <div style={{zIndex:99999}} className="fixed z-9999 inset-0 overflow-y-auto" aria-modal="true" aria-labelledby="modal-headline" >
                                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            
                                          </div>
                                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                              Accept Teacher
                                            </h3>
                                            <div className="mt-2">
                                              <p className="text-sm text-gray-500">
                                                Are you sure you want to Accept ?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                          onClick={() => acceptUser(id)}
                                          type="button"
                                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                          Confirm
                                        </button>
                                        <button
                                          onClick={() => setShowModal0(false)}
                                          type="button"
                                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                              )}
                                </>
                            ) : (
                        ''
                            )}
                        </div>


                            </div>
                        </div>
                    </div>
                    <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Document
                                </th>
                                <th className="px-8 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                                </th>
                                
                            </tr>
                            </thead>
                            <tbody>
                            
                                <tr >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">Id Proof</p>
                                        </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`http://localhost:8000${userData.teacher_documents.id_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            View Document
                                        </a>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                    {userData.teacher_documents.id_verify ? (
                                        <span className="text-green-500 font-semibold px-3">Verified</span>
                                    ) : (
                                        <button onClick={() => setShowModal1(true)} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                            Accept
                                        </button>
                                    )}


                                    {showModal1 && (
                                        <div style={{zIndex:99999999}} className="flex flex-col space-y-4 animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
                                            <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <div className="flex flex-col ml-3">
                                                            <div className="font-medium leading-none">Are you sure you want to accept this ?</div>
                                                            <p className="text-sm text-gray-600 leading-none mt-1">By accepting you cant retake action</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setShowModal1(false)} className="flex-no-shrink bg-white-500 border border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-red-500 rounded-full">Cancel</button>
                                                    <button onClick={() => {verifyDocuments(userData.teacher_documents.id, 'id_verify'); setShowModal1(false);}} className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Accept</button>
                                                </div>
                                            </div>
                                        </div>
                                        )}
               
                                     </td>
                                </tr>

                                <tr >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">Photo Proof</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`http://localhost:8000${userData.teacher_documents.photo_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            View Document
                                        </a>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {userData.teacher_documents.photo_verify ? (
                                                <span className="text-green-500 font-semibold px-3">Verified</span>
                                                ) : (

                                                <button onClick={() => setShowModal2(true)} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                    Accept
                                                </button>
                                        )}

                                    {showModal2 && (
                        
                                        <div style={{zIndex:99999999}} className="flex flex-col space-y-4 animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-non">
                                            <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <div className="flex flex-col ml-3">
                                                            <div className="font-medium leading-none">Are you sure you want to accept this Photo?</div>
                                                            <p className="text-sm text-gray-600 leading-none mt-1">By accepting you cant retake action</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setShowModal2(false)} className="flex-no-shrink bg-white-500 border border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-red-500 rounded-full">Cancel</button>
                                                    <button onClick={() => {verifyDocuments(userData.teacher_documents.id, 'photo_verify'); setShowModal2(false);}} className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Accept</button>
                                                </div>
                                            </div>
                                        </div>

                                    )}
                                    </td>
                                </tr>

                                <tr >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">Tenth Certificate</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`http://localhost:8000${userData.teacher_documents.tenth_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            View Document
                                        </a>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {userData.teacher_documents.tenth_verify ? (
                                            <span className="text-green-500 font-semibold px-3">Verified</span>
                                            ) : (
                                                <button onClick={() => setShowModal3(true)} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                                </button>
                                        )}

                                            {showModal3 && (
                                                
                                                <div style={{zIndex:99999999}} className="flex flex-col space-y-4 animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
                                                    <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                </svg>
                                                                <div className="flex flex-col ml-3">
                                                                    <div className="font-medium leading-none">Are you sure you want to accept this ?</div>
                                                                    <p className="text-sm text-gray-600 leading-none mt-1">By accepting you cant retake action</p>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => setShowModal3(false)} className="flex-no-shrink bg-white-500 border border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-red-500 rounded-full">Cancel</button>
                                                            <button onClick={() => {verifyDocuments(userData.teacher_documents.id, 'tenth_verify'); setShowModal3(false);}} className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Accept</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            )}
                                    </td>
                                </tr>


                                <tr >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">Plus Two Certificate</p>
                                        </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`http://localhost:8000${userData.teacher_documents.plustwo_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            View Document
                                        </a>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {userData.teacher_documents.plustwo_verify ? (
                                            <span className="text-green-500 font-semibold px-3">Verified</span>
                                            ) : (
                                                <button onClick={() => setShowModal4(true)} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                                </button>
                                        )}

                                        {showModal4 && (
 
                                                <div style={{zIndex:99999999}} className="flex flex-col space-y-4 animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
                                                    <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                </svg>
                                                                <div className="flex flex-col ml-3">
                                                                    <div className="font-medium leading-none">Are you sure you want to accept this ?</div>
                                                                    <p className="text-sm text-gray-600 leading-none mt-1">By accepting you cant retake action</p>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => setShowModal4(false)} className="flex-no-shrink bg-white-500 border border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-red-500 rounded-full">Cancel</button>
                                                            <button onClick={() => {verifyDocuments(userData.teacher_documents.id, 'plustwo_verify'); setShowModal4(false);}} className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Accept</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            )}
                                    </td>
                                </tr>


                                <tr >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">Graduation Certificate</p>
                                        </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`http://localhost:8000${userData.teacher_documents.graduation_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            View Document
                                        </a>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {userData.teacher_documents.graduation_verify ? (
                                            <span className="text-green-500 font-semibold px-3">Verified</span>
                                            ) : (
                                                <button onClick={() => setShowModal5(true)} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                                </button>
                                        )}

                                            {showModal5 && (
                                            
                                            <div style={{zIndex:99999999}} className="flex flex-col space-y-4 animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
                                                <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                                                                viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                            </svg>
                                                            <div className="flex flex-col ml-3">
                                                                <div className="font-medium leading-none">Are you sure you want to accept this ?</div>
                                                                <p className="text-sm text-gray-600 leading-none mt-1">By accepting you cant retake action</p>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => setShowModal5(false)} className="flex-no-shrink bg-white-500 border border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-red-500 rounded-full">Cancel</button>
                                                        <button onClick={() => {verifyDocuments(userData.teacher_documents.id, 'graduation_verify'); setShowModal5(false);}} className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Accept</button>
                                                    </div>
                                                </div>
                                            </div>

                                            )}
                                    </td>
                                </tr>

                                <tr >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">Experience Certificate</p>
                                        </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`http://localhost:8000${userData.teacher_documents.experience_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            View Document
                                        </a>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {userData.teacher_documents.experience_verify ? (
                                            <span className="text-green-500 font-semibold px-3">Verified</span>
                                            ) : (
                                                <button onClick={() => setShowModal6(true)} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                                </button>
                                        )}
                                        {showModal6 && (
                                        <div style={{zIndex:99999999}} className="flex flex-col space-y-4 animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
                                            <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <div className="flex flex-col ml-3">
                                                            <div className="font-medium leading-none">Are you sure you want to accept this ?</div>
                                                            <p className="text-sm text-gray-600 leading-none mt-1">By accepting you cant retake action</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setShowModal6(false)} className="flex-no-shrink bg-white-500 border border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-red-500 rounded-full">Cancel</button>
                                                    <button onClick={() => {verifyDocuments(userData.teacher_documents.id, 'experience_verify'); setShowModal6(false);}} className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Accept</button>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                    </td>
                                </tr>
                    
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
          </div>
        </div>
        </div>
        </>

  )
}

export default AdminVerifyDocuments





