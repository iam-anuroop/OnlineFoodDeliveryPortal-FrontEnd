import React, { useRef, useState } from 'react'
import axios from 'axios';
import EmailAuth from '../Authentication/EmailAuth';
import Card from '@mui/material/Card';
import { CardMedia, Input, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import './Location.css'



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

 

  
  return (
    <div className='location-main-div'>
        <div className='location-second-div'>
          <div className='location-left-div'>
            <div className='login-button-div'>
                <EmailAuth/>
            </div>
            <div className='locaion-input-div'>
                <button onClick={getLocation}>Get Current Location</button>
            </div>
          </div>
          <div className='location-right-div'>
            <div className="location-image-div">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <div className="location-advertice-div">
          <h1>advertisement</h1>
        </div>
    </div>
  );
}

export default Location