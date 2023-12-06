import React, { useContext, useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'
import './Cart.css'

function Cart() {
  const { user,authTokens } = useContext(AuthContext)
  const [cartitems,setCartItems] = useState([])
  const [currentAddress,setCurrentAddress] = useState([])
  const [cartChange,setCartchange] = useState(false)

  const fetchUserCart = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/user/addtocart/',
          {
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}`
            },
          });
          setCartItems(response.data.cart_food_items)
          setCurrentAddress(response.data.profile.properties)
          console.log(response.data.profile.properties.user_address);
    }catch(error){
        console.log(error);
    }
  }


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
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/addtocart/',
        { 
          hotel : item.hotel_id,
          item : item.id,
          count : number
        },{
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${authTokens.token.access}`
          },
        });
        console.log(response);
        setCartchange(!cartChange)
    }catch(error){
      console.log(error);
    }
  }



  useEffect(()=>{
    fetchUserCart()
  },[cartChange])


  

  return (
    <div>
      <Header />
      <div className="cart-main-div">
        <div className="cart-second-div">
          <div className="cart-third-div">
            <div className="cart-fourth-div">
              {/* Address Section */}
              <div className="cart-address-main-div">
                <div className="cart-address-sub-div">
                  <h2>Delivery Addresses</h2>
                  <div className='cart-address12-div'>
                    <div className="cart-address-1-div">
                      <h6>Home Address</h6>
                      <p>{currentAddress.user_address}</p>
                      <button>Edit</button>
                    </div>
                    <div className="cart-address-2-div">
                      <h6>Office Address</h6>
                      <p>{currentAddress.office_address?currentAddress.office_address:'add your address'}</p>
                      <button>{currentAddress.office_address?'Edit':'Add new'}</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="cart-payment-main-div">
                <h2>Payment</h2>
                {/* Add payment details here */}
              </div>
            </div>
            {/* Cart Items and Billing Details Section */}
            <div className="cart-fifth-div">
              <div className="cart-items-section">
                <h4>crat items</h4>
                {/* Display cart items here */}
                {cartitems.map((item) => (
                <div key={item.id} className='cart-items-map-div'>
                  <div className='cart-item-map-content'>
                    <p>{item.food_name}</p>
                  </div>
                  <div className='cart-number-inc-dec-btn-div'>
                    <center style={{display:'flex'}}>
                    <button onClick={()=>user?AddToCart(item,-1):localCart(item,-1)}>-</button>
                    <p>{item.cart_item_count}</p>
                    <button onClick={()=>user?AddToCart(item,1):localCart(item,1)}>+</button>
                    </center>
                  </div>
                </div>
                ))}
              </div>
              <div className="billing-details-section">
                <h2>Billing Details</h2>
                {/* Display billing details here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart