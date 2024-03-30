import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Link, useParams } from 'react-router-dom';

function Messages() {
    const baseURL = "http://127.0.0.1:8000";
    const token = localStorage.getItem('access');

    const { orderId } = useParams()
    const [client, setClient] = useState('');
    const [receiverId, setRecieverId] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const authentication_user = useSelector(state => state.authentication_user);
    // console.log('auth',authentication_user);
    const userid=parseInt(authentication_user.id)
    console.log('auth',userid);


    console.log('orderid',orderId);

    useEffect(() => {
        if (orderId) {
            console.log(orderId);
            const wsURL = `ws://127.0.0.1:8000/ws/socket-server/${orderId}/`;
            connectToWebSocket(wsURL);
            return () => {
                client && client.close();
            };
        }
    }, [orderId]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };


// fetch reciver(teacher)

const fetchReciever = async (orderId) => {
    try {
        const response = await axios.get(`${baseURL}/chat/created_teacher/${orderId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setRecieverId(response.data[0].id)
        return response.data;
    } catch (error) {
        console.error('Error fetching added user:', error);
        return null;
    }
};

console.log('reciever',receiverId);

    useEffect(() => {
        if (orderId) {
            fetchReciever(orderId)
        }
    }, [orderId]);



// websocket connection

    const connectToWebSocket = (url) => {
        if (client) {
        client.close();
        setChatMessages([]);
        }


        const newClient = new W3CWebSocket(url);
        setClient(newClient);
        newClient.onopen = () => {
            console.log("WebSocket Client Connected");
            fetchExistingMessages();
        };
    
        newClient.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setChatMessages((prevMessages) => [...prevMessages, data]);
        };
    
          
     
    };


    const fetchExistingMessages = async () => {
        try {
          const response = await fetch(
            `${baseURL}/chat/chat-messages/${orderId}/`
          );
  
          if (!response.ok) {
            console.error(
              "Error fetching existing messages. Status:",
              response.status
            );
            return;
          }
  
          const data = await response.json();
          console.log('data',data);
  
          const messagesTextArray = data.map((item) => ({
            message: item.message,
            sender: item.sender,
            receiver:item.receiver,
            timestamp:item.timestamp
          }));
  
          setChatMessages(messagesTextArray);
          
        } catch (error) {
          console.error("Error fetching existing messages:", error);
        }
    };


    const sendMessage = (e) => {
        e.preventDefault();
        if (!client || client.readyState !== client.OPEN) {
          console.error("WebSocket is not open");
          return;
        }
    
        const senderId = authentication_user.userid;
        const messageData = { 
            'message': message, 
            'order_id': orderId, 
            'sender_id': senderId, 
            'receiver_id': receiverId 
        };
        const messageString = JSON.stringify(messageData);
    
        console.log("Sending Message:", messageString);
    
        client.send(messageString);
        setMessage('')
        
    };
    


    // sidebar
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



    console.log("Chat messages:", chatMessages);


    return (
        <div style={{height:640}} className="flex h-  antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">

        {/*-------------------- sidebar start --------------------*/}

                
            <div style={{height:200}} className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                <div className="flex flex-row items-center justify-center h-12 w-full">
                    <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10" >
                        <svg className="w-6 h-6"  fill="none"  stroke="currentColor"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
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
                
                <div className="flex flex-row mt-8 ml-5">
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 ">
                        {teachers.map((order) => (
                            <span key={order.id} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 px-10">
                                <Link to={`/inbox/${order.id}/`} className="flex items-center">
                                    <div className="h-8 w-8 bg-indigo-200 rounded-full flex items-center justify-center">
                                        H
                                    </div>
                                    <div className="ml-5  font- text-md">{order.user.username}</div>
                                </Link>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        {/*----------------------sidebar end--------------------*/}


            <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-40 p-4" >
                    <div className="flex flex-col flex-auto h-full p-6">
                        <div className="flex flex-col flex-auto flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 h-full p-4">



                            <div className="flex flex-col h-full overflow-y-auto  mb-4" style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                                <div className="flex flex-col h-full">
                                    {chatMessages.map((message, index) => (
                                        <div key={index}>
                                            {parseInt(message.sender) === parseInt(authentication_user.userid) ? (
                                                <div className="col-start-1 col-end-8 p-3 rounded-lg mb-2 ml-auto">
                                                    <div className="flex flex-row items-center">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                            A
                                                        </div>
                                                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                            <div>{message.message}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="col-start-8 col-end-12 p-3 rounded-lg mb-2 mr-auto">
                                                    <div className="flex items-center justify-start flex-row-reverse">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                            A
                                                        </div>
                                                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                            <div>{message.message}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>




                        </div>
                        

                        <form onSubmit={sendMessage} className='flex '>
                            <div className="flex flex-row items-center h-16 rounded-xl bg-gray w-full px-4">
                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="message"
                                        value={message}
                                        onChange={handleMessageChange}
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
                    </div>
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


                         // useEffect(() => {
    //     const url = 'ws://127.0.0.1:8000/ws/socket-server/';
    //     console.log(url);
    //     chatSocketRef.current = new WebSocket(url);
    //     chatSocketRef.current.onmessage = function(event) {
    //         const data = JSON.parse(event.data);
    //         console.log('Data:', data);
    //         if (data.type === 'chat') {
    //             setMessages(prevMessages => [...prevMessages, data.message]);
    //             messagesRef.current.insertAdjacentHTML('beforeend', `<div><p>${data.message}</p></div>`);
    //         }
    //     };

    //     return () => {
    //         chatSocketRef.current.close();
    //     };
    // }, []);





    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const message = e.target.elements.message.value;
    //     const senderId = authentication_user.userid; 
    //     const receiverId = 4; 
    //     setMessages(prevMessages => [...prevMessages, message]);
    //     chatSocketRef.current.send(JSON.stringify({ 'message': message,'order_id':13, 'sender_id': senderId, 'receiver_id': receiverId }));
    //     e.target.reset();
    // };





    //  {/* {chatMessages.map((message, index) => (
    //                                     <div key={index} className={`col-start-${message.sender === 'A' ? '6' : '1'} col-end-${message.sender === 'A' ? '13' : '8'} p-3 rounded-lg`}>
                                        
    //                                         <div className={`flex flex-row items-center ${message.sender === authentication_user.id ? 'justify-start flex-row-reverse' : ''}`}>
    //                                             <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0`}>
    //                                                 S
    //                                             </div>

    //                                             <div className={`relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl ${message.sender === authentication_user.id  ? 'self-end' : 'self-start'}`}>
    //                                                 <div>{message.message}</div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 ))} */}
    

// chat...................


