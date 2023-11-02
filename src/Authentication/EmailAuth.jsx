import React, { useState } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';

function EmailAuth() {
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };
  console.log(email);

  const registerEmail = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', { 
        email:email
      });
      console.log('Registration successful:', response.data);
      localStorage.setItem('token',JSON.stringify(response.data.token))
      localStorage.setItem('key',JSON.stringify(response.data.key))
      localStorage.setItem('email',JSON.stringify(response.data.email))
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={registerEmail}>
      <input
        type="email"
        placeholder='email'
        value={email}
        onChange={handleEmailChange} 
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default EmailAuth;
