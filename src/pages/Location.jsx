import React, { useRef, useState } from 'react'
import axios from 'axios';
import EmailAuth from '../Authentication/EmailAuth';
import Card from '@mui/material/Card';
import { CardMedia, Input, Paper } from '@mui/material';
import Button from '@mui/material/Button';



function Location() {
  const [location, setLocation] = useState(null);


  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;


        try {
          const response = await axios.post('http://127.0.0.1:8000/user/currentloc/');
          setLocation(response.data);
          localStorage.setItem('location',JSON.stringify(response.data))
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      });
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  };


  // styles.... for this page
  const cardmstyle = {

  }
  const maindiv = {
    display:'flex',
    alignItems:'top',
    justifyContent:'center',
    height:'100vh'
  }
  const locationdiv = {
    height:'50vh',
    width:'50%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
  }
  const imagediv = {
    height:'50vh',
    width:'50%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'black'
  }
  const login = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background: '#86C232',
    borderRadius:'5px'
  }
  const emailauth = {
    border:'3px solid black'
  }

  const logindiv = {
    position:'absolute',
    top:'10%',
    right:'10%'
  }
  const locationinputdiv = {

  }
 

  
  return (
    <div style={maindiv}>
        <div className='locate' style={locationdiv}>
          <div>
            <div style={logindiv}>
              <Card style={login}  elevation={5}>
                <div style={emailauth}>
                    <EmailAuth/>
                </div>
              </Card>
            </div>
          </div>
          <div style={locationinputdiv}>
              <button onClick={getLocation}>Get Current Location</button>
          </div>
        </div>
        <div style={imagediv}>
            <Card style={cardmstyle}  elevation={5}>
              <CardMedia
                sx={{ minHeight:300, minWidth:300 }}
                image="https://img.freepik.com/free-vector/casserole-pot_1284-11444.jpg?w=740&t=st=1699072821~exp=1699073421~hmac=09a84f0275907c076cad9043bb06b31c66169f4f00190ac9691a2acbc6f32842"
                title="Foods"
              />
            </Card>
        </div>
    </div>
  );
}

export default Location