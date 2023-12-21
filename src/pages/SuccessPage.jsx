import React, { useContext,useEffect } from 'react'
import AuthContext from "../Context/AuthContext";
import Header from '../Navbar/Header'
import axios from "axios";


function SuccessPage() {

const urlParams = new URLSearchParams(window.location.search);
const { user,authTokens } = useContext(AuthContext)


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
    <div>{sessionId}</div>
  )
}

export default SuccessPage