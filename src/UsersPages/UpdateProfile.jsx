import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import UpdateIcon from '@mui/icons-material/Update'; //endIcon={<UpdateIcon />}
import Stack from '@mui/material/Stack';



function UpdateProfile() {

    const { authTokens } = useContext(AuthContext)
    const [profile,setProfile] = useState('')
    const [newValue,setNewValue] = useState({
        username:'',
        alt_phone:'',
        user_address:''
    })

    // fetch the user to get the current data (data before update)
    const getprofile = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/user/profile/',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.token.access}`
                },
                data:{

                }
            }
            )
            setProfile(response.data.data);
        }
        catch{
            console.log('Cant fetch user profile');
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewValue({ ...newValue, [name]: value });
    }

    console.log(`Bearer ${authTokens.token.access}`);

    const update = async () => {
        try {
          const response = await axios('http://127.0.0.1:8000/user/profile/',{
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authTokens.token.access}` 
            },
            data: {
              username: newValue.username ? newValue.username : profile.username,
              userprofile: {
                alt_phone: newValue.alt_phone ? newValue.alt_phone : profile.userprofile.properties.alt_phone,
                user_address: newValue.user_address ? newValue.user_address : profile.userprofile.properties.user_address
              }
            }
          });
          console.log(response);
        } catch {
          console.log(`Can't update profile right now`);
        }
      }

    useEffect(()=>{
        getprofile()
    },[])

  return (
    <div>
        <h1>UpdateProfile</h1>
        {profile&&
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="username"
                    defaultValue={profile.username&&profile.username}
                    name='username'
                    onChange={handleChange}
                    />
                <TextField
                    required
                    id="outlined-required"
                    label="alt phone"
                    defaultValue={profile.userprofile.properties.alt_phone&&profile.userprofile.properties.alt_phone}
                    name='alt_phone'
                    onChange={handleChange}
                    />
                <TextField
                    required
                    id="outlined-required"
                    label="address"
                    defaultValue={profile.userprofile.properties.user_address&&profile.userprofile.properties.user_address}
                    name='user_address'
                    onChange={handleChange}
                    />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={update}>
                        Update
                    </Button>
                </Stack>
            </div>
        </Box>
        }


    </div>

  )
}

export default UpdateProfile