import React, { useState } from 'react';
import axios from 'axios';

function EmailAuth() {
  const [email, setEmail] = useState(''); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

  const registerEmail = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', { email });
      console.log('Registration successful:', response.data);
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
