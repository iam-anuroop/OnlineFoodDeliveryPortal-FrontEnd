import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import HotelDetails from './HotelDetails'
import './AdminHotelList.css'
import AdminSidebar from '../Sidebar/AdminSidebar'

function AdminNewHotel() {
  const { authTokens } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel,setSelectedHotel] = useState({})
  const base_url = 'http://127.0.0.1:8000/'


  const getHotels = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminpanel/adminhotel/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
      setHotels(response.data);
      setSelectedHotel(response.data[0])
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
    <div style={{display:'flex'}}>
      <AdminSidebar/>
      
    <div className='admin-hotel-list-main'>
    <div>
    <input className='search-hotel-hotel-list-admin-input' type="text" placeholder='Search hotels...' />
    <div className="admin-table-list-table-div">
    <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Hotels</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}  className={`${selectedHotel.id!=hotel.id?'admin-selected-hotel':'nothing'}`}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`${base_url+hotel.profile_photo}`}
                      alt=""
                      style={{ width: '65px', height: '65px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{hotel.hotel_name}</p>
                      <p className="text-muted mb-0">{hotel.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{display:'flex',flexDirection:'column',rowGap:'2px'}}>
                  <button type="button" className="approve-btn-hotel"
                  onClick={()=>approveHotel(hotel.email)}>
                    Approve
                  </button>
                  <button type="button" className="reject-btn-hotel">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        <div>
        <div>
        </div>
        <div className="hotel-details-div-main">
          <HotelDetails hotel={selectedHotel}/>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default AdminNewHotel;
