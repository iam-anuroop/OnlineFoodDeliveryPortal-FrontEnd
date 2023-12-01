import React, { useContext, useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import HotelSidebar from '../Sidebar/HotelSidebar'


function ManageFood() {
  const { authTokens } = useContext(AuthContext);
  const [foodData, setFoodData] = useState({
    food_name: '',
    food_image: null,
    food_type: '',
    description: '',
    food_price: '',
    offer_price: '',
    is_veg: false,
  });

  const handleChange = (event) => {
    setFoodData({ ...foodData, [event.target.name]: event.target.value });
  };

  const handleSwitchChange = () => {
    setFoodData({ ...foodData, is_veg: !foodData.is_veg });
  };

  const handleImageChange = (event) => {
    setFoodData({ ...foodData, food_image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiEndpoint = 'http://127.0.0.1:8000/hotel/food/';

      const formData = new FormData();
      formData.append('food_name', foodData.food_name);
      formData.append('food_image', foodData.food_image);
      formData.append('food_type', foodData.food_type);
      formData.append('description', foodData.description);
      formData.append('food_price', foodData.food_price);
      formData.append('offer_price', foodData.offer_price);
      formData.append('is_veg', foodData.is_veg);

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authTokens.token.access}`,
        },
      });

      console.log('Data posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  return (
    <div style={{display:'flex'}}>
      <HotelSidebar/>
    <div>
      <h3>ManageFood</h3>
      <form onSubmit={handleSubmit}>
        <input
          style={{ border: '1px solid black' }}
          type="text"
          placeholder="Name of Food"
          name="food_name"
          value={foodData.name}
          onChange={handleChange}
        />
        <input type="file" accept="image/*" onChange={handleImageChange}/>
        <input
          style={{ border: '1px solid black' }}
          type="text"
          placeholder="Type of Food"
          name="food_type"
          value={foodData.food_type}
          onChange={handleChange}
        />
        <input
          style={{ border: '1px solid black' }}
          type="text"
          placeholder="Details of food"
          name="description"
          value={foodData.description}
          onChange={handleChange}
        />
        <input
          style={{ border: '1px solid black' }}
          type="text"
          placeholder="Actual price"
          name="food_price"
          value={foodData.food_price}
          onChange={handleChange}
        />
        <input
          style={{ border: '1px solid black' }}
          type="text"
          placeholder="offer price"
          name="offer_price"
          value={foodData.offer_price}
          onChange={handleChange}
        />
        <Switch
          checked={foodData.is_veg}
          onChange={handleSwitchChange}
          name="is_veg"
          color="primary"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default ManageFood;
