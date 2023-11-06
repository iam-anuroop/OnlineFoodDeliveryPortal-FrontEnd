import React, { useState } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
import './EmailAuth.css'




function EmailAuth() {
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate()

  // material ui state and style --->
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  
  const buttonlogin = {
    fontFamily: 'sans-serif',
    color:'white',
    fontSize:'16px',
    fontWeight:'bolder'
    
  }



  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

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
    <>
    <div>
      <Button style={buttonlogin} onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='email-modal'
      >
        <Box className='email-box'>
          <div className="email-form">
            <div className="flex-column">
              <label className='email-input-label'>Email</label>
            </div>
            <div className="email-inputForm">
            <i className="fa-solid fa-at" style={{color:'lightgreen'}}></i>
            <input type="email" name='Email' onChange={handleEmailChange} className="email-input" placeholder="Enter your Email" />
            </div>
            <button className="email-form-button button-submit" onClick={registerEmail}>Get OTP <i className="fa-solid fa-key" style={{color:'white'}}></i></button>
            <p className="email-p line">Or</p> 
            <p className="email-p">Create an Account With Google</p>
            <div className="email-flex-row">
              <button className="email-google-button btn google">
              <i className="fa-brands fa-google" style={{color:'blue'}}></i>
                Google
              </button>
            </div>
          </div>
        </Box>
        
      </Modal>
    </div>
    </>
  );
}

export default EmailAuth;