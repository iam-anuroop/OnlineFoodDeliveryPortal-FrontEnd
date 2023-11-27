import React, { useContext, useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'


function Home() {
  const navigate = useNavigate()
  const [foods,setFoods] = useState([])
  const { user,authTokens } = useContext(AuthContext)


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
      console.log('Data fetched successfully');
      setFoods(response.data)
    } catch (error) {
      console.error('Data fetching failed:', error);
    }
  };


  const AddToCart = async(item) => {
      const cart = {}
      cart[item.id] = 1
      console.log(cart);
      console.log([cart]);
      // const cart = currentCart.length > 0 ? currentCart : [{ [item.id]: 1 }];
      try {
        const response = await axios.post('http://127.0.0.1:8000/user/addtocart/',
          { 
            cart:[cart]
          },{
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}`
            },
          });
          console.log(response);
      }catch(error){
        console.log(error);
      }
    }
  


  const localCart = (item) => {
    delete item.hotel;
    const cart = localStorage.getItem('cart');
    if (cart) {
      const currentCart = JSON.parse(cart);
      const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].count += 1;
      } else {
        item.count = 1;
        currentCart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(currentCart));
    } else {
      item.count = 1;
      localStorage.setItem('cart', JSON.stringify([item]));
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
            <button onClick={()=>user?AddToCart(item):localCart(item)} style={{background:'green'}}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home