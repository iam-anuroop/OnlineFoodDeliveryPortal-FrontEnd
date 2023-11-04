import React, { useState } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';




function EmailAuth() {
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate()

  // material ui state and style --->
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
  };
  const buttonstyle = {
    bgcolor: '#3B945E',
    marginTop: 'auto', 
    marginLeft: 'auto',
  }
  const buttonlogin = {
    fontFamily: 'sans-serif',
    color:'black',
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
      >
        <Box sx={style}>
          <TextField
                    required
                    id="outlined-required"
                    label="username"
                    // defaultValue='email'
                    name='Email'
                    onChange={handleEmailChange}
                    />
          <Button sx={buttonstyle} variant="contained" onClick={registerEmail}>
              Confirm
          </Button>
        </Box>
      </Modal>
    </div>
    </>
  );
}

export default EmailAuth;
