import React, { useContext } from 'react'
import './Navbar.css'
import AuthContext from '../Context/AuthContext'


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
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-user"></i> {user ? user.email.substring(0, 5) : "Profile"}</a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                      <a className="dropdown-item" href="#">My account</a>
                      <a className="dropdown-item" href="#">Log out</a>
                    </div>
                  </li>
                  
                </ul>
              </div>
            </nav>
        </div>
  )
}

export default Navbar