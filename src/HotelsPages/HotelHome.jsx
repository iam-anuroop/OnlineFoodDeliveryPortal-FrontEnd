import React from 'react';
import HotelSidebar from '../Sidebar/HotelSidebar';
import './HotelHome.css';
import { useNavigate } from 'react-router-dom';

function HotelHome() {
  const navigate = useNavigate()
  return (
    <div className="hotel-home-main-1">
      <HotelSidebar />
      <div className="hotel-home-main-2">
        <div className="hotel-home-container">
          <div className="hotel-home-item">
            <h2 className="hotel-home-heading">Orders</h2>
            <p className="hotel-home-description">Manage Your Orders.</p>
            <button className="hotel-home-button">Manage</button>
          </div>

          <div className="hotel-home-item"  onClick={()=>navigate('/managefood')}>
            <h2 className="hotel-home-heading">Add Food Items</h2>
            <p className="hotel-home-description">Manage Your Foods.</p>
            <button className="hotel-home-button">Manage</button>
          </div>

          <div className="hotel-home-item" onClick={()=>navigate('/fooditems')}>
            <h2 className="hotel-home-heading">Manage Food Items</h2>
            <p className="hotel-home-description">Manage the existing foods</p>
            <button className="hotel-home-button">Manage</button>
          </div>

          <div className="hotel-home-item" onClick={()=>navigate('/track')}>
            <h2 className="hotel-home-heading">Income & Payments</h2>
            <p className="hotel-home-description">Income And Payment Details</p>
            <button className="hotel-home-button">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelHome;
