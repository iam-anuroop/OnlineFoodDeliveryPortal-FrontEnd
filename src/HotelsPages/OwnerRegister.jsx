import React from 'react'
import './OwnerRegister.css'
import HotelSidebar from '../Sidebar/HotelSidebar'

function OwnerRegister() {
  return (
    <div style={{display:'flex'}}>
    <HotelSidebar/>
    <div className="owner-register-main-div">
      <div className="owner-register-step1-div">
        <h3 style={{fontWeight:'bolder',color:'#03045e'}}>STEP 1 :</h3>
        <p style={{fontWeight:'bold'}}>Please provide the details of the owner or manager remember this will be<br/> strictly checked by 
          our employees. so please ensure the datas are valid before submission.<br/>
          Ones it submitted you cant directly change any of your details.
        </p>
      </div>
      <div className="owner-register-second-div">
        <div className="owner-register-form-div">
          <form action="" className="owner-register-form">
            <div className="owner-register-form-inside-div">
              <div className="register-form-zeroth-div">
                <h3 style={{color:'#03045e'}}>Owner Details</h3>
              </div>
              <div className="owner-register-form-first-div">
                <div className="owner-register-form-input-div">
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">First name</label>
                    <input type="text" id="form3Example4c" className="form-control" placeholder='eg : Lucifer'/>
                  </div>
                  <div className='owner-register-secondname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Last name</label>
                    <input type="text" id="form3Example4c" className="form-control" placeholder='eg : Mathan'/>
                  </div>
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Email</label>
                    <input type="email" id="form3Example4c" className="form-control" placeholder='eg : example@mail.com'/>
                  </div>
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Contact</label>
                    <input type="text" id="form3Example4c" className="form-control" placeholder='eg : 97.....78'/>
                  </div>

                </div>
                <div className="owner-register-form-image-input-div">
                  <div>
                    <div className='owner-register-firstname-div'>
                      <label className="form-label" htmlFor="form3Example4c">Id number</label>
                      <input type="text" id="form3Example4c" className="form-control" placeholder='eg : FH54t65'/>
                    </div>
                    <div className='owner-register-firstname-div'>
                      <label className="form-label" htmlFor="form3Example4c">Id Crad</label>
                      <input type="file" id="form3Example4c" className="form-control" />
                    </div>
                  </div>
                  <div style={{paddingTop:'5%',display:'flex',alignItems:'center',justifyContent:'space-around',gap:'10%'}}>
                    <img src="https://img.freepik.com/free-vector/gradient-step-illustration_23-2150126725.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais"
                      className="img-fluid" alt="Sample image" style={{width:'50%'}}/>
                      <div>
                        <button style={{
                          width:'110px',
                          height:'110px',
                          borderRadius:'50%',
                          fontSize:'20px',
                          fontWeight:'bold',
                          background:'#03045e',
                          border:'3px solid whitesmoke',
                          color:'whitesmoke'
                        }}>
                          Go To <br/>
                          Step2
                        </button>
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