import React, { useContext } from 'react'
import './Navbar.css'
import AuthContext from '../Context/AuthContext'
import Sidebar from '../Sidebar/Sidebar'


function Navbar() {

    const { user,authTokens } = useContext(AuthContext)


    const user_loaction =localStorage.getItem('location')&&JSON.parse(localStorage.getItem('location'))
    console.log(user_loaction);


  return (
        <div>
            <nav className="navbarmain mb-1 navbar navbar-expand-lg navbar-dark info-color">
              <a className="navbar-brand" href="#">Food Delivery</a>
              <div className="nav-item">
                    {user_loaction?(<a className="location-link nav-link" href="#">
                    <i className="fa-solid fa-location"></i> {user_loaction.region},{user_loaction.city}</a>):
                    (<a className="location-link nav-link" href="#">
                    <i className="fa-solid fa-location-dot"></i> Location</a>)
                    }
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
                aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item"> 
                    <a className="nav-link" href="#">
                        <i className="fa-solid fa-magnifying-glass"> </i> Search
                      {/* <span className="sr-only">(current)</span> */}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                    <i className="fa-solid fa-gifts"></i> Offers</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                    <i className="fa-solid fa-cart-shopping"></i> Cart</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link " href='#'>
                      <i className="fas fa-user"></i> {user ? user.email.substring(0, 5) : "Profile"}</a>
                  </li>
                  <li className="nav-item" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px'}} >
                      <Sidebar />
                  </li>
                  
                </ul>
              </div>
            </nav>
        </div>
  )
}

export default Navbar