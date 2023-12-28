import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import Header from '../Navbar/Header';
import './Myorders.css'
import { useNavigate } from 'react-router-dom';


function Myorders() {
  const [orders,setOrders] = useState([])
  const { user,authTokens } = useContext(AuthContext)
  const base_url = 'http://127.0.0.1:8000/media/'

  const navigate = useNavigate()



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
              response.data.forEach(item => {
                console.log(`${base_url}${item.hotel_image}`);
              });
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
        <h3 className='my-orders-heading' >Your Orders</h3>
        <div className='my-orders-second-div'>
            {orders&&
            orders.map((item)=>(
              <div key={item.id} className="my-orders-item">
              <img src={`${base_url}${item.hotel_image}`} alt="Profile photo" className="my-orders-image" />
        
              <div className="my-orders-details">
                <div className="my-orders-hotel-name">{item.first_shopping_hotel_name}</div>
                <div className="my-orders-total-amount">${item.total_amount}</div>
                <button onClick={()=>navigate(`/manageorder/${item.id}`)} className="my-orders-details-button" >
                  Details
                </button>
              </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Myorders