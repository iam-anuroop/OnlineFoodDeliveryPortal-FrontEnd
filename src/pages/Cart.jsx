import React, { useContext, useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'
import './Cart.css'

function Cart() {
  const { user,authTokens } = useContext(AuthContext)
  const [cartitems,setCartItems] = useState([])
  const [currentAddress,setCurrentAddress] = useState([])

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

  useEffect(()=>{
    fetchUserCart()
  },[])


  

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
                      <p>{currentAddress.office_address?profile.office_address:'add your address'}</p>
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
                    <button>-</button>
                    <p>{item.cart_item_count}</p>
                    <button>+</button>
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