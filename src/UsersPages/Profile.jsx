import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Navbar from '../Navbar/Navbar'
import './Profile.css'
import { useNavigate } from 'react-router-dom'


function Profile() {

    const {authTokens } = useContext(AuthContext)
    const [profile,setProfile] = useState('')
    const navigate = useNavigate()



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

    const user_loaction =localStorage.getItem('location')&&JSON.parse(localStorage.getItem('location'))
    

    useEffect(()=>{
        getprofile()
    },[])   
    
    console.log(profile);
  return (
    <div className='profile-back-div'>
        <Navbar/>
        
        <div className="profile-main-div">
            <div className="profile-second-div">
                <div className="profile-content-div">
                    <div className="profile-content-head">
                        <div>
                        <h3>PROFILE</h3>
                        <h5>Hello {profile.username?profile.username:'Guest..!'}</h5>
                        </div>
                        <div>
                            <button style={{border:'2px solid #0077b6',padding:'2px',fontWeight:'bold'}} onClick={()=>navigate('/update')}>Edit Profile</button>
                        </div>
                    </div>

                    <div className="profile-content-details">
                        <h4>Username : {profile.username&&profile.username}</h4>
                        <h4>email : {profile.email&&profile.email}</h4>
                        <h4>location : {user_loaction.region},{user_loaction.city}</h4>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile