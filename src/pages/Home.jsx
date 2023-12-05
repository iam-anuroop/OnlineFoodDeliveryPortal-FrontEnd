import React, { useContext, useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'
import './Home.css'



function Home() {
  const navigate = useNavigate()
  const [hotels,setHotels] = useState([])
  const { user,authTokens } = useContext(AuthContext)
  const base_url = 'http://127.0.0.1:8000/'


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
      console.log(response.data);
      setHotels(response.data)
    } catch (error) {
      console.error('Data fetching failed:', error);
    }
  };


  const hotelFoods = (id) => {
    navigate(`foods/${id}`)
  }

  // const AddToCart = async(item) => {
  //     const cart = {}
  //     cart[item.id] = 1
  //     console.log(cart);
  //     console.log([cart]);
  //     // const cart = currentCart.length > 0 ? currentCart : [{ [item.id]: 1 }];
  //     try {
  //       const response = await axios.post('http://127.0.0.1:8000/user/addtocart/',
  //         { 
  //           cart:[cart]
  //         },{
  //           headers:{
  //             'Content-Type':'application/json',
  //             'Authorization': `Bearer ${authTokens.token.access}`
  //           },
  //         });
  //         console.log(response);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   }
  


  // const localCart = (item) => {
  //   delete item.hotel;
  //   const cart = localStorage.getItem('cart');
  //   if (cart) {
  //     const currentCart = JSON.parse(cart);
  //     const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
  
  //     if (existingItemIndex !== -1) {
  //       const x = window.confirm("Item Alredy in cart You need to add this item again")
  //       console.log(x);
  //       if(x){
  //         currentCart[existingItemIndex].count += 1;
  //       }else{
  //         console.log('canceled');
  //       }
  //       // if(currentCart[existingItemIndex].count<1){
  //       //   currentCart.splice(existingItemIndex,1)
  //       // }
  //     } else {
  //       item.count = 1;
  //       currentCart.push(item);
  //     }
  //     localStorage.setItem('cart', JSON.stringify(currentCart));
  //   } else {
  //     item.count = 1;
  //     localStorage.setItem('cart', JSON.stringify([item]));
  //   }
  // }
  
  
  useEffect(() => {
    nearestHotel();
  }, []);



  // {foods.map((item)=>(
  //   <div key={item.id}>
  //     <h4 style={{color:'black'}}>{item.food_name}</h4>
  //     <button onClick={()=>!user?AddToCart(item):localCart(item)} style={{background:'green'}}>Add to cart</button>
  //   </div>
  // ))}
  const items = [
    {
      name:'Biriyani',
      photo:'https://img.freepik.com/premium-photo/nasi-biryani-briyani-is-rice-cooked-with-spices-vegetables-meat-from-india-ai-generated_404742-1402.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'
    },
    {
      name:'Fried Chicken',
      photo:'https://img.freepik.com/premium-photo/fried-chicken-legs-isolated-white-background_79161-405.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'
    },
    {
      name:'Pizza',
      photo:'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'
    },
    {
      name:'Burger',
      photo:'https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=sph'
    },
    {
      name:'Shawarma',
      photo:'https://img.freepik.com/free-photo/pita-stuffed-with-chicken-peppers_2829-17826.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'
    },
    {
      name:'Fries',
      photo:'https://img.freepik.com/free-photo/fried-chicken-french-fries-white-plate_74190-2598.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'
    },
    {
      name:'Ice Creams',
      photo:'https://img.freepik.com/free-photo/blueberry-ice-cream-scoop_123827-21551.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'
    },
    {
      name:'Juices',
      photo:'https://img.freepik.com/free-photo/fresh-watermelon-juice-with-ice-isolated-white-background_123827-21826.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais'
    }
]

  return (
    <div>
      <Header/>
      <div>
        <center className="home-food-verity-container-main-div">
          <div className="home-food-verity-container">
          {items.map((item, index) => (
            <div key={index} className="home-food-verity-item">
              <img src={item.photo} alt={item.name} className="home-food-verity-img" />
              <div className="home-food-verity-name">{item.name}</div>
            </div>
          ))}
          </div>
        </center>

        <div className="home-card-container">
          {hotels.map((item) => (
            <div key={item.id} className="home-card" onClick={()=>hotelFoods(item.id)}>
              <img src={`${base_url+item.profile_photo}`} alt={item.hotel_name} className="home-card-img" />
              <div className="home-card-details">
                <div className="home-card-title">{item.hotel_name}</div>
                <div className="home-card-description"> {item.description}</div>
                <div className="home-card-rating"><i className="fa-solid fa-star"></i> {item.rating}</div>
                <div className="home-card-location">{item.address}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home