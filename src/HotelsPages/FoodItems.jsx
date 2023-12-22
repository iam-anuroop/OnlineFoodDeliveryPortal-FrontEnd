import React, { useContext, useEffect, useState } from 'react';
import HotelSidebar from '../Sidebar/HotelSidebar'
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import './FoodItem.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Switch from '@mui/material/Switch';


function FoodItems() {

  const { authTokens } = useContext(AuthContext);
  const [ foods,setFoods ] = useState([])
  const [selectedFood, setSelectedFood] = useState(null);
  const [editmode, setEditmode] = useState(false);


  const getFoods = async (num) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/hotel/food/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
      console.log(response.data.foods);
      setFoods(response.data.foods)
      } catch (error) {
      console.log('Can\'t fetch Hotels food');
    }
  };

  const searchFoods = async (q) => {
    try {
      if (q.length > 0) {
        const response = await axios.get(`http://127.0.0.1:8000/hotel/food/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.token.access}`
          },
          params: {
            q: q  // Add the query parameter here
          }
        });
  
        const data = response.data;
  
        if (response.status === 200) {
          console.log(response);
          setFoods(response.data)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleFoodSelect = (food) => {
    setSelectedFood(food);
  };
  


  useEffect(()=>{

    getFoods()

  },[])



  return (
    <div style={{display:'flex'}}>
      <HotelSidebar />
    <Container fluid className="food-item-main-1">
      <Row className="food-item-main-2">
        <Col md={4} className="food-list">
          {foods.map((food) => (
            <Card
              key={food.id}
              className={`food-item-card ${selectedFood && selectedFood.id === food.id ? 'selected' : ''}`}
              onClick={() => handleFoodSelect(food)}
             >
              <Card.Img style={{width:'50%'}} variant="top" src={food.food_image} className="food-item-image" />
              <Card.Body>
                <Card.Title className="food-item-title">{food.food_name}</Card.Title>
                <Card.Text className="food-item-price">Price: ${food.food_price}</Card.Text>
                <Card.Text className="food-item-price">Offer Price: ${food.offer_price}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={8} className="food-details">

          {selectedFood ? (
            <div>
              {!editmode?<>
              <img src={selectedFood.food_image} alt={selectedFood.food_name} className="food-details-image" />
              <h2 className="food-details-title">{selectedFood.food_name}</h2>
              <p className="food-details-price">Price: ${selectedFood.food_price}</p>
              <p className="food-details-price">Offer Price: ${selectedFood.offer_price}</p>
              <p className="food-details-type">Type: {selectedFood.veg ? 'Veg' : 'Non-Veg'}</p>
              <Button variant="primary" className="edit-button" onClick={() => setEditmode(!editmode)}>
                Edit
              </Button>
              </>:
              <form className='food-item-edit-form' >
              <label htmlFor="">Food name</label>
              <input className='food-item-edit-input' type="text" />
              <label htmlFor="">Food image</label>
              <input className='food-item-edit-input' type="file" />
              <label htmlFor="">Food price</label>
              <input className='food-item-edit-input' type="text" />
              <label htmlFor="">Food offer price</label>
              <input className='food-item-edit-input' type="text" />
              <label htmlFor="">Acivate if Dish is Vegitable</label>
              <Switch
                checked={true}
                onChange={true}
                name="is_veg"
                color="primary"
              />
              <Button variant="primary" className="edit-button" onClick={() => setEditmode(!editmode)}>
                submit
              </Button>
              </form>}
            </div>
          ) : (
            <p className="food-details-placeholder">Select a food item to view details</p>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default FoodItems