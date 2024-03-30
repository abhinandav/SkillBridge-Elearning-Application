import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MessageSidebar() {
    
  const baseURL = "http://127.0.0.1:8000";

  const [users, setUsers] = useState([]);

  
    const fetchUsers = (url) => {
        axios.get(url)
          .then((response) => {
            if (response.data && Array.isArray(response.data)) {
            //   const filteredUsers = response.data.filter(user =>  !user.is_superuser && !user.is_staff );
            
            //   console.log(filteredUsers);
              setUsers(response.data);
            } else {
              console.error("Error fetching users: Data is not an array or undefined", response);
            }
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      };


      useEffect(() => {
        fetchUsers(baseURL + "/adminapp/users/");
      }, []);


      console.log(users);
    
    
  return (
   
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
        <div
            className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
        >
            <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
            </svg>
        </div>
        <div className="ml-2 font-bold text-2xl">Chat</div>
        </div>

        <div className="flex flex-col mt-8">

        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 ">
        {users.map((user) => (
            <button  key={user.id} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div  className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                H
            </div>

            <div className="ml-2 text-sm font-semibold">{user.username}</div>
            </button>
        ))}
            </div>
        </div>
</div>


  )
}

export default MessageSidebar