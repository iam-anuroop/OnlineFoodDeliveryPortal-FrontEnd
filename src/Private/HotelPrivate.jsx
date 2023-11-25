import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import { Navigate } from 'react-router-dom'



const HotelPrivate = ({children}) => {
    const {user,hotelAuth} = useContext(AuthContext)
  return (
    <>
        {user&&hotelAuth?children:<Navigate to={'/'}/>}
    </>
  )
}

export default HotelPrivate