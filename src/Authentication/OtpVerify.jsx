import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';




function OtpVerify() {
  const [otp, setOtp] = useState(''); 
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  let result = ''

  const email = JSON.parse(localStorage.getItem('email'))
  const key = JSON.parse(localStorage.getItem('key'))

  const handleChange = (newValue) => {
    result+=newValue
    setOtp(newValue)
    if (result.length === 6){
      VerifyOtp()
    }
  }

  const VerifyOtp = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', 
      { 
        otp:result,
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
  

  useEffect(()=>{
    handleOpen()
},[])

const modalstyle = {
 display:'flex',
 alignItems:'center',
 justifyContent:'center',
 background:'linear-gradient(to right, green, black)'
}
const style = {
  background:'whitesmoke',
  height:'15%',
  width:'35%',
  display:'flex',
  gap:'10%',
 alignItems:'center',
 justifyContent:'center',
 flexDirection:'column',
 padding:'2%',
 borderRadius:'10px',
}
 
const heading = {
  // position:'absolute',
  top:'10%',
  fontFamily:'sans-sarif',
  fontSize:'150%',
  fontWeight:'bolder',
  color:'green'
}
const inputbox = {
  height:'50%',
  width:'80%',

}
  

  return (
    <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={modalstyle}
      >
        <Box sx={style}>
          <div>
          <h3  style={heading}>Enter Your OTP</h3>
          </div>
        <MuiOtpInput style={inputbox} length={6} value={otp} onChange={handleChange} />
        </Box>
      </Modal>
  );
}

export default OtpVerify;
