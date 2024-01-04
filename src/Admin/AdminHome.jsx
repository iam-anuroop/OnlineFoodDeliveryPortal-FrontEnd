import React from 'react'
import './AdminHome.css'
import AdminSidebar from '../Sidebar/AdminSidebar'
import { useNavigate } from 'react-router-dom'


function AdminHome() {
    const navigate = useNavigate()
  return (
    <div className='admin-home-main-div'>
        <AdminSidebar/>
        <div className="admin-home-second-div">
            <div style={{padding:'1%'}}>
            <h3 className='admin-home-heading'>Admin Panel</h3>
            </div>
            <div className="admin-home-third-div">
                    <div className="admin-home-hotels-card-div" onClick={()=>navigate('/adminhotellist')}>
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
                    <div className="admin-home-delivery-card-div">
                        <img src="https://img.freepik.com/free-vector/pizza-delivery-concept-illustration_114360-16772.jpg?size=626&ext=jpg&ga=GA1.1.1114229135.1704264482&semt=ais" alt="" />
                        <div className="delivery-additional-div">
                            <h5>Dlivery Persons</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the listed delivery persons page.</p>
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
                    <div className="admin-home-hotelrequest-card-div" onClick={()=>navigate('/adminnewhotel')}>
                        <img src="https://img.freepik.com/free-vector/accept-request-concept-illustration_114360-2964.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <div className="new-hotel-additional-div">
                            <h5>Approve Hotels</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the Accept hotel page.</p>
                        </div>
                    </div>
                    <div className="admin-home-deliveryapprove-card-div">
                        <img src="https://img.freepik.com/free-vector/product-quality-control-abstract-concept_335657-3107.jpg?size=626&ext=jpg&ga=GA1.1.1114229135.1704264482&semt=sph" alt="" />
                        <div className="deliveryapprove-additional-div">
                            <h5>Approve Workers</h5>
                           <br/>
                           <p>These page will navigate to<br/>
                           the workers approving page.</p>
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
  )
}

export default AdminHome