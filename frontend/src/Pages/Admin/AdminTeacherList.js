import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminTeacherList() {
  const authentication_user = useSelector(state => state.authentication_user);
  console.log('authicate', authentication_user.isAuthenticated);

  const baseURL = "http://127.0.0.1:8000";
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = (url) => {
    axios.get(url)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const filteredUsers = response.data.filter(user =>  !user.is_superuser && user.is_staff && user.is_email_verified);
        
          console.log(filteredUsers);
          setUsers(filteredUsers);
        } else {
          console.error("Error fetching users: Data is not an array or undefined", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };



  const handleInputChange = event => {
    setSearch(event.target.value);
  };

  const filteredTeachers = users.filter(user =>
    (user.username?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())) ?? false
  );





  const blockUser = (userId) => {
    const confirmBlock = window.confirm('Are you sure you want to block this user?');
    if (confirmBlock) {
      axios.patch(`${baseURL}/adminapp/teachers/accept/${userId}/`, { is_active: false })
        .then((response) => {
          console.log('User blocked successfully', response);
          fetchUsers(`${baseURL}/adminapp/teachers/`);
        })
        .catch((error) => {
          console.error('Error blocking user:', error);
        });
    }
  };

  const unblockUser = (userId) => {
    const confirmUnblock = window.confirm('Are you sure you want to unblock this user?');
    if (confirmUnblock) {
      axios.patch(`${baseURL}/adminapp/teachers/accept/${userId}/`, { is_active: true })
        .then((response) => {
          console.log('User unblocked successfully', response);
          fetchUsers(`${baseURL}/adminapp/teachers/`);
        })
        .catch((error) => {
          console.error('Error unblocking user:', error);
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
              <div>
                <h2 className="text-gray-600 font-semibold">Students List</h2>
                <span className="text-xs">Manage all student</span>
              </div>

              <div className='flex items-center justify-center  ml-10 '>
                <div className="flex items-center border border-gray-500  bg-white rounded-lg">
                  <form onSubmit={e => e.preventDefault()} className="w-full flex items-center">
                    <input 
                      type="search" 
                      value={search} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-1   text-gray-800 rounded-full focus:outline-none"
                      placeholder="Search" 
                    />
                  </form>
                </div>
              </div>


              <Link to='/admin/teacher_request'>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  <span className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide ">
                    View New Requests
                  </span>
                </div>
              </div>
              </Link>
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
                          Action
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeachers.length === 0 && <tr><td>No Users Found</td></tr>}

                      {filteredTeachers.map((user) => (
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
                          {user.is_active ? (
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                              <span className="relative">Active</span>
                            </span>
                          ) : (
                            <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                              <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                              <span className="relative">Blocked</span>
                            </span>
                          )}
                          </td>



                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                          {user.is_active ? (
                          <>
                          <button onClick={() => blockUser(user.id)} className="bg-red-600 px-2 py-2 rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
                            Block
                          </button>
                          </>
                          ) : (<>
                            <button onClick={() => unblockUser(user.id)} className="bg-green-600 px-2 py-2 rounded-md  ml-3 text-white font-semibold tracking-wide cursor-pointer">
                            Unblock
                          </button>
                          </>
                            )}
                          </td>


                            <td>
                            <Link to={`/admin/teacher_detail/${user.id}`}>
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

export default AdminTeacherList;
