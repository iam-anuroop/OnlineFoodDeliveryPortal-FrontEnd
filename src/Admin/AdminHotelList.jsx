import React, { useContext, useEffect, useState } from 'react'
import { toast} from 'react-toastify';
import axios from 'axios';
import AuthContext from '../Context/AuthContext'


function AdminHotelList() {
    const {authTokens } = useContext(AuthContext)
    const [hotels,setHotels] = useState([])

    const getHotels = async () => {

        try{
            const response = await axios.get('http://127.0.0.1:8000/adminpanel/adminapprovedhotels/',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.token.access}`
                }
            }
            )
            setHotels(response.data)
            console.log(response.data);
        }
        catch{
            console.log('Cant fetch user profile');
        }
    }

    useEffect(()=>{
        getHotels()
    },[]) 
  return (
    <div>
        {hotels.map((res)=>(
            <p key={res.id}>{res.hotel_name}</p>
        ))}
    </div>
  )
}

export default AdminHotelList