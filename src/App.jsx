import { createContext, useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import EmailAuth from './Authentication/EmailAuth'
import OtpVerify from './Authentication/OtpVerify'
import Home from './pages/home'
import Location from './pages/Location'
import { jwtDecode } from 'jwt-decode'



function App() {
  const AuthContext = createContext()

  const [authToken,setAuthToken] = useState(()=>
  localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  )
  // const x = JSON.parse(localStorage.getItem('authTokens'))
  // console.log(x.token.access);
  const [user,setUser] = useState(()=>
  localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).token.access) : null
  )
console.log(user,'userrrrrrrrrrr');

  const context = {
    authToken,setAuthToken,
    user,setUser,

  }

  // const isAuthenticated = localStorage.getItem('location');
  
  return (
    <div className='app'>
      <AuthContext.Provider value={context}>
        <Routes>
          <Route element={<Location/>} path='/'/>
          <Route element={<EmailAuth/>} path='/register'/>
          <Route element={<OtpVerify/>} path='/login'/>
          <Route element={<Home/>} path='/home'/>
        </Routes>
      </AuthContext.Provider>

    </div>
  )
}

export default App
