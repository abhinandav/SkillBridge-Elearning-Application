import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import AdminHeader from '../../Components/Admin/AdminHeader'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TeacherDetailview() {
    const navigate=useNavigate()
    const baseURL = "http://127.0.0.1:8000";
    const { id } = useParams();
    console.log('User ID:', id);
    const [userData, setUserData] = useState({
        user: {
            id: null,
            username: '',
            email: '',
        },
        teacher_details: {
            number: '',
            experience: '',
            age: '',
            document: '', 
            address: '',
        }
    });
    

    useEffect(() => {
        console.log(`${baseURL}/adminapp/teacher_detail/${id}/`)

        axios.get(`${baseURL}/adminapp/teacher_detail/${id}/`)
            .then(response => {
                setUserData(response.data); 
                console.log(response.data);
                console.log(userData.user.name);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [id]);
  return (
        <>
            <Sidebar/>
            <AdminHeader/>
            <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
                <div className='p-6'>
                <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
                    <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile " />
                    <h2 className="text-center text-2xl font-semibold mt-3">{userData.user.username}</h2>
                    <p className="text-center text-gray-600 mt-1">{userData.user.email}</p>
                    <div className="flex justify-center mt-5">
                    <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
                    <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
                    <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
                    </div>




                    <div className="my-10 ">
                        <div className="flex items-center mx-20 text-center mb-3">
                            <h3 className="text-xl font-semibold mr-2">Name:</h3>
                            <p className="text-gray-600 mx-10">{userData.user.username}</p>
                        </div>

                        <div className="flex items-center mx-20  mb-3">
                            <h3 className="text-xl font-semibold mr-2">Email:</h3>
                            <p className="text-gray-600 mx-10">{userData.user.email}</p>
                        </div>

                        <div className="flex items-center mx-20  mb-3">
                            <h3 className="text-xl font-semibold mr-2">Number:</h3>
                            <p className="text-gray-600 mx-10">{userData.teacher_details.number}</p>
                        </div>

                        <div className="flex items-center mx-20  mb-3">
                            <h3 className="text-xl font-semibold mr-2">Experience:</h3>
                            <p className="text-gray-600 mx-10">{userData.teacher_details.experience}</p>
                        </div>

                        <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-2">Age:</h3>
                            <p className="text-gray-600 mx-10">{userData.teacher_details.age}</p>
                        </div>

                        <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-2">Address:</h3>
                            <p className="text-gray-600 mx-10">{userData.teacher_details.address}</p>
                        </div>

                        {userData.teacher_details.documents && (
                            <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-2">Documents:</h3>
                            <a
                                href={`http://localhost:8000${userData.teacher_details.documents}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mx-10"
                            >
                                View Document
                            </a>
                            </div>
                        )}
                        </div>

                </div>
                </div>
            </div>
        </>

  )
}

export default TeacherDetailview