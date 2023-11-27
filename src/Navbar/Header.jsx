import React, { useContext, useState }  from 'react'
import AuthContext from '../Context/AuthContext'
import Sidebar from '../Sidebar/Sidebar'

import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Header() {

    const { user,authTokens } = useContext(AuthContext)
    const[showDrop,setShowDrop] = useState(false)
    const handleDrop = () =>setShowDrop(!showDrop)
    const navigate = useNavigate()

    const user_loaction =localStorage.getItem('location')&&JSON.parse(localStorage.getItem('location'))


  return (
    <div className='navbar-main-div'>
        <div className="navabr-second-div">
            <div className="navbar-logo-location-div">
                <div className="navabr-logo-div">
                    <div><h2 onClick={()=>navigate('/home')}>Food Delivery</h2></div>
                </div>
                <div>
                    <div className='navbar-location-div'>
                        {
                        user_loaction?(<a className="location-link nav-link" href="#">
                        <span style={{fontWeight:'bolder',borderBottom:'2px solid #03045e'}}>{user_loaction.city} </span>
                          {user_loaction.region} , {user_loaction.country} <i className="fa-solid fa-location"></i> 
                        </a>):
                        (<a className="location-link nav-link" href="#">
                        <i className="fa-solid fa-location-dot"></i> Location</a>)
                        }
                    </div>
                </div>
            </div>
            <div className="navbar-option-div">
                <ul className="navbar-option-ul">
                    <li className="navabar-ul-search-li">
                        <div className="search-li-div">
                            <span><span className='navbar-search-lense-icon'><i className="fa-solid fa-magnifying-glass"> </i> 
                            </span> Search</span>
                            <span> <input className='navbar-ul-search-input' type="text" /></span>
                        </div>
                    </li>
                    <li className="navbar-ul-offers-li">
                        <div className="offers-li-div">
                            <span><span><i className="fa-solid fa-gifts"></i> </span> Offers</span>
                        </div>
                    </li>
                    <li className="navbar-ul-cart-li">
                        <div className="cart-li-div" onClick={()=>navigate('/cart')}>
                             <span><span><i className="fa-solid fa-cart-shopping"></i> </span> Cart</span>
                        </div>
                    </li>
                    <li className="navbar-ul-sidebar-li">
                        <div className="sidebar-li-div">
                            <span><Sidebar /></span>
                        </div>
                    </li>
                    <li className="navbar-ul-dropdown-li">
                        <div className="dropdown-li-div">
                            <span><i className="fa-solid fa-bars" onClick={handleDrop}></i></span>
                            {showDrop&&<div className="navbar-dropdown-li-options-div">
                                <div className='navbar-drop-location-div'>
                                    {
                                    user_loaction?(<a className="location-link nav-link" href="#">
                                    <span style={{fontWeight:'bolder',borderBottom:'2px solid #03045e'}}>{user_loaction.city} </span>
                                      {user_loaction.region} , {user_loaction.country} <i className="fa-solid fa-location"></i> 
                                    </a>):
                                    (<a className="location-link nav-link" href="#">
                                    <i className="fa-solid fa-location-dot"></i> Location</a>)
                                    }
                                </div>
                                <div>Offer</div>
                                <div onClick={()=>navigate('/cart')}>Cart</div>
                                <div className='navbar-drop-search'>Search</div>
                                <div><Sidebar /></div>
                            </div>}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header