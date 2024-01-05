import React from 'react'
import './DeliveryHome.css'


const DeliveryHome = () => {
  return (
    <div className='delivery-home-main'>
      <div className="delivery-home-second">
        <div className="delivery-home-heading">
          <div className="delivery-home-back-btn">
            <button>Back</button>
          </div>
          <div className='delivery-heading'>
            <h4>Work Area</h4>
          </div>
        </div>
        <div className="delivery-home-options-div">
          <div className="delivery-home-left">
            <div className="delivery-home-left-1">
              <div>
                New Notifications
              </div>
            </div>
            <div className="delivery-home-left-2">
              <div>
                current orders
              </div>
            </div>
          </div>
          <div className="delivery-home-right">
            <div className="delivery-home-right-1">
              <div>
                Work Details
              </div>
            </div>
            <div className="delivery-home-right-2">
              <div>
                others
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryHome