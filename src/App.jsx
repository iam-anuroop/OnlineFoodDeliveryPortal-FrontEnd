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
import HotelPrivate from './Private/HotelPrivate'
import AdminPrivate from './Private/AdminPrivate'
import AccountSelector from './HotelsPages/AccountSelector'
import AdminHome from './Admin/AdminHome'
import AdminHotelList from './Admin/AdminHotelList'
import HotelLogin from './HotelsPages/HotelLogin'
import AdminNewHotel from './Admin/AdminNewHotel'
import HotelHome from './HotelsPages/HotelHome'
import Cart from './pages/Cart'
import ManageFood from './HotelsPages/ManageFood'
import FoodPage from './pages/FoodPage'
import Maps from './pages/Maps'
import FoodItems from './HotelsPages/FoodItems'
import DelliveryRegister from './Delivery/DelliveryRegister'
import Myorders from './UsersPages/Myorders'
import Manageorder from './UsersPages/Manageorder'
import DeliveryNotification from './Delivery/DeliveryNotification'
import DeliveryHome from './Delivery/DeliveryHome'
// stripe
import Payment from './pages/Payment'
import SuccessPage from './pages/SuccessPage'
// stripe



function App() {

  const [authTokens,setAuthTokens] = useState(()=>
  localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  )
  const [user,setUser] = useState(()=>
  localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).token.access) : null
  )
  const [hotelAuth, setHotelAuth] = useState(() => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  
    if (authTokens && authTokens.token && authTokens.token.access) {
      const decodedToken = jwtDecode(authTokens.token.access);
  
      if (decodedToken && decodedToken.hotel_email) {
        return decodedToken.hotel_email;
      }
    }
  
    return null;
  });
  
  // const [markerPosition, setMarkerPosition] = useState([ 11.0808,76.0702]);
  

  const context = {
    authTokens,setAuthTokens,
    user,setUser,
    hotelAuth,setHotelAuth,
    // markerPosition,setMarkerPosition,
  }

  // const isAuthenticated = localStorage.getItem('location');
  
  return (
    <div className='app'>

      <AuthContext.Provider value={context}>
        <Routes>
          <Route element={<Location/>} path='/'/>
          <Route element={<OtpVerify/>} path='/login'/>
          <Route element={<Home/>} path='/home'/>
          <Route element={<FoodPage/>} path='/home/foods/:id'/>
          <Route element={<Cart/>} path='/cart'/>
          <Route element={<Cart/>} path='/cart/:params'/>
          <Route element={<UserPrivate><Profile/></UserPrivate>} path='/profile'/>
          <Route element={<UserPrivate><UpdateProfile/></UserPrivate>} path='/update'/>
          <Route element={<UserPrivate><DelliveryRegister/></UserPrivate>} path='/delreg'/>
          <Route element={<UserPrivate><Myorders/></UserPrivate>} path='/myorders'/>
          <Route element={<UserPrivate><Manageorder/></UserPrivate>} path='/manageorder/:id'/>
          <Route element={<Sidebar/>} path='/bar'/>
          <Route element={<PhoneOtp/>} path='/phoneotp'/>
          <Route element={<UserPrivate><OwnerRegister/></UserPrivate>} path='/owner'/>
          <Route element={<UserPrivate><HotelRegister/></UserPrivate>} path='/hotelreg'/>
          <Route element={<UserPrivate><AccountSelector/></UserPrivate>} path='/acc'/>
          <Route element={<UserPrivate><HotelLogin/></UserPrivate>} path='/hotellogin'/>
          <Route element={<HotelPrivate><HotelHome/></HotelPrivate>} path='/hotelhome'/>
          <Route element={<HotelPrivate><ManageFood/></HotelPrivate>} path='/managefood'/>
          <Route element={<HotelPrivate><FoodItems/></HotelPrivate>} path='/fooditems'/>
          <Route element={<AdminPrivate><AdminHome/></AdminPrivate>} path='/admin'/>
          <Route element={<AdminPrivate><AdminHotelList/></AdminPrivate>} path='/adminhotellist'/>
          <Route element={<AdminPrivate><AdminNewHotel/></AdminPrivate>} path='/adminnewhotel'/>
          <Route element={<Payment/>} path='/payment/:address'/>
          <Route element={<SuccessPage/>} path='/success'/>
          <Route element={<Maps/>} path='/map/:address'/>
          <Route element={<DeliveryNotification/>} path='/deliverynotification'/>
          <Route element={<DeliveryHome/>} path='/deliveryhome'/>
        </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App
