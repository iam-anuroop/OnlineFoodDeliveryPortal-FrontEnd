import React, { useContext, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import './DeliveryReg.css';
import Header from '../Navbar/Header';
import axios from 'axios';

const DelliveryRegister = () => {
  const { user, authTokens } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profile_photo: null,
    id_proof: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      await axios.post('http://127.0.0.1:8000/delivery/deliverypartner/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authTokens.token.access}`,
        },
      });

      console.log('Registration data submitted:', formData);
    } catch (error) {
      console.error('Error submitting registration data:', error);
    }
  };

  return (
    <div>
      <Header/>
    <div className="d-person-reg-container">
      <form className="d-person-reg-form" onSubmit={handleSubmit}>
        <h2 className="d-person-reg-title">Person Registration</h2>
        <div className="d-person-reg-input-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-person-reg-input-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-person-reg-input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-person-reg-input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-person-reg-input-group">
            <label htmlFor="profile_photo">Profile Photo:</label>
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              onChange={handleChange}
              // accept="image/*"
            />
          </div>
          <div className="d-person-reg-input-group">
            <label htmlFor="id_proof">ID Proof:</label>
            <input
              type="file"
              id="id_proof"
              name="id_proof"
              onChange={handleChange}
              // accept=".pdf, .jpg, .jpeg, .png"
            />
          </div>
        <button type="submit" className="d-person-reg-submit-btn">
          Register
        </button>
      </form>
    </div>
    </div>

  );
};

export default DelliveryRegister;
