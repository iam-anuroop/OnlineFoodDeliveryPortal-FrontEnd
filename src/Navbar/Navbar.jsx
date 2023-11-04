import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar-first-div'>
        <div className="navbar-second-div">
            <div className="navbar-logo">
                <p className="navbar-name">Food Hub</p>
            </div>
        </div>
        <div className="navbar-third-div">
            <div className="navbar-options-div">
                <ul className="navbar-options-list">
                    <li className="navbar-search-li">Search</li>
                    <li className="navbar-Offers-li">Offers</li>
                    <li className="navbar-cart-li">Cart</li>
                    <li className="navbar-profile-li">Profile</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar