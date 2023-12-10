import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../config/index";
import axios from "axios";
import AuthContext from "../Context/AuthContext";


export default function Payment() {

  
  const { user,authTokens } = useContext(AuthContext)
  console.log(authTokens.token.access);

  const handleCheckOut = async() =>{
    try{
      const response = await axios.post('http://127.0.0.1:8000/user/payment/',
          {
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}` 
            },
          });

    }catch(error){
      console.log(error);
    }
  }

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
  }, []);

  return (
    <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form onSubmit={handleCheckOut} >
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
  );
}