import React, { useState ,useEffect } from 'react'
import axios from 'axios';
import EmailAuth from '../Authentication/EmailAuth';
// import Card from '@mui/material/Card';
// import { CardMedia, Input, Paper } from '@mui/material';
// import Button from '@mui/material/Button';
import './Location.css'
import { useNavigate } from 'react-router-dom';


const textArray = ['Lazy to cook?', 'Hungry..?', 'Movie Time..?','Gaming mood.?'];

function Location() {
  const [location, setLocation] = useState(null);
  const [textIndex, setTextIndex] = useState(0)
  const [availableLoc,setAvailableLoc] = useState([])
  const [serchResult,setSerchResult] = useState(false)
  const navigate = useNavigate()


  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.post('http://127.0.0.1:8000/user/currentloc/');
          setLocation(response.data);
          localStorage.setItem('location',JSON.stringify(response.data))
          navigate('/home')
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      });
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  };


  const handleLocationSearch = async(e) =>{
    try{
      if(e.length>0){
        setSerchResult(true)
      }else{
        setSerchResult(false)
      }
      const response = await axios.get(`http://127.0.0.1:8000/pages/searchlocation/?q=${e}`)
      const data = response.data
      if (response.status==200){
        console.log(data);
        setAvailableLoc(data)
      }
    }catch(error){
      console.error(error);
    }

  }


  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3000); 
    return () => {
      clearInterval(interval); 
    };
  }, []);

 

  
  return (
    <div className='location-main-div'>
        <div className='location-second-div'>
          <div className='location-left-div'>
            <div className='login-button-div'>
                <EmailAuth/>
            </div>
            <div className="website-logo-div">
              <h2 className='website-logo-h2'>Food Delivery</h2>
            </div>
            <div className='location-inptex-div'>
              <div className="location-text-div">
                <div className='rotating-text'>
                  <div>
                    <h3 className='rotating-text-h3'>{textArray[textIndex]}</h3>
                  </div>
                  <div style={{display:'flex',justifyContent:'left'}}>
                    <p className='p-tag-reason'>Order food from favourite restaurants near you.</p>
                  </div>
                </div>
              </div>
              <div className='locaion-input-div'>
                  <div className="inputloc-div">
                    <input onChange={(e)=>handleLocationSearch(e.target.value.trim())} className='input-location' placeholder='Enter your location' type="text" />
                    <div className='loc-iconspan-div' onClick={getLocation}>
                      <i className="loc-icon fa-solid fa-location"></i><span className='span-location'>Locate me</span>
                    </div>
                    <button className='Ready-to-eat'>Ready to eat</button>
                  </div>
                  {serchResult&&<div className='loacation-search-result-div'>
                    <div>
                        {availableLoc.map((loc)=>(
                          <div>
                            <h6>{loc.city},</h6>
                            <p>{loc.city}, {loc.district}, {loc.state}</p>
                          </div>
                        ))}
                    </div>
                  </div>}
              </div>
            </div>
          </div>
          <div className='location-right-div'>
            <div className="location-image-div">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <div className="location-advertice-div">
          <div className="first-img-div">
            <div>
              <img className='first-img' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf" alt="" />
              <div className="first-text-div">
                <h3>No Minimum Order</h3>
                <p>Order in for yourself or for the group,<br /> with no restrictions on order value</p>
              </div>
            </div>
          </div>
          <div className="second-img-div">
            <div>
              <img className='second-img' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy" alt="" />
              <div className="second-text-div">
                <h3>Live Order Tracking</h3>
                <p>Know where your order is at all times,<br /> from the restaurant to your doorstep</p>
              </div>
            </div>
          </div>
          <div className="third-img-div">
            <div>
              <img className='third-img' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn" alt="" />
              <div className="third-text-div">
                <h3>Lightning-Fast Delivery</h3>
                <p>Experience Swiggy's superfast delivery <br /> for food delivered fresh & on time</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Location