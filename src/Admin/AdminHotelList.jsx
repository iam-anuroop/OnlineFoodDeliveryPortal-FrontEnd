import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import AdminSidebar from '../Sidebar/AdminSidebar'
import './AdminHotelList.css'
import HotelDetails from './HotelDetails';

function AdminHotelList() {
  const { authTokens } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentpage , setCurrentPage] = useState(1)
  const [selectedHotel,setSelectedHotel] = useState({})
  const base_url = 'http://127.0.0.1:8000/'


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
      setCurrentPage(num)
      setSelectedHotel(response.data.data[0])
      } catch (error) {
      console.log('Can\'t fetch Hotels profile');
    }
  };

  const searchHotel = async(q) => {
    try{
      if(q.length>0){
        const response = await axios.get(`http://127.0.0.1:8000/hotel/hotelsearch/?q=${q}`)
        const data = response.data
        if (response.status==200){
          setHotels(data)
       }
      }
    }catch(error){
      console.error(error);
    }
  }


  const getSpecificHotel = async(id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/hotel/hotelprofile/?id=${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
      setSelectedHotel(response.data);
    }catch(error){
      console.log(error);
    }
  }

  const handlePrevClick = () => {
    if (currentpage > 1) {
      getHotels(currentpage - 1);
      setCurrentPage(currentpage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentpage < pages.length) {
      getHotels(currentpage + 1);
      setCurrentPage(currentpage + 1)
    }
  };

  useEffect(() => {
    getHotels(1);
  }, []);


  return (
    <div style={{display:'flex'}}>
      <AdminSidebar/>
      
    <div className='admin-hotel-list-main'>
    <div>
    <input onChange={(e)=>searchHotel(e.target.value.trim())} className='search-hotel-hotel-list-admin-input' type="text" placeholder='Search hotels...' />
    <div className="admin-table-list-table-div">
    <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Hotels</th>
              <th>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item" onClick={handlePrevClick}>
                      <a className="page-link"  aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" onClick={handleNextClick}  aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} onClick={()=>getSpecificHotel(hotel.id)} className={`${selectedHotel.id!=hotel.id?'admin-selected-hotel':'nothing'}`}>
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
                <td>
                  <button type="button" className="btn btn-link btn-sm btn-rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        <div className="hotel-details-div-main">
          {selectedHotel&&<HotelDetails hotel={selectedHotel}/>}
        </div>
        
      </div>
    </div>
  );
}

export default AdminHotelList;
