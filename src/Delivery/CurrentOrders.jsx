import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import AuthContext from '../Context/AuthContext'


const CurrentOrders = () => {
  const { user,authTokens } = useContext(AuthContext)


  const fetchCurrentOrders = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/delivery/currentorders/',
          {
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}` 
            },
          });
          console.log(response.data);
    }catch(error){
        console.log(error);
    
    }
  }

  useEffect(()=>{
    
    fetchCurrentOrders();

  },[])

  return (
    <div>CurrentOrders</div>
  )
}
  

export default CurrentOrders