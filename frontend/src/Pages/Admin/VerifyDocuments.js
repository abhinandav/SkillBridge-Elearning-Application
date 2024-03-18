import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TeacherDetailview() {
    const navigate = useNavigate();
    const baseURL = "http://127.0.0.1:8000";
    const { id } = useParams();

    const [userData, setUserData] = useState({
        user: {
            id: null,
            username: '',
            email: '',
        },
        teacher_documents: {
            id_proof: false,
            photo_proof: false,
            tenth_proof: false,
            plustwo_proof: false,
            graduation_proof: false,
            experience_proof: false,
        }
    });

    useEffect(() => {
        axios.get(`${baseURL}/adminapp/teacher_detail/${id}/`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [id]);

    console.log('userdata',userData.teacher_documents.id);



    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const updatedData = {
            ...userData,
            teacher_documents: {
                ...userData.teacher_documents,
                id_verify: document.getElementById('id').checked,
                photo_verify: document.getElementById('photo').checked,
                tenth_verify: document.getElementById('tenth').checked,
                plustwo_verify: document.getElementById('plustwo').checked,
                graduation_verify: document.getElementById('graduation').checked,
                experience_verify: document.getElementById('experience').checked,
            }
        };

        await axios.put(`${baseURL}/adminapp/update_documents/${userData.teacher_documents.id}/`, updatedData)
            .then(response => {
                console.log('Data updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating user documents:', error);
            });
    };


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
                    
                    <form onSubmit={handleFormSubmit}>
                        {userData.teacher_documents && userData.teacher_documents.id_proof && (
                            <div className="flex items-center mx-20 mb-3 mt-5">
                                <h3 className="text-xl font-semibold mr-2">ID Proof:</h3>
                                <a
                                    href={`http://localhost:8000${userData.teacher_documents.id_proof}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 mx-10"
                                >
                                    View Document
                                </a>
                                <input type='checkbox' id='id'/>
                            </div>
                        )}



                        {userData.teacher_documents.photo_proof && (
                            <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-5 ml-2">Photo:</h3>
                            <a
                                href={`http://localhost:8000${userData.teacher_documents.photo_proof}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mx-10"
                            >
                                View Document
                            </a>
                            <input type='checkbox' id='photo'/>
                            </div>
                        )}


                        {userData.teacher_documents.tenth_proof && (
                            <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-5 ml-2">10 th Certificate:</h3>
                            <a
                                href={`http://localhost:8000${userData.teacher_documents.tenth_proof}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mx-0"
                            >
                                View Document
                            </a>
                            <input type='checkbox' id='tenth'/>
                            </div>
                        )}


                        {userData.teacher_documents.plustwo_proof && (
                            <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-5 ">12 th Certificate:</h3>
                            <a
                                href={`http://localhost:8000${userData.teacher_documents.plustwo_proof}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mx-0"
                            >
                                View Document
                            </a>
                            <input type='checkbox' id='plustwo'/>
                            </div>
                        )}  

                        {userData.teacher_documents.graduation_proof && (
                            <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-5 ">Graduation Certificate:</h3>
                            <a
                                href={`http://localhost:8000${userData.teacher_documents.graduation_proof}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mx-0"
                            >
                                View Document
                            </a>
                            <input type='checkbox' id='graduation'/>
                            </div>
                        )}   

                            {userData.teacher_documents.experience_proof && (
                            <div className="flex items-center mx-20 mb-3">
                            <h3 className="text-xl font-semibold mr-5 ">Experience Certificate:</h3>
                            <a
                                href={`http://localhost:8000${userData.teacher_documents.experience_proof}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mx-0"
                            >
                                View Document
                            </a>
                            <input type='checkbox' id='experience'/>
                            </div>
                        )}  

                        <button>submit</button>

                </form>

                </div>
                </div>
                </div>
    
        </>

  )
}

export default TeacherDetailview





