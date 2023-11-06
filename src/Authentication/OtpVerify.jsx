import React, { useState, useRef } from 'react';
import './OtpVerify.css'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const OtpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([0, 0, 0, 0, 0, 0]);
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true);


  const handleInputChange = (event, index) => {
    if (event.target.value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = event.target.value;
      setOtp(newOtp);

      if (index < 5 && event.target.value !== '') {
        inputRefs.current[index + 1].focus();
      }

      if (index > 0 && event.target.value === '') {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };



  const email = JSON.parse(localStorage.getItem('email'))
  const key = JSON.parse(localStorage.getItem('key'))


  const VerifyOtp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', 
      { 
        otp:otp.join(''),
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


  const modalstyle = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    background: 'linear-gradient(120deg, #03045e, #0096c7,#03045e)'
   }
   

  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={modalstyle}
      >
        <Box>

    <form className="otp-verify-Form" onSubmit={VerifyOtp}>
      <span className="mainHeading">Enter OTP</span>
      <p className="otpSubheading">We have sent a verification code to your Email ID</p>
      <div className="inputContainer">
        {otp.map((digit, index) => (
          <input
            key={index}
            required
            maxLength="1"
            type="text"
            className="otp-input"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <button className="verifyButton" type="submit">Verify</button>
      
    </form>
    </Box>
      </Modal>

  );
};

export default OtpVerify;



{/* <p className="resendNote">
        Didn't receive the code? <button className="resendBtn">Resend Code</button>
      </p> */}