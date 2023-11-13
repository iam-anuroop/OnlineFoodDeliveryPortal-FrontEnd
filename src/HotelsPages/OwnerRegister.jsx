import React, { useContext, useState } from 'react'
import './OwnerRegister.css'
import HotelSidebar from '../Sidebar/HotelSidebar'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthContext from '../Context/AuthContext'
import { toast} from 'react-toastify';
import axios from 'axios';

function OwnerRegister() {

  const [infopen,setInfopen] = useState(true)
  const { authTokens } = useContext(AuthContext)

  const handleInfopen = () => setInfopen(true);
  const handleClose = () => setInfopen(false);


  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    email: '',
    contact:'',
    id_number:'',
    id_proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const apiEndpoint = 'http://127.0.0.1:8000/hotel/owner/';

    const data = new FormData();
    data.append('first_name',formData.first_name);
    data.append('last_name',formData.last_name);
    data.append('email',formData.email);
    data.append('contact',formData.contact);
    data.append('id_number',formData.id_number);
    data.append('id_proof',formData.id_proof);

    try{
      const response = await axios.post(apiEndpoint,data,{
        headers:{
          'Content-Type':'multipart/form-data',
          'Authorization': `Bearer ${authTokens.token.access}`
        },
      });
      console.log(response.data);
      toast.success('Step 1 completed')
    }catch(error){
      console.error('Error while sending form data:', error);
    }
  };




  return (
    <div style={{display:'flex'}}>
    <HotelSidebar/>
    <div className="owner-register-main-div">
      <div className="owner-register-step1-div">        
        <Modal
        open={infopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex',justifyContent:'center',alignItems:'center',background:'rgba(4, 4, 52,0.5)'}}  
        >
          <Box style={{background:'whitesmoke',width:'40%',height:'40%',padding:'3%',position:'relative'}}>
            <h1>STEP 1</h1>
            <p style={{fontWeight:'bold'}}>Please provide the details of the owner or manager remember this will be strictly checked by 
            our employees. so please ensure the datas are valid before submission.
            Ones it submitted you cant directly change any of your details.
            </p>
            <button onClick={handleClose} style={{background:'#03045e',color:'whitesmoke',position:'absolute',bottom:'8%',
                            right:'5%',fontWeight:'bold',padding:'8px',borderRadius:'5px'}}>Continue</button>
          </Box>

        </Modal>
      </div>
      <div className="owner-register-second-div">
        <div className="owner-register-form-div">
          <form action="" onSubmit={handleSubmit} className="owner-register-form">
            <div className="owner-register-form-inside-div">
              <div className="register-form-zeroth-div">
                <h3 style={{color:'#03045e'}}>Owner Details</h3>
              </div>
              <div className="owner-register-form-first-div">
                <button className='owner-register-info-modal-btn' onClick={handleInfopen}><i className="info-icon-owner-reg fa-solid fa-circle-info"></i></button>
                <div className="owner-register-form-input-div">
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">First name</label>
                    <input type="text" id="form3Example4c" name='first_name' onChange={handleChange} className="form-control" placeholder='eg : Lucifer'/>
                  </div>
                  <div className='owner-register-secondname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Last name</label>
                    <input type="text" id="form3Example4c" name='last_name' onChange={handleChange} className="form-control" placeholder='eg : Mathan'/>
                  </div>
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Email</label>
                    <input type="email" id="form3Example4c" name='email' onChange={handleChange} className="form-control" placeholder='eg : example@mail.com'/>
                  </div>
                  <div className='owner-register-firstname-div'>
                    <label className="form-label" htmlFor="form3Example4c">Contact</label>
                    <input type="text" id="form3Example4c" name='contact' onChange={handleChange} className="form-control" placeholder='eg : 97.....78'/>
                  </div>

                </div>
                <div className="owner-register-form-image-input-div">
                  <div>
                    <div className='owner-register-firstname-div'>
                      <label className="form-label" htmlFor="form3Example4c">Id number</label>
                      <input type="text" id="form3Example4c" name='id_number' onChange={handleChange} className="form-control" placeholder='eg : FH54t65'/>
                    </div>
                    <div className='owner-register-firstname-div'>
                      <label className="form-label" htmlFor="form3Example4c">Id Crad</label>
                      <input type="file" id="form3Example4c" name='id_proof' onChange={handleChange} className="form-control" />
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
                        }} type='submit'>
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