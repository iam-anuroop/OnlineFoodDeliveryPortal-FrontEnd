import React, { useContext } from 'react'
import Header from '../Navbar/Header'
import AuthContext from '../Context/AuthContext'

function Cart() {
  const { user,authTokens } = useContext(AuthContext)

  const fetchUserCart = async () => {
    try{

    }catch{
        
    }

  }


  return (
    <div>
        <Header/>
        <div><h1>Cart</h1></div>
    </div>
  )
}

export default Cart