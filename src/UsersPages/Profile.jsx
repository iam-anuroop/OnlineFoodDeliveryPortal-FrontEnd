import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Header from '../Navbar/Header'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from '@mui/material/Button';



function Profile() {

    const {authTokens } = useContext(AuthContext)
    const [profile,setProfile] = useState('')
    const navigate = useNavigate()



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

    const user_loaction =localStorage.getItem('location')&&JSON.parse(localStorage.getItem('location'))
    

    useEffect(()=>{
        getprofile()
    },[])   
    
    console.log(profile);
  return (
    <>
    <Header/>
    <div className='update-profile-main-div'>
        <h1 style={{color:'#03045e'}}>Profile</h1>
        {profile&&
        <div className='update-profile-box-div'>
        <Box
            // component="form"
            
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <Form >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control readOnly  name='email' type="email" defaultValue={profile.email&&profile.email} placeholder='Email' />
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control readOnly  name='username' type="text" defaultValue={profile.username&&profile.username} placeholder='Username' />
                </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Phone</Form.Label>
                <Form.Control readOnly  name='phone' type="text" defaultValue={profile.phone&&profile.phone} placeholder='Phone' />
              </Form.Group>
              </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Alt Phone</Form.Label>
                <Form.Control readOnly  name='alt_phone' type="text" defaultValue={profile.userprofile.properties.alt_phone&&profile.userprofile.properties.alt_phone} placeholder='alt phone' />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control readOnly  name='user_address' defaultValue={profile.userprofile.properties.user_address&&profile.userprofile.properties.user_address} placeholder='address' />
            </Form.Group>
              <Button onClick={()=>navigate('/update')} className='btn' style={{border:'1px solid blue'}}>Edit</Button>
          </Form>
        </Box>
        </div>
        }


    </div>
    </>
  )
}

export default Profile