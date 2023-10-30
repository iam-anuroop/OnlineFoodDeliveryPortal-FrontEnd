import React, { useState } from 'react';
import axios from 'axios';

function OtpVerify() {
  const [otp, setOtp] = useState(''); 

  const handleOtpChange = (e) => {
    setOtp(e.target.value); 
  };

  const VerifyOtp = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', { otp });
      console.log('Verification successful:', response.data);
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
