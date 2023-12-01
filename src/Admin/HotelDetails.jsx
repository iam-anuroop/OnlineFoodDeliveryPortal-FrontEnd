import React, { useState } from 'react';
import './HotelDetails.css';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const HotelDetails = ({ hotel }) => {
  const base_url = 'http://127.0.0.1:8000/';
  const [showHotelCertifiacte,setShowHotelCertifiacte] = useState(false)
  const [showUserCertifiacte,setShowUserCertificate] = useState(false)


  const modalstyle = {
    'display':'flex',
    'alignItems':'center',
    'justifyContent':'center',
    'backDropFilter':'blur(10px)'
  }

  return (
    <div className="admin-selected-hotel-details-container">
      <div className="admin-selected-hotel-details-hotel-section">
        <div className="admin-selected-hotel-details-hotel-image">
          <img
            src={`${base_url + hotel.profile_photo}`}
            alt={hotel.hotel_name}
            className="admin-selected-hotel-image"
          />
        </div>
        <div className="admin-selected-hotel-details-hotel-info">
          <h2 className="admin-selected-hotel-name">{hotel.hotel_name}</h2>
          <p className="admin-selected-hotel-email">Email: {hotel.email}</p>
          <p className="admin-selected-hotel-contact">Contact: {hotel.contact}</p>
          <p className="admin-selected-hotel-alt-contact">Alternate Contact: {hotel.alt_contact}</p>
          <p className="admin-selected-hotel-description">Description: {hotel.description}</p>
          <p className="admin-selected-hotel-address">Address: {hotel.address}</p>
          <p className="admin-selected-hotel-location">Location: {hotel.city}, {hotel.state}, {hotel.country}</p>
          {/* Additional details */}

          <button className='show-certificate-btn' onClick={()=>setShowHotelCertifiacte(!showHotelCertifiacte)}>See proof</button>
          
          {showHotelCertifiacte&&
          <Modal
          open={showHotelCertifiacte}
          onClose={()=>setShowHotelCertifiacte(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={modalstyle}
          className='modal-otp-verify'
          >
            <Box>
              <img
              src={`${base_url + hotel.certificate}`}
              alt={hotel.hotel_name}
              className="admin-selected-hotel-certificate"
              />
            </Box>

          </Modal>
          }
        </div>
      </div>
      <div className="admin-selected-hotel-details-owner-section">
        <h3 className="admin-selected-hotel-owner-heading">Owner Details</h3>
        {hotel.owner ? (
          <div className="admin-selected-hotel-owner-details">
            <p className="admin-selected-hotel-owner-name">
              Name: {hotel.owner.first_name} {hotel.owner.last_name}
            </p>
            <p className="admin-selected-hotel-owner-email">Email: {hotel.owner.email}</p>
            <p className="admin-selected-hotel-owner-contact">Contact: {hotel.owner.contact}</p>
            <div className="admin-selected-hotel-owner-id-proof">
              <button className='show-certificate-btn' onClick={()=>setShowUserCertificate(true)}>See proof</button>
              
          {showUserCertifiacte&&
          <Modal
          open={showUserCertifiacte}
          onClose={()=>setShowUserCertificate(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={modalstyle}
          className='modal-otp-verify'
          >
            <Box>
              <img
                src={`${base_url + hotel.owner.id_proof}`}
                alt="ID Proof"
                className="admin-selected-id-proof"
              />
            </Box>

          </Modal>
          }

            </div>
            <p className="admin-selected-hotel-owner-id-number">ID Number: {hotel.owner.id_number}</p>
          </div>
        ) : (
          <p className="admin-selected-hotel-no-owner-details">
            No owner details available
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
