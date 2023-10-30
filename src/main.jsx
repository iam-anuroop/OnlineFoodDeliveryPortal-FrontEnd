import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import EmailAuth from './Authentication/EmailAuth.jsx'
import OtpVerify from './Authentication/OtpVerify.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <EmailAuth /> */}
    <OtpVerify />
    {/* <App /> */}
  </React.StrictMode>,
)
