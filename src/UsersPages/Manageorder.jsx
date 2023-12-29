import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Manageorder.css'
import Chat from '../Chat/Chat'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Header from '../Navbar/Header'


function Manageorder() {

    const {id} = useParams()
    const [chatVisible, setChatVisible] = useState(false);
    const [ payment,setPayment ] = useState({})
    const [ orders,setOrders ] = useState([])
    const navigate = useNavigate()
    const [deliveryStatus, setDeliveryStatus] = useState('on_the_way');

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
            setDeliveryStatus(response.data.delivery.status)
        }
        catch{
            console.log('Cant fetch user profile');

        }

    }


    const statusOptions = [
      { id: 1, name: 'ordered', label: 'Ordered' },
      { id: 2, name: 'purchasing', label: 'Purchasing' },
      { id: 3, name: 'on_the_way', label: 'On the way' },
      { id: 4, name: 'delivered', label: 'Delivered' },
    ];
  
    const getStatusClass = (status) => {
      if (status === deliveryStatus) {
        return 'active';
      } else if (statusOptions.findIndex((option) => option.name === deliveryStatus) > statusOptions.findIndex((option) => option.name === status)) {
        return 'completed';
      } else {
        return '';
      }
    };


      useEffect(()=>{
        fetchOrderDetails(id);
      },[])
    
      

    
      return (
        <div >
          <div className='manage-order-back-btn'>
            <i className="bck-btn-icon fa-solid fa-circle-arrow-left" onClick={()=>navigate('/myorders')}></i>
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
        <div className="manage-order-delivery-section">
        <h2 className="manage-order-section-title">Delivery Tracking</h2>
        <div className="manage-order-delivery-line">
          {statusOptions.map((status) => (
            <div key={status.id} className={`manage-order-status-point ${getStatusClass(status.name)}`}>
              <div>
              <div className={`tracking-line-div ${status.name === deliveryStatus ? 'active' : ''}`}></div>
              <i className={`fa-solid fa-circle ${status.name === deliveryStatus ? 'active' : ''}`}></i>
              <span className={`${status.name === deliveryStatus ? 'active' : ''}`}>{status.label}{}</span>
              </div>
            </div>
          ))}
        </div>
        </div>
          </div>
    
          <div className="manage-order-delivery-section">
            <h2 className="manage-order-section-title">Chat with Delivery boy</h2>
            {payment&&!payment.is_canceled&&payment.is_completed&&<button
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
        </div>
  )
}

export default Manageorder