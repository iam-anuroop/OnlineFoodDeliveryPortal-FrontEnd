import React from 'react'
import './OwnerRegister.css'
import HotelSidebar from '../Sidebar/HotelSidebar'

function OwnerRegister() {
  return (
    <div style={{display:'flex'}}>
    <HotelSidebar/>
    <div className="owner-register-main-div">
      <div className="owner-register-second-div">
        <div className="owner-register-form-div">
          <form action="" className="owner-register-form">
            <div className="owner-register-form-inside-div">
              <div className="register-form-zeroth-div">
                <h3>Register</h3>
              </div>
              <div className="owner-register-form-first-div">
                <div className="owner-register-form-input-div">
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">First name</label>
                    <input type="text" id="form3Example4c" className="form-control" />
                  </div>
                  <div className='owner-register-secondname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Last name</label>
                    <input type="text" id="form3Example4c" className="form-control" />
                  </div>
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Email</label>
                    <input type="email" id="form3Example4c" className="form-control" />
                  </div>
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Contact</label>
                    <input type="text" id="form3Example4c" className="form-control" />
                  </div>

                </div>
                <div className="owner-register-form-image-input-div">
                  <div>
                    <img src="https://img.freepik.com/free-vector/business-people-with-thumb-up-modern-trendy-lifestyle-hotel-illustration_335657-392.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais"
                      className="img-fluid" alt="Sample image" style={{width:'50%'}}/>
                  </div>
                  <div>
                    <div className='owner-register-firstname-div'>
                      <label className="form-label" htmlFor="form3Example4c">Id number</label>
                      <input type="text" id="form3Example4c" className="form-control" />
                    </div>
                    <div className='owner-register-firstname-div'>
                      <label className="form-label" htmlFor="form3Example4c">Id Crad</label>
                      <input type="file" id="form3Example4c" className="form-control" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="owner-register-form-second-div">

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    </div>
  )
}

export default OwnerRegister