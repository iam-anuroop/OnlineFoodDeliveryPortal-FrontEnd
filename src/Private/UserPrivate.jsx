import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import { Navigate } from 'react-router-dom'

const UserPrivate = ({ children }) => {
  const {user} = useContext(AuthContext)
    return (
       <>
      {user? children : <Navigate to="/" />}
       </>
    )  };

export default UserPrivate