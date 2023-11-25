import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import { Navigate } from 'react-router-dom'



const AdminPrivate = ({children}) => {
    const {user} = useContext(AuthContext)
  return (
    <>
        {user.is_admin?children:<Navigate to={'/'}/>}
    </>
  )
}

export default AdminPrivate