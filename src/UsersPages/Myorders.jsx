import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import Header from '../Navbar/Header';


function Myorders() {
  const [orders,setOrders] = useState([])
  const { user,authTokens } = useContext(AuthContext)


    const fetchUserOrder = async () => {
        try{
          const response = await axios.get('http://127.0.0.1:8000/user/allorders/',
              {
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${authTokens.token.access}` 
                },
              });
              console.log(response);
              setOrders(response.data)
        }catch(error){
            console.log(error);
        }
      }


      useEffect(()=>{
        fetchUserOrder();
      },[])

  return (
    <div>
        <Header/>
        <div>
            {orders&&
            orders.map((item)=>(
                <div key={item.id}>
                    <h1>{item.first_shopping_hotel_name}</h1>
                    <h1>{item.stripe_id}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Myorders