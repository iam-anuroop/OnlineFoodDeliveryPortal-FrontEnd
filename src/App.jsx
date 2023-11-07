import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AuthContext from './Context/AuthContext'
import OtpVerify from './Authentication/OtpVerify'
import Home from './pages/home'
import Location from './pages/Location'
import Profile from './UsersPages/Profile'
import UpdateProfile from './UsersPages/UpdateProfile'
import Sidebar from './Sidebar/Sidebar'



function App() {

  const [authTokens,setAuthTokens] = useState(()=>
  localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  )
  const [user,setUser] = useState(()=>
  localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).token.access) : null
  )

  const context = {
    authTokens,setAuthTokens,
    user,setUser,
  }

  // const isAuthenticated = localStorage.getItem('location');
  
  return (
    <div className='app'>

      <AuthContext.Provider value={context}>
        <Routes>
          <Route element={<Location/>} path='/'/>
          <Route element={<OtpVerify/>} path='/login'/>
          <Route element={<Home/>} path='/home'/>
          <Route element={<Profile/>} path='/profile'/>
          <Route element={<UpdateProfile/>} path='/update'/>
          <Route element={<Sidebar/>} path='/bar'/>
        </Routes>
      </AuthContext.Provider>

    </div>
  )
}

export default App
