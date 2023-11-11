import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import UpdateIcon from '@mui/icons-material/Update'; //endIcon={<UpdateIcon />}
import Stack from '@mui/material/Stack';
import { toast} from 'react-toastify';

// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from '../Navbar/Navbar'
import './UpdateProfile.css'
import { useNavigate } from 'react-router-dom';



function UpdateProfile() {

    const navigate = useNavigate()
    const { authTokens } = useContext(AuthContext)
    const [profile,setProfile] = useState('')
    const [newValue,setNewValue] = useState({
        username:'',
        phone:'',
        alt_phone:'',
        user_address:'',
        city:'',
        zip:''
    })

    // fetch the user to get the current data (data before update)
    const getprofile = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/user/profile/',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.token.access}`
                },
                data:{

                }
            });
            setProfile(response.data.data);
        }
        catch{
            console.log('Cant fetch user profile');
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewValue({ ...newValue, [name]: value });
    }


    const update = async (e) => {
      e.preventDefault()
        try {
          const response = await axios('http://127.0.0.1:8000/user/profile/',{
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authTokens.token.access}` 
            },
            data: {
              username: newValue.username ? newValue.username : profile.username,
              userprofile: {
                alt_phone: newValue.alt_phone ? newValue.alt_phone : profile.userprofile.properties.alt_phone,
                user_address: newValue.user_address ? newValue.user_address : profile.userprofile.properties.user_address
              }
            }
          });
          console.log('helooooooo');
          console.log(response,'hoyy');
          if (newValue.phone!=""){
            SendOtp(newValue.phone)
          }else{
            toast.success('Profile Updated')
            navigate('/profile')
          }
        } catch {
          console.log(`Can't update profile right now`);
        }
      }


      const SendOtp = async (phone) => {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/otpphone/',
            {
              phone: phone
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.token.access}`
              }
            }
          );
          toast.warning('Please check your phone');
          localStorage.setItem('phone',JSON.stringify(phone))
          localStorage.setItem('v_id',JSON.stringify(response.data.v_id))
          navigate('/phoneotp');
        } catch (error) {
          console.log(error);
          toast.warning('Something went wrong');
        }
      };
      

    useEffect(()=>{
        getprofile()
    },[])

  return (
    <>
    <Navbar/>
    <div className='update-profile-main-div'>
        <h1 style={{color:'#03045e'}}>UpdateProfile</h1>
        {profile&&
        <div className='update-profile-box-div'>
        <Box
            // component="form"
            
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <Form onSubmit={update}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={handleChange} name='email' type="email" defaultValue={profile.email&&profile.email} placeholder='Email' />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control onChange={handleChange} name='username' type="text" defaultValue={profile.username&&profile.username} placeholder='Username' />
                </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Phone</Form.Label>
                <Form.Control onChange={handleChange} name='phone' type="text" defaultValue={profile.phone&&profile.phone} placeholder='Phone' />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Alt Phone</Form.Label>
                <Form.Control onChange={handleChange} name='alt_phone' type="text" defaultValue={profile.userprofile.properties.alt_phone&&profile.userprofile.properties.alt_phone} placeholder='alt phone' />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={handleChange} name='user_address' defaultValue={profile.userprofile.properties.user_address&&profile.userprofile.properties.user_address} placeholder='address' />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={handleChange} name='city' placeholder="Enter City"/>
              </Form.Group>

          {/* <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                  </Form.Select>
                </Form.Group> */}

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control onChange={handleChange} name='zip' placeholder="Enter Zip"/>
              </Form.Group>
            </Row>

            <Button className='update-profile-submit-button' variant="primary" type="submit">
            Update
            </Button>
          </Form>
        </Box>
        </div>
        }


    </div>
    </>

  )
}

export default UpdateProfile