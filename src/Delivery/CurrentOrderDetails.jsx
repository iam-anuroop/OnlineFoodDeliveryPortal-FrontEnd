import React, { useContext, useEffect, useState } from 'react'
import './CurrentOrderDetails.css'
import Chat from '../Chat/Chat';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';

const CurrentOrderDetails = () => {
    const { user, authTokens } = useContext(AuthContext);
    const {id,chat_id} = useParams()


    const [chatVisible, setChatVisible] = useState(false);
    const [ payment,setPayment ] = useState({})
    const [ orders,setOrders ] = useState([])
    
    const navigate = useNavigate()



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


      useEffect(()=>{
        fetchOrderDetails(id);
      },[])
    

  return (
    <div >
          <div className='manage-order-back-btn'>
            <i className="bck-btn-icon fa-solid fa-circle-arrow-left" onClick={()=>navigate('/currentorders')}></i>
          </div>
        <div className="manage-order-container">
          <div className="manage-order-second-div">
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
            <h5>Total amount : <span style={{color:'blue'}}>$ {payment.total_amount}</span></h5>
          </div>
          </div>
    
          <div className="manage-order-delivery-section">
            <h2 className="manage-order-section-title">Chat with Customer</h2>
            {payment&&!payment.is_canceled&&payment.is_completed&&<button
            className="manage-order-chat-button"
            onClick={()=>setChatVisible(!chatVisible)}
            >
               {chatVisible?'Close chat':'Start Chat'}
            </button>}
    
            {chatVisible&&<div className="manage-order-chat-area">
              <Chat chat_id={chat_id}/>
            </div>}
          </div>
        </div>
        </div>

  )
}

export default CurrentOrderDetails