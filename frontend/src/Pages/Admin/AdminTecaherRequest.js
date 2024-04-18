import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminTecaherRequest() {
  const authentication_user = useSelector(state => state.authentication_user);
  console.log('authicate', authentication_user.isAuthenticated);

  const baseURL = "http://127.0.0.1:8000";
  const [users, setUsers] = useState([]);

  const fetchUsers = (url) => {
    axios.get(url,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access')}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  })
      .then((response) => {
        console.log('API response:', response.data);
        if (response.data) {
          if (Array.isArray(response.data)) {
            const filteredUsers = response.data.filter(user => !user.is_superuser && user.is_staff && !user.is_email_verified);
            console.log(filteredUsers);
            setUsers(filteredUsers);
          } else {
            console.error("Error fetching users: Data is not an array", response.data);
          }
        } else {
          console.error("Error fetching users: Response data is undefined", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  
  


  const acceptUser = (userId) => {
    const confirmAccept = window.confirm('Are you sure you want to accept this user?');
  
    if (confirmAccept) {
      axios.patch(`${baseURL}/adminapp/teachers/accept/${userId}/`, { is_email_verified: true })
        .then((response) => {
          console.log('teacher accepted successfully', response);
          fetchUsers(`${baseURL}/adminapp/teachers/`);
        })
        .catch((error) => {
          console.error('Error accepting user:', error);
        });
    }
  };
  

  useEffect(() => {
    fetchUsers(baseURL + "/adminapp/teachers/");
  }, []);



  return (
    <div>
      <Sidebar />
      <AdminHeader />
      <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <div className='p-6'>
          <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">

              <div className='flex justify-between'>
                <div>
                  <h2 className="text-gray-600 font-semibold">View New Teacher Requests</h2>
                  <span className="text-xs">Accept or Reject teachers</span>
                </div>
                
                <div>
                    <Link to="/admin/course_list">
                    <span className="text-md">Go back</span>
                    </Link>
                </div>
                 
              </div>


              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  
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
                          Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date Joined
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          View
                        </th>
                

               
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 && <tr><td>No Users Found</td></tr>}

                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{user.date_joined}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                              <span className="relative">Active</span>
                            </span>
                          </td>

                          <td>
                            <Link to={`/admin/verify_documents/${user.id}`}>
                            <button className="bg-blue-600 px-2 py-2  rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
                              View
                            </button>
                            </Link>
                          </td>

                         
                          

                       
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTecaherRequest;
