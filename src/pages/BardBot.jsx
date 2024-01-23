import React, { useContext, useState } from 'react';
import axios from 'axios';
import './BardBot.css'
import AuthContext from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const BardBot = () => {
  const { user,authTokens } = useContext(AuthContext)
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const userMessage = { text: inputMessage, type: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setLoading(true);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/chat/bardproject/', {
        message: inputMessage,
      });
  
      const botMessage = { text: response.data.content, type: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bard-bot-container">
      <div className="message-container">
        <div className='heade-bard-bot'>
            <div><button className='bot-back-btn' onClick={()=>navigate('/home')}>Back</button></div>
            <div className='bot-heading-name'>I am Bot  <i className="fa-solid fa-robot"></i></div>
            <div></div>
        </div>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div>
                {message.text}
            </div>
          </div>
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <div className="input-container">
        <input
        className='bard-bot-input'
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className='bard-bot-button' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default BardBot;
