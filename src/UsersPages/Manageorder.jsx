import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Manageorder.css'
import Chat from '../Chat/Chat'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'


function Manageorder() {

    const {id} = useParams()
    const [chatVisible, setChatVisible] = useState(false);
    const [ payment,setPayment ] = useState({})
    const [ orders,setOrders ] = useState([])
    const { authTokens } = useContext(AuthContext)


    const fetchOrderDetails = async(pay_id) => {

        try{
            const response = await axios.get(`http://127.0.0.1:8000/user/orderdetails/?pay_id=${pay_id}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.token.access}`
                }
            }
            )
            console.log(response.data)
            setOrders(response.data.orders)
            setPayment(response.data.payment)
        }
        catch{
            console.log('Cant fetch user profile');

        }

    }


    const foodItems = [
        { id: 1, name: 'Burger', count: 2 },
        { id: 2, name: 'Pizza', count: 1 },
      ];


      useEffect(()=>{
        fetchOrderDetails(id);
      },[])
    

    
      return (
        <div className="manage-order-container">
          <div className="manage-order-food-list">
            <h2 className="manage-order-section-title">Food Items</h2>
            <ul className="manage-order-food-items">
              {orders.map((item) => (
                <li key={item.id} className="manage-order-food-item">
                  <div>
                    <div className="manage-order-food-name">{item.item.food_name}</div>
                    <div className="manage-order-food-count">Count: {item.quantity}</div>
                  </div>
                  <div className='manage-order-img-div'>
                    <img src={item.item.food_image} alt={item.item.food_name} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
    
          <div className="manage-order-delivery-section">
            <h2 className="manage-order-section-title">Chat with Delivery boy</h2>
            {payment&&!payment.is_canceled&&!payment.is_completed&&<button
            className="manage-order-chat-button"
            onClick={()=>setChatVisible(!chatVisible)}
            >
               {chatVisible?'Close chat':'Start Chat'}
            </button>}
    
            {chatVisible&&<div className="manage-order-chat-area">
              <Chat/>
            </div>}
          </div>
        </div>
  )
}

export default Manageorder