import React, { useContext, useEffect, useState } from 'react'
import { toast} from 'react-toastify';
import axios from 'axios';
import AuthContext from '../Context/AuthContext'


function AdminHotelList() {
    const {authTokens } = useContext(AuthContext)
    const [hotels,setHotels] = useState('')

    const getHotels = async () => {

        try{
            const response = await axios.get('http://127.0.0.1:8000/user/profile/',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.token.access}`
                }
            }
            )
            setHotels(response.data.data)
        }
        catch{
            console.log('Cant fetch user profile');
        }
    }

    useEffect(()=>{
        getHotels()
    },[]) 
  return (
    <div>AdminHotelList</div>
  )
}

export default AdminHotelList