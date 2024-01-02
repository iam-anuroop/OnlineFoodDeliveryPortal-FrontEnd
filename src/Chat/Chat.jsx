import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import './Chat.css';

function Chat({ chat_id }) {
  const [room, setRoom] = useState(chat_id);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('User');
  const { user, authTokens } = useContext(AuthContext);
  const client = useMemo(() => new W3CWebSocket(`ws://127.0.0.1:8000/ws/${room}/`), [room]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    FetchMessages();

    client.onopen = () => {
      console.log('WebSocket connection opened');
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data.sender);

      setMessages((prevMessages) => [...prevMessages, { content: data.text, sender: data.sender }]);
      scrollToBottom();
    };

    client.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    client.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    
    return () => {
      client.close();
    };
  }, [client, chat_id]);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const sendMessage = () => {
    const messageData = {
      text: messageInput,
      sender: user.email,
    };

    if ((messageInput.trim()).length > 0) {
      client.send(JSON.stringify(messageData));
      setMessageInput('');
      saveMessage({ ...messageData, chat_id: chat_id });
    }
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
    }
  };

  const FetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/chat/send-message/?chat_id=${chat_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.token.access}`,
          },
        }
      );

      console.log('Message fetched successfully:', response.data);
      setMessages(response.data);
      scrollToBottom(); 
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };


  return (
    <div>
      <div style={{ height: '300px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={user.email === msg.sender.email ? 'chat-box-user-msg' : 'chat-box-delivery-msg'}>
            <div>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='chat-box-input-div'>
        <input
          className='chat-box-input'
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage} className='chat-box-send-btn'>
          <i className="chat-box-send-icon fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default Chat;
