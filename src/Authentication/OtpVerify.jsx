import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OtpVerify() {
  const [otp, setOtp] = useState(''); 
  const navigate = useNavigate()

  const email = JSON.parse(localStorage.getItem('email'))
  const key = JSON.parse(localStorage.getItem('key'))
  const handleOtpChange = (e) => {
    setOtp(e.target.value); 
  };

  const VerifyOtp = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', 
      { 
        otp:otp,
        email:email,
        key:key
      });
      console.log('Verification successful:', response.data);
      localStorage.removeItem('key')
      localStorage.removeItem('email')
      localStorage.setItem('authTokens',JSON.stringify(response.data))
      navigate('/home')
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <form onSubmit={VerifyOtp}>
      <input
        type="number"
        placeholder='otp'
        value={otp}
        onChange={handleOtpChange} 
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default OtpVerify;
