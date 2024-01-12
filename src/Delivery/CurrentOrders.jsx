import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import AuthContext from '../Context/AuthContext'
import '../pages/Cart.css'


const CurrentOrders = () => {
  const { user,authTokens } = useContext(AuthContext)
  const [orders, setOrders ] = useState([])


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
          setOrders(response.data)
    }catch(error){
        console.log(error);
    
    }
  }

  useEffect(()=>{
    
    fetchCurrentOrders();

  },[])

  return (
    <div>
        <button className='current-order-back-button'>back</button>
        <h3 className='my-orders-heading' >Pending Worker</h3>
        <div className='my-orders-second-div'>
            {orders&&
            orders.map((item,index)=>(
              <div key={item.id} className="my-orders-item">
              <div className="my-orders-image" style={{fontWeight:'bolder'}}>{index+1}</div>
              {/* <img src={`${base_url}${item.hotel_image}`} alt="Profile photo" className="my-orders-image" /> */}
        
              <div className="my-orders-details">
                <div className="my-orders-hotel-name">{item.shooping_payment.address}</div>
                <div className="my-orders-total-amount">${item.shooping_payment.total_amount}</div>
                <button  className="my-orders-details-button" >
                {/* onClick={()=>navigate(`/manageorder/${item.id}`)} */}
                  Details
                </button>
              </div>
            </div>
            ))}
        </div>
    </div>
  )
}
  

export default CurrentOrders