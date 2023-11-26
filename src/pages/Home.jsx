import React, { useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  const [foods,setFoods] = useState([])

  const nearestHotel = async () => {
    try {
      const loc = JSON.parse(localStorage.getItem('location'));
      if (!loc) {
        navigate('/');
      }
      console.log(loc.latitude, loc.longitude);
      const response = await axios.get('http://127.0.0.1:8000/pages/nearfood/', {
        params: {
          latitude: loc.latitude,
          longitude: loc.longitude,
        },
      });
      console.log('Data fetched successfully:', response.data);setFoods(response.data)
    } catch (error) {
      console.error('Data fetching failed:', error);
    }
  };


  const AddtoCart = (item) => {
    delete item.hotel
    const cart = localStorage.getItem('cart')
    if(cart){
      const currentCart = JSON.parse(cart);
      currentCart.push(item);
      localStorage.setItem('cart', JSON.stringify(currentCart));
    }else{
      localStorage.setItem('cart',JSON.stringify([item]))
    }
  }



  
  useEffect(() => {
    nearestHotel();
  }, []);


  return (
    <div>
      <Header/>
      <div>
        {foods.map((item)=>(
          <div key={item.id}>
            <h4 style={{color:'black'}}>{item.food_name}</h4>
            <button onClick={()=>AddtoCart(item)} style={{background:'green'}}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home