import React, { useContext, useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'
import './Home.css'
import './Foodpage.css'



function FoodPage() {

    const {id} = useParams()
    console.log(id,'iddddd');
    const navigate = useNavigate()
    const [foods,setFoods] = useState([])
    const [cartitems,setCartItems] = useState([])
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



      const getCartItems = async() => {
        try{
          const response = await axios.get('http://127.0.0.1:8000/user/addtocart/',
              {
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${authTokens.token.access}` 
                },
              });

              const cartItemIds = response.data.cart_food_items.map(item => item.id);

              setCartItems(cartItemIds);
        }catch(error){
            console.log(error);
        }
      }
      
  


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
      getCartItems();
        hotelFoods();
      }, []);


      // console.log(foods[0].hotel.hotel_name);
      
  return (
    <div>
      <Header/>
        <div className='food-page-hotel-heading'>
          <div>
          <h3>Foods of {foods.length>0&&foods[0].hotel.hotel_name}</h3>
          </div>
        </div>
        {
                <div className="home-card-container">
                {foods.map((item) => (
                  <div key={item.id} className="food-card" onClick={()=>hotelFoods(item.id)}>
                    <img src={item.food_image} alt={item.food_name} className="home-card-img" />
      
                    <div className="home-card-details">
                      <div className="home-card-title">{item.food_name}</div>
                      <div className="home-card-description">{item.description}</div>
                      <div style={{display:'flex',gap:'5%'}}>
                      <div className="home-card-location">
                        <span style={{textDecoration:'line-through'}} className="strike-through">${item.food_price}</span>
                      </div>
                      <div style={{color:'black',fontWeight:'bolder'}} className="home-card-location">${item.offer_price}</div>
                      </div>
                      {cartitems.includes(item.id)?(
                        <button className='food-page-already-in-cart'>Already in cart</button>
                        ):(
                      <button className='food-page-add-to-cart' onClick={()=>{
                        user?AddToCart(item,1):localCart(item,1);
                        setCartItems([...cartitems,item.id])
                      }}>Add to cart</button>
                    )
                      }
                    </div>
                  </div>
                ))}
              </div>
        }
    </div>
  )
}

export default FoodPage


                {/* <div>
                    <h3>{item.food_name}</h3>
                    <h2 onClick={()=>user?AddToCart(item,1):localCart(item,1)}>+</h2>
                    <h2 onClick={()=>user?AddToCart(item,-1):localCart(item,-1)}>-</h2>
                </div> */}