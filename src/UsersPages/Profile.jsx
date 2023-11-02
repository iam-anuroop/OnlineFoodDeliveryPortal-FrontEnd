import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'

function Profile() {

    const { authTokens } = useContext(AuthContext)
    const [profile,setProfile] = useState('')


    const getprofile = async () => {

        try{
            const response = await axios.get('http://127.0.0.1:8000/user/profile/',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.token.access}`
                }
            }
            )
            setProfile(response.data.data)
        }
        catch{
            console.log('Cant fetch user profile');

        }

    }

    useEffect(()=>{
        getprofile()
    },[])
    
    console.log(profile);
  return (
    <div>
        <h1>YOUR PROFILE</h1>
        {profile.username&&<p>username: {profile.username}</p>}
        {profile.email&&<p>email: {profile.email}</p>}
        {profile.phone&&<p>phone: {profile.phone}</p>}
    </div>
  )
}

export default Profile