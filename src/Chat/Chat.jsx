import React, { useState, useEffect, useMemo, useContext } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import AuthContext from '../Context/AuthContext'
import axios from 'axios'



function Chat() {
  const [room, setRoom] = useState('test');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('User'); // You can set the username dynamically
  const { user,authTokens } = useContext(AuthContext)

  const client = useMemo(() => {
    return new W3CWebSocket(`ws://127.0.0.1:8000/ws/${room}/`);
  }, [room]);

  useEffect(() => {
    console.log(client);

    // Add event listeners and logic for WebSocket
    client.onopen = () => {
      console.log('WebSocket connection opened');
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data);

      // Update messages state with the new message
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    client.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    client.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    // Cleanup function
    return () => {
      // Close WebSocket connection or perform any cleanup when component unmounts
      client.close();
    };
  }, [client]);

  const sendMessage = () => {
    const messageData = {
      text: messageInput,
      sender: user.email,
    };

    // Send the message to the server
    client.send(JSON.stringify(messageData));

    // saveMessage(messageData);

    

    // Clear the message input field
    setMessageInput('');
  };


  const saveMessage = async (message) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/chat/send-message/',
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.token.access}`,
          },
        }
      );
  
      console.log('Message saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving message:', error.message);
      // You may want to display an error message to the user or perform other error handling here
    }
  };
  
  

  return (
    <div>
      <div>
        <h2>Chat Room: {room}</h2>
        <div style={{ height: '300px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
