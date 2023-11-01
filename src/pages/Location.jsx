import React, { useState } from 'react'
import axios from 'axios';

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
    <div>
      <button onClick={getLocation}>Get Current Location</button>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Client IP: {location.client_ip}</p>
          <p>IP Type: {location.ip_type}</p>
        </div>
      )}
    </div>
  );
}

export default Location