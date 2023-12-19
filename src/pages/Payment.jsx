import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../config/index";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import Header from '../Navbar/Header'



export default function Payment() {

  const [ pay,setPay ] = useState([])
  const [ total,setTotal ] = useState([])
  const { user,authTokens } = useContext(AuthContext)
  const base_url = 'http://127.0.0.1:8000/'

  


  const handleDetails = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/user/payment/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
  
      // Handle the response as needed
      console.log(response);
      setPay(response.data.hotel);
      setTotal(response.data.total.total_price);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(pay.total.total_price);
  

  const handleCheckOut = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/user/payment/',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.token.access}`
          }
        }
      );
  
      // Handle the response as needed
      console.log(response.data.url);
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }
    
    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
      handleDetails();
    }, []);

    
    console.log(pay.hotel_name);

  return (
    <div>
      <Header/>
    <section>
    <div className="product">
      <img
        src={`${base_url+pay.profile_photo}`}
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>{pay.hotel_name}</h3>
      {total&&<h5>${total}</h5>}
      </div>
    </div>
    <form onSubmit={handleCheckOut} >
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
  </div>

  );
}