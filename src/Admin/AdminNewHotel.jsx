import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

function AdminNewHotel() {
  const { authTokens } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);

  const getHotels = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminpanel/adminhotel/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
      setHotels(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Can\'t fetch user profile', error);
    }
  };

  const approveHotel = async (hotelEmail) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/adminpanel/adminhotel/',
        {
          hotel_email: hotelEmail
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.token.access}`
          }
        }
      );
      console.log(response);
      getHotels()
    } catch (error) {
      console.log('Can\'t approve hotel', error);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div>
      {hotels.map((res) => (
        <div key={res.id}>
          <h1>{res.hotel_name}</h1>
          <button onClick={() => approveHotel(res.email)}>Approve</button>
        </div>
      ))}
    </div>
  );
}

export default AdminNewHotel;
