import React from 'react'
import './AdminHome.css'
import HotelSidebar from '../Sidebar/HotelSidebar'


function AdminHome() {
  return (
    <div className='admin-home-main-div'>
        <HotelSidebar/>
        <div className="admin-home-second-div">
            <div style={{padding:'1%'}}>
            <h3 className='admin-home-heading'>Admin Panel</h3>
            </div>
            <div className="admin-home-third-div">
                <div className="admin-home-content-div1">
                    <div className="admin-home-hotels-card-div">
                        <img src="https://img.freepik.com/free-vector/pizza-restaurant-concept-illustration_114360-16775.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <div className='hotel-additional-div'>
                           <h5>hotels</h5> 
                           <br/>
                           <p>These page will navigate to<br/>
                           the listed hotels page.</p>
                        </div>
                    </div>
                    <div className="admin-home-users-card-div">
                        <img src="https://img.freepik.com/free-vector/new-team-members-concept-illustration_114360-7721.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <div className="users-additional-div">
                            <h5>Users</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the listed users page.</p>
                        </div>
                    </div>
                    <div className="admin-home-growth-card-div">
                        <img src="https://img.freepik.com/free-vector/holding-arrow-concept-illustration_114360-8866.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <div className="growth-additional-div">
                            <h5>Growth</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the Growth Details page.</p>
                        </div>
                    </div>
                </div>
                <div className="admin-home-content-div2">
                    <div className="admin-home-hotelrequest-card-div">
                        <img src="https://img.freepik.com/free-vector/accept-request-concept-illustration_114360-2964.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <div className="new-hotel-additional-div">
                            <h5>New Hotels</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the Accept hotel page.</p>
                        </div>
                    </div>
                    <div className="admin-home-hoteleditrequest-card-div">
                        <img src="https://img.freepik.com/free-vector/grammar-correction-concept-illustration_114360-16001.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <div className="edit-hotel-additional-div">
                            <h5>Edit request</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the edit hotel page.</p>
                        </div>
                    </div>
                    <div className="complaints-additional-div">
                        <img src="https://img.freepik.com/free-vector/active-support-concept-illustration_114360-528.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <div className="admin-home-complaint-name-div">
                            <h5>Complaints</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the Complaint page.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminHome