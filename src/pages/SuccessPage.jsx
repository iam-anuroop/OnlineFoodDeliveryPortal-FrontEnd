import React, { useContext,useEffect } from 'react'
import AuthContext from "../Context/AuthContext";
import Header from '../Navbar/Header'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css'


function SuccessPage() {

const urlParams = new URLSearchParams(window.location.search);
const { user,authTokens } = useContext(AuthContext)
const navigate = useNavigate()


const sessionId = urlParams.get('session_id');

console.log('Session ID:', sessionId);

const savePaymentDetails = async() => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/user/success/?session_id=${sessionId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      }
    );

    // Handle the response as needed
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  savePaymentDetails()
},[])

  return (
    <div>
      <div className="order-completed-container">
      <div className="checkmark-icon">&#10003;</div>
      <h2 className="completion-text">Order Completed!</h2>
      <p className="navigate-text" onClick={()=>navigate('/home')}>
        Click here to go back to Home
      </p>
    </div>
    </div>
  )
}

export default SuccessPage