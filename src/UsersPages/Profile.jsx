import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Navbar from '../Navbar/Navbar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

function Profile() {

    const { authTokens } = useContext(AuthContext)
    const [profile,setProfile] = useState('')
    const [open, setOpen] = React.useState(false);

    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const getprofile = async () => {

        try{
            const response = await axios.get('http://127.0.0.1:8000/user/profile/',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.token.access}`
                }
            }
            )
            setProfile(response.data.data)
        }
        catch{
            console.log('Cant fetch user profile');

        }

    }

    useEffect(()=>{
        getprofile()
    },[])   
    
    console.log(profile);
  return (
    <>
        <Navbar/>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='email-modal'>
            <Box className='email-box'>
            <div className='profile-main-div'>
                <div className='profile-second-div'>
                    <h3>PROFILE</h3>
                    <button onClick={()=>Navigate('/update')}>Edit <i class="fa-solid fa-keyboard"></i></button>
                </div>
                <div className="profile-third-div">
                    <div className="profile-username-div">
                        <h3>Username : </h3>{profile.username&&<h3> {profile.username}</h3>}
                    </div>
                    <div className="profile-email-div">
                        <h3>Email : </h3>{profile.email&&<h3> {profile.email}</h3>}
                    </div>
                    <div className="profile-phone-div">
                        {profile.phone&&<p>phone: {profile.phone}</p>}
                    </div>
                </div>
            </div>
            </Box>
        </Modal>
    </>
  )
}

export default Profile