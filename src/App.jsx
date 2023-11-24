import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AuthContext from './Context/AuthContext'
import OtpVerify from './Authentication/OtpVerify'
import Home from './pages/Home'
import Location from './pages/Location'
import Profile from './UsersPages/Profile'
import UpdateProfile from './UsersPages/UpdateProfile'
import Sidebar from './Sidebar/Sidebar'
import PhoneOtp from './Authentication/PhoneOtp'
import OwnerRegister from './HotelsPages/OwnerRegister'
import HotelRegister from './HotelsPages/HotelRegister'
import UserPrivate from './Private/UserPrivate'
import AccountSelector from './HotelsPages/AccountSelector'
import AdminHome from './Admin/AdminHome'
import AdminHotelList from './Admin/AdminHotelList'
import HotelLogin from './HotelsPages/HotelLogin'


function App() {

  const [authTokens,setAuthTokens] = useState(()=>
  localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  )
  const [user,setUser] = useState(()=>
  localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).token.access) : null
  )
  const [hotel, setHotel] = useState(() => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  
    if (authTokens && authTokens.token && authTokens.token.access) {
      const decodedToken = jwtDecode(authTokens.token.access);
  
      if (decodedToken && decodedToken.hotel_email) {
        return decodedToken.hotel_email;
      }
    }
  
    return null;
  });
  
  console.log(user, 'k');
  

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
          <Route element={<UserPrivate><Profile/></UserPrivate>} path='/profile'/>
          <Route element={<UserPrivate><UpdateProfile/></UserPrivate>} path='/update'/>
          <Route element={<Sidebar/>} path='/bar'/>   
          <Route element={<PhoneOtp/>} path='/phoneotp'/>
          <Route element={<UserPrivate><OwnerRegister/></UserPrivate>} path='/owner'/>
          <Route element={<UserPrivate><HotelRegister/></UserPrivate>} path='/hotelreg'/>
          <Route element={<AccountSelector/>} path='/acc'/>
          <Route element={<HotelLogin/>} path='/hotellogin'/>
          <Route element={<AdminHome/>} path='/admin'/>
        </Routes>
      </AuthContext.Provider>

    </div>
  )
}

export default App
