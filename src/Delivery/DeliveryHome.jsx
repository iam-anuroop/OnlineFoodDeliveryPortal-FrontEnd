import React, { useContext, useEffect, useState } from 'react'
import './DeliveryHome.css'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
// import { PieChart } from '@mui/x-charts/PieChart';



const DeliveryHome = () => {
  const { user,authTokens } = useContext(AuthContext)
  const navigate = useNavigate()
  const [not,setNot] = useState(0)



  const notificationNumber = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/delivery/ordernotification/',
          {
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}` 
            },
          });
          console.log(response.data);
          setNot((response.data.notification).length)
    }catch(error){
        console.log(error);
    }
  }

  useEffect(()=>{
    notificationNumber()
  },[])


console.log(not);
  return (
    <div className='delivery-home-main'>
      <div className="delivery-home-second">
        <div className="delivery-home-heading">
          <div className="delivery-home-back-btn">
            <button>Back</button>
          </div>
          <div className='delivery-heading' style={{border:'none'}}>
            <h4>Work Area</h4>
          </div>
        </div>
        <div className="delivery-home-options-div">
          <div className="delivery-home-left">
            <div className="delivery-home-left-1" onClick={()=>navigate('/deliverynotification')}>
              <div className='delivery-home-left-1-1' >
                <div style={{display:'flex',border:'none'}}>
                <div style={{border:'none'}}>
                  <h5>New Notifications</h5>
                  </div>
                  <div title={`you have ${not} notifications..`} className='not-span' style={{color:'whitesmoke'}}>{not}</div>
                </div>

              </div>
            </div>
            <div className="delivery-home-left-2" onClick={()=>navigate('/currentorders')}>
              <div className='delivery-home-left-2-2' >
              <div style={{border:'none'}}>
                <h5>current orders</h5>
              </div>
              </div>
            </div>
          </div>
          <div className="delivery-home-right">
            <div className="delivery-home-right-1">
              <div  className='delivery-home-right-1-1'>
                <h5>Work Details</h5>
              </div>
            </div>
            <div className="delivery-home-right-2">
              <div className='delivery-home-right-2-2'>
                <h5>others</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryHome