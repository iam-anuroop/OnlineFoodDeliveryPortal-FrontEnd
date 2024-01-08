import React, { useContext, useEffect, useState } from 'react';
import './DeliveryNotification.css'; 
import AuthContext from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const DeliveryNotification = () => {

  const { user,authTokens } = useContext(AuthContext)
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationsData, setnotificationsData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [hotellData, setHotellData] = useState({});
  const navigate = useNavigate()


  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setHotellData(
      detailsData.filter((item) => item.payment_id === notification.shooping_payment.id)[0]
    );
    
  };



  const fetchNotications = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/delivery/ordernotification/',
          {
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}` 
            },
          });
          console.log(response.data);
          setnotificationsData(response.data.notification)
          setDetailsData(response.data.shopping)
    }catch(error){
        console.log(error);
    }
  }

  const acceptRejectOrders = async (action) => {
    try{
      const response = await axios.post('http://127.0.0.1:8000/delivery/acceptrejectorders/',
          {
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}` 
            },
          });
          console.log(action);
    }catch(error){
        console.log(error);
    }
  }


useEffect(()=>{
    fetchNotications();
},[])

console.log(hotellData);

  return (
    <div className="delivery-notification-container">
      <div className="delivery-notification-header">
        <button className="delivery-notification-back-btn" onClick={()=>navigate('/deliveryhome')}>Back</button>
        <h1 className="delivery-notification-heading">Delivery Notification</h1>
      </div>

      <div className="delivery-notification-content">
        <div className="delivery-notification-list">
          {notificationsData.map((notification,index) => (
            <div
              key={notification.id}
              className={`delivery-notification-item ${selectedNotification?.id === notification.id ? 'selected' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <span>{index+1}.  {notification.shooping_payment.address}</span>
            </div>
          ))}
        </div>

        <div className="delivery-notification-details">
          {selectedNotification ? (
            <>
              <div className="delivery-notification-detail">
                <strong>Address:</strong> {selectedNotification.shooping_payment.address}
              </div>
              <div className="delivery-notification-detail">
                <strong>Hotel:</strong> {hotellData.item.hotel.hotel_name}
              </div>
              <div className="delivery-notification-detail">
                <strong>Ordered Time:</strong> {hotellData.date}
              </div>
              <div className="delivery-notification-detail">
                <strong>Hotel Location:</strong> {hotellData.item.hotel.address}
              </div>
              <div className="delivery-notification-items">
                <h4>Items</h4>
                <div>
                {detailsData.map((item)=>(
                  item.payment_id===selectedNotification.shooping_payment.id&&
                  <div key={item.id}>{item.item.food_name}</div>
                  
                  ))}
                </div>
              </div>
              <div style={{display:'flex'}}>
              <button className='accept-delivery-btn' onClick={()=>acceptRejectOrders(true)}>Accept</button>
              <button className='reject-delivery-btn' onClick={()=>acceptRejectOrders(false)}>Reject</button>
              </div>
            </>
          ) : (
            <div className="delivery-notification-no-selection">Select a notification to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotification;
