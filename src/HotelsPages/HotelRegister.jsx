import React, { useContext, useState } from 'react'
import HotelSidebar from '../Sidebar/HotelSidebar'
import './HotelRegister.css'
import AuthContext from '../Context/AuthContext'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast} from 'react-toastify';
import axios from 'axios';


function HotelRegister() {
  const [infopen,setInfopen] = useState(true)
  const { authTokens } = useContext(AuthContext)

  const handleInfopen = () => setInfopen(true);
  const handleClose = () => setInfopen(false);

  const [formData,setFormData] = useState({
    hotel_name:'',
    description:'',
    address:'',
    country:'',
    state:'',
    contact:'',
    alt_contact:'',
    email:'',
    certificate:null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const apiEndpoint = 'http://127.0.0.1:8000/hotel/hotel/'

    const data = new FormData();
    data.append('hotel_name',formData.hotel_name);
    data.append('description',formData.description);
    data.append('address',formData.address);
    data.append('country',formData.country);
    data.append('state',formData.state);
    data.append('contact',formData.contact);
    data.append('alt_contact',formData.alt_contact);
    data.append('email',formData.email);
    data.append('certificate',formData.certificate);


    try{
      const response = await axios.post(apiEndpoint,data,{
        headers:{
          'Content-Type':'multipart/form-data',
          'Authorization': `Bearer ${authTokens.token.access}`
        },
      });
      console.log(response.data);
      toast.success("Step 2 completed")
    }catch(error){
      console.log(error);
      console.error("Error While sending data");
    }
  };


 
  return (
    <>
      <div style={{display:'flex'}}>
        <HotelSidebar/>
        <div className="hotel-register-main-div">
          <div className="hotel-register-first-div">
          <Modal
            open={infopen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',justifyContent:'center',alignItems:'center',background:'rgba(4, 4, 52,0.5)'}}  
            >
              <Box style={{background:'whitesmoke',width:'40%',height:'40%',padding:'3%',position:'relative'}}>
                <h1>STEP 2</h1>
                <p style={{fontWeight:'bold'}}>Please provide the details of the owner or manager remember this will be strictly checked by 
                our employees. so please ensure the datas are valid before submission.
                Ones it submitted you cant directly change any of your details.
                </p>
                <button onClick={handleClose} style={{background:'#03045e',color:'whitesmoke',position:'absolute',bottom:'8%',
                                right:'5%',fontWeight:'bold',padding:'8px',borderRadius:'5px'}}>Continue</button>
              </Box>

            </Modal>
            <div className="hotel-register-second-div">
              <div className="hotel-register-form-div">
                <div className="hotel-register-form-heading-div">
                  <h2 style={{color:'lightblue'}}>Details of Hotel</h2>
                </div>
                <form action="" className="hotel-register-form">
                  <div className="hotel-register-form-left-div">
                    <div className="hotel-register-left-sub">
                      <h3>Normal Details</h3>
                    </div>
                    <div className="hotel-register-left-input-div">
                      <div className="hotel-register-hotelname-div">
                        <label className="form-label" htmlFor="form3Example4c">Name of Hotel</label>
                        <input required onChange={handleChange} type="text" id="form3Example4c" name='hotel_name' className="form-control"/>
                      </div>
                      <div className="hotel-register-description-div">
                        <label className="form-label" htmlFor="form3Example4c">Description/Details</label>
                        <textarea required onChange={handleChange} type="text" id="form3Example4c" name='description' className="hotel-register-text-area form-control"/>
                      </div>
                      <div className="hotel-register-address-div">
                        <label className="form-label" htmlFor="form3Example4c">Address</label>
                        <input required onChange={handleChange} type="text" id="form3Example4c" name='address' className="form-control"/>
                      </div>
                      <div className="hotel-register-country-div">
                        <label className="form-label" htmlFor="form3Example4c">Country</label>
                        <input required onChange={handleChange} type="text" id="form3Example4c" name='country' className="form-control"/>
                      </div>
                      <div className="hotel-register-state-div">
                        <label className="form-label" htmlFor="form3Example4c">State</label>
                        <input required onChange={handleChange} type="text" id="form3Example4c" name='state' className="form-control"/>
                      </div>
                    </div>
                  </div>
                  <div className="hotel-register-form-right-div">
                    <div className="hotel-register-right-sub" style={{position:'relative'}}>
                      <h3>Credential Details</h3>
                      <button className='hotel-register-info-modal-btn' onClick={handleInfopen}><i className="info-icon-hotel-reg fa-solid fa-circle-info"></i></button>
                    </div>
                    <div className="hotel-register-right-input-div">
                      <div className="hotel-register-contact-div">
                        <label className="form-label" htmlFor="form3Example4c">Contact</label>
                        <input required onChange={handleChange} type="text" id="form3Example4c" name='contact' className="form-control"/>
                      </div>
                      <div className="hotel-register-state-div">
                        <label className="form-label" htmlFor="form3Example4c">Second Contact</label>
                        <input required onChange={handleChange} type="text" id="form3Example4c" name='alt_contact' className="form-control"/>
                      </div>
                      <div className="hotel-register-email-div">
                        <label className="form-label" htmlFor="form3Example4c">Email</label>
                        <input required onChange={handleChange} type="text" id="form3Example4c" name='email' className="form-control"/>
                      </div>
                      <div className="hotel-register-lisence-div">
                        <label className="form-label" htmlFor="form3Example4c">Lisence</label>
                        <input required onChange={handleChange} type="file" id="form3Example4c" name='certificate' className="form-control"/>
                      </div>
                      <div className="hotel-register-image-div">
                        <img className='hotel-register-next-image' src="https://img.freepik.com/free-vector/hand-drawn-comfort-zone-illustration_23-2150119710.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                        <center className='register-hotel-next-step-div'>
                        <button type='submit' className='hotel-register-next-step-btn' onClick={handleSubmit}>
                          Go to<br/>
                          Step 3
                        </button>
                        </center>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>           
        </div>
      </div>
    </>
  )
}

export default HotelRegister