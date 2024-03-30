import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function Messages() {
    const messagesRef = useRef(null);
    const chatSocketRef = useRef(null);
    const baseURL = "http://127.0.0.1:8000";
    const token=localStorage.getItem('access')
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const authentication_user=useSelector(state=>state.authentication_user)
    console.log('authentication user',authentication_user);


    useEffect(() => {
        const url = 'ws://127.0.0.1:8000/ws/socket-server/';
        console.log(url);

        chatSocketRef.current = new WebSocket(url);

        chatSocketRef.current.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log('Data:', data);
            if (data.type === 'chat') {
                setMessages(prevMessages => [...prevMessages, data.message]);
                messagesRef.current.insertAdjacentHTML('beforeend', `<div><p>${data.message}</p></div>`);
            }
        };

        return () => {
            chatSocketRef.current.close();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.elements.message.value;
        const senderId = authentication_user.userid; // Assuming authentication_user contains sender ID
        const receiverId = 4; // Assuming receiver ID is 4
        setMessages(prevMessages => [...prevMessages, message]);
        chatSocketRef.current.send(JSON.stringify({ 'message': message, 'sender_id': senderId, 'receiver_id': receiverId }));
        e.target.reset();
    };
    

    // sidebar
    const fetchUsers = (url) => {
        axios.get(url)
          .then((response) => {
            if (response.data && Array.isArray(response.data)) {
                const filteredUsers = response.data.filter(user => user.id !== authentication_user.userid);
                setUsers(filteredUsers); 
                console.log('filteredUsers',filteredUsers);
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

      console.log(messages);



    //   fetch teachers

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(baseURL+'/chat/ordercourse_teachers/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    console.log(teachers);

    // websocket connection

    const connectToWebSocket = (appointmentId) => {
        if (!appointmentId) return;
    
        const newClient = new W3CWebSocket(
          `wss://primecare.cloud/ws/chat/${appointmentId}/`
        );
        setClient(newClient);
    
        newClient.onopen = () => {
          console.log("WebSocket Client Connected");
        };
    
        newClient.onmessage = (message) => {
          const data = JSON.parse(message.data);
          setChatMessages((prevMessages) => [...prevMessages, data]);
        };
    }




    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">

        {/*-------------------- sidebar start --------------------*/}

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

                    {teachers.map((order) => (
                        <button key={order.id} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                H
                            </div>
                            <div className="ml-2 text-sm font-semibold">{order.user.username}</div>
                        </button>
                    ))}

                        </div>
                    </div>
                </div>
        {/*----------------------sidebar end--------------------*/}






            <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4" >
                
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {messages.map((message, index) => (
                                        <div key={index} className={`col-start-${message.sender === 'A' ? '6' : '1'} col-end-${message.sender === 'A' ? '13' : '8'} p-3 rounded-lg`}>
                                            <div className={`flex flex-row items-center ${message.sender === 'A' ? 'justify-start flex-row-reverse' : ''}`}>
                                                <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0`}>
                                                    A
                                                </div>
                                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>{message}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <form onSubmit={handleSubmit} className='flex'>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                            <input
                                type="text"
                                name="message"
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            </div>
                        </div>
                        <div className="ml-4">
                            <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                <span>Send</span>
                                <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
                <div id="messages" ref={messagesRef}></div>


                    </div>
                </div>
            </div>
        </div>
      );
    }
    
export default Messages;



                        // value={inputValue}
                        // onChange={handleInputChange}


                        // import MessageInput from './MessageInput';