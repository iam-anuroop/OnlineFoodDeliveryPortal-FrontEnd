import React, { useState, useRef, useContext } from 'react';
import './OtpVerify.css'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import AuthContext from '../Context/AuthContext'




const OtpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([0, 0, 0, 0, 0, 0]);
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true);
  const { authTokens } = useContext(AuthContext)


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
      const response = await axios.post('http://127.0.0.1:8000/phoneverify/', 
      { 
        otp:parseInt(otp.join('')),
        phone:JSON.parse(localStorage.getItem('phone')),
        v_id:JSON.parse(localStorage.getItem('v_id'))
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
      console.log(response.data)
      localStorage.setItem('authTokens',JSON.stringify(response.data))
      toast.success('Verified Successfully')
      navigate('/home')
    } catch (error) {
      console.error('Verification failed:', error);
      toast.warning('Something Wrong')
    }
  };


  const modalstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: "url('https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1734.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=sph')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
 
  

  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={modalstyle}
        className='modal-otp-verify'
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

