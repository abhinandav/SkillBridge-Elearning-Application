import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import userimg from '../../Images/user.png'
import userimg from '../../Images/userprofile.webp'

function TeacherDetailview() {
    const navigate = useNavigate();
    const token=localStorage.getItem('access')
    const baseURL = "http://127.0.0.1:8000";
    const { id } = useParams();

    const [userData, setUserData] = useState(null);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/adminapp/teacher_detail/${id}/`,{
                    headers: {
                      'authorization': `Bearer ${token}`,
                      'Accept' : 'application/json',
                      'Content-Type': 'application/json'
                  }
                })
                setUserData(response.data);
                console.log('response.data',response.data);
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


    console.log('profil', baseURL+userData.teacher_profile.profile_pic);




    const verifyDocuments = (id, fieldName) => {
        const confirmVerify = window.confirm(`Are you sure you want to accept this ${fieldName}?`);
        if (confirmVerify) {
          const payload = {};
          payload[fieldName] = true;
      
          axios.patch(`${baseURL}/adminapp/document_status/${id}/`, payload)
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
        }
      };


      const acceptUser = (userId) => {
        const confirmAccept = window.confirm('Are you sure you want to accept this user?');
      
        if (confirmAccept) {
          axios.patch(`${baseURL}/adminapp/teachers/accept/${userId}/`, { is_email_verified: true })
            .then((response) => {
              console.log('teacher accepted successfully', response);
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
        }
      };

  return (
        <>
            <Sidebar/>
            <AdminHeader/>



            <div className="w-full  md:w-[calc(100%-286px)] md:ml-64 bg-gray-200  transition-all main">
                <div className='p-6'>
                
            
                <div className="md:grid grid-cols-4   bg-white gap-2 p-4 rounded-xl">
                    <div className="md:col-span-1 h-100 ">
                    <div className="flex w-full h-full relative">

                    {userData && userData.teacher_profile && userData.teacher_profile.profile_pic ? (
                    <img src={`${baseURL}${userData.teacher_profile.profile_pic}`} className="w-44 h-44 m-auto" alt="" />
                    ) : (
                    <img src={userimg} className="w-44 h-44 m-auto" alt="" />
                    )}

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
                                    
                                        <button onClick={() => acceptUser(id)} className="mt-3 bg-green-500 px-4 py-2 text-white rounded-md mt-4 font-semibold">
                                            Accept Teacher
                                        </button>
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
                                            <button onClick={() => verifyDocuments(userData.teacher_documents.id, 'id_verify')} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                            </button>
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
                                                <button onClick={() => verifyDocuments(userData.teacher_documents.id, 'photo_verify')} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                    Accept
                                                </button>
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
                                            <button onClick={() => verifyDocuments(userData.teacher_documents.id, 'tenth_verify')} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                            </button>
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
                                            <button onClick={() => verifyDocuments(userData.teacher_documents.id, 'plustwo_verify')} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                            </button>
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
                                            <button onClick={() => verifyDocuments(userData.teacher_documents.id, 'graduation_verify')} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                            </button>
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
                                            <button onClick={() => verifyDocuments(userData.teacher_documents.id, 'experience_verify')} className="bg-blue-600 px-3 py-2 rounded-md mt ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Accept
                                            </button>
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

export default TeacherDetailview





