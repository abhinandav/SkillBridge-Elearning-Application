// Chat.js
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Chat = ({ roomId, userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const client = new W3CWebSocket(`ws://localhost:8000/ws/chat/${roomId}/`);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setMessages(prevMessages => [...prevMessages, dataFromServer]);
    };

    client.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      client.close();
    };
  }, [roomId]);

  const sendMessage = () => {
    client.send(JSON.stringify({ userId, message }));
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='haiii'
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
