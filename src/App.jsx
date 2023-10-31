import { createContext, useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import EmailAuth from './Authentication/EmailAuth'
import OtpVerify from './Authentication/OtpVerify'
import Home from './pages/home'
import Location from './pages/Location'


function App() {
  const AuthContext = createContext()
  const [token,setToken] = useState('')



  const context = {
    token,setToken

  }
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
