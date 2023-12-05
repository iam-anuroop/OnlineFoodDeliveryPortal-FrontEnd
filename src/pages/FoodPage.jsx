import React, { useContext, useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'



function FoodPage() {

    const {id} = useParams()
    console.log(id,'iddddd');
    const navigate = useNavigate()
    const [foods,setFoods] = useState([])
    const { user,authTokens } = useContext(AuthContext)
  
  
    const hotelFoods = async () => {
      try {
        const response = await axios.get(
            `http://127.0.0.1:8000/pages/hotelfoods/?id=${id}`
        );
        console.log('foods fetched successfully');
        console.log(response.data);
        setFoods(response.data)
      } catch (error) {
        console.error('Data fetching failed:', error);
      }
    };



    const localCart = (item, number) => {
        const cart = localStorage.getItem('cart');
      
        if (cart) {
          const currentCart = JSON.parse(cart);
      
          const currentHotelId = item.hotel.id; // replace 'hotelId' with the actual property of your item that holds the hotel ID
      
          if (currentCart[currentHotelId]) {
            const existingHotelCart = currentCart[currentHotelId];
            const existingItemIndex = existingHotelCart.findIndex((cartItem) => cartItem.id === item.id);
      
            if (existingItemIndex !== -1) {
              if (number === 1) {
                existingHotelCart[existingItemIndex].count += 1;
              } else if (number === -1) {
                existingHotelCart[existingItemIndex].count =  existingHotelCart[existingItemIndex].count - 1;
                if (existingHotelCart[existingItemIndex].count<1){
                    existingHotelCart.pop(existingItemIndex)
                }
              }
            } else {
                if (number===1){
                    existingHotelCart.push({ ...item, count: 1 });
                }
            }
          } else {
            // remove old hotel item and add new
            delete currentCart[Object.keys(currentCart)[0]]
            currentCart[currentHotelId] = [{ ...item, count: 1 }];
          }
          localStorage.setItem('cart', JSON.stringify(currentCart));
        } else {
          const newCart = { [item.hotel.id]: [{ ...item, count: 1 }] }; // replace 'hotelId' with the actual property of your item that holds the hotel ID
          localStorage.setItem('cart', JSON.stringify(newCart));
        }
      };
      
  


    const AddToCart = async(item,number) => {
        const cart = {}
        cart[item.id] = 1
        console.log(cart);
        console.log([cart]);
        // const cart = currentCart.length > 0 ? currentCart : [{ [item.id]: 1 }];
        try {
          const response = await axios.post('http://127.0.0.1:8000/user/addtocart/',
            { 
              hotel : item.hotel.id,
              item : item.id,
              count : number
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

    
    useEffect(() => {
        hotelFoods();
      }, []);

  return (
    <div>
        <h1>FoodPage</h1>
        {
            foods.map((item)=>(
                <div>
                    <h3>{item.food_name}</h3>
                    <h2 onClick={()=>user?AddToCart(item,1):localCart(item,1)}>+</h2>
                    <h2 onClick={()=>user?AddToCart(item,-1):localCart(item,-1)}>-</h2>
                </div>
            ))
        }
    </div>
  )
}

export default FoodPage