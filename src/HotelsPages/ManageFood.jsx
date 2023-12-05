import React, { useContext, useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import HotelSidebar from '../Sidebar/HotelSidebar'
import './ManageFood.css'


function ManageFood() {
  const { authTokens } = useContext(AuthContext);
  const [foodData, setFoodData] = useState({
    food_name: '',
    food_image: null,
    food_type: 'main',
    description: '',
    food_price: '',
    offer_price: '',
    is_veg: false,
  });

  const handleChange = (event) => {
    setFoodData({ ...foodData, [event.target.name]: event.target.value });
    console.log(foodData);
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
    <div style={{display:'flex',width:'100%'}}>
      <HotelSidebar/>
    <div style={{width:'100%'}}>
    <div style={{width:'100%'}}>
      <div className="manage-food-double-div">
        <div className="food-manage-form-div">
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Dish Name</label>
            <input
              style={{ border: '1px solid black' }}
              type="text"
              placeholder="Name of Food"
              name="food_name"
              value={foodData.name}
              onChange={handleChange}
            />
            <label htmlFor="">Image of Dish</label>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            <label htmlFor="">Type</label>
            <select
              className='select-type-food'
              id="food_type"
              name="food_type"
              value={foodData.food_type}
              onChange={handleChange}
            >
              <option value="main">Main Course</option>
              <option value="starter">Starter</option>
              <option value="bev">Beverage</option>
              <option value="desert">Dessert</option>
            </select>
            <label htmlFor="">Details</label>
            <input
              style={{ border: '1px solid black' }}
              type="text"
              placeholder="Details of food"
              name="description"
              value={foodData.description}
              onChange={handleChange}
            />
            <label htmlFor="">Orginal Price</label>
            <input
              style={{ border: '1px solid black' }}
              type="text"
              placeholder="Actual price"
              name="food_price"
              value={foodData.food_price}
              onChange={handleChange}
            />
            <label htmlFor="">Offer Price</label>
            <input
              style={{ border: '1px solid black' }}
              type="text"
              placeholder="offer price"
              name="offer_price"
              value={foodData.offer_price}
              onChange={handleChange}
            />
            <label htmlFor="">Acivate if Dish is Vegitable</label>
            <Switch
              checked={foodData.is_veg}
              onChange={handleSwitchChange}
              name="is_veg"
              color="primary"
            />
            <button type="submit">Add food</button>
          </form>
        </div>
        <div className="food-manage-card-div">
          <div className="food-manage-card">
              <img src={foodData.food_image?URL.createObjectURL(foodData.food_image):'https://img.freepik.com/free-vector/man-eating-pasta_1087-14.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'} alt={foodData.food_name} className="food-manage-card-img" />
              <div className="food-manage-card-details">
                <div className="food-manage-card-title">Name: {foodData.food_name?foodData.food_name:''}</div>
                <div className="food-manage-card-description">Details:  {foodData.description?foodData.description:''}</div>
                <div className="food-manage-card-rating">Price: {foodData.food_price?foodData.food_price:''}</div>
                <div className="food-manage-card-rating">Offer Price: {foodData.offer_price?foodData.offer_price:''}</div>
                <div className="food-manage-card-location">Type: {foodData.food_type?foodData.food_type:''}</div>
                <div className="food-manage-card-location">{foodData.is_veg?(<span><i style={{color:"green"}} className="fa-solid fa-leaf"></i> Veg</span>):(<span><i style={{color:"red"}} className="fa-solid fa-fish-fins"></i> Non veg</span>)}</div>
              </div>
          </div>
        </div>
      </div> 
    </div>
    </div>
    </div>
  );
}

export default ManageFood;
