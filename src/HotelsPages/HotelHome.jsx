import React from 'react'
import HotelSidebar from '../Sidebar/HotelSidebar'
import ManageFood from './ManageFood'

function HotelHome() {
  return (
    <div style={{display:'flex'}}>
        <HotelSidebar/>
        <div>
            <h1>HotelHome</h1>
            <div><ManageFood/></div>
        </div>
    </div>
  )
}

export default HotelHome