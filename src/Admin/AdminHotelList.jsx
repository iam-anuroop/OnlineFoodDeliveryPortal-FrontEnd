import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

function AdminHotelList() {
  const { authTokens } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [pages, setPages] = useState([]);

  const getHotels = async (num) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/adminpanel/adminapprovedhotels/?page=${num}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
      setHotels(response.data.data);
      setPages(response.data.page_count);
      console.log(response.data);
    } catch (error) {
      console.log('Can\'t fetch user profile');
    }
  };

  useEffect(() => {
    getHotels(1);
  }, []);

  

  return (
    <div>
      {hotels && hotels.map((res) => (
        <p key={res.id}>{res.hotel_name}</p>
      ))}
      {pages && pages.map((num) => (
        <div  key={num}>
        <button onClick={()=>getHotels(num)}><h1>{num}</h1></button>
        </div>
      ))}
    </div>
  );
}

export default AdminHotelList;
