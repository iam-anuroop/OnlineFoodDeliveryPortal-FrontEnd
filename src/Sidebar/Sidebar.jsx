import { useContext, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AuthContext from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
import './Sidebar.css'
import AccountSelector from '../HotelsPages/AccountSelector';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function OffCanvasExample({ name, ...props }) {

  const { user,hotelAuth } = useContext(AuthContext)

  // selector bar codes
  const [select,setSelect] = useState(false)
  console.log(user);
  const [owner,setOwner] = useState(user&&user.is_owner&&!hotelAuth)
  const [hotelLogined,setHotelLogined] = useState(user&&user.is_owner&&hotelAuth)
  const handleModalClose = () => setSelect(false)

  
  // Side bar states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  console.log(owner,hotelLogined,'sidebaaaaaaaaaaar');
  

  const logout = () => {
    localStorage.removeItem('authTokens')
    navigate('/')
  }

  return (
    <>
      {select&&<Modal
        open={select}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex',justifyContent:'center',alignItems:'center',background:'rgba(255, 255, 255,0.2)',backdropFilter: 'blur(2px)'}}  
        >
          <Box style={{width:'35%',height:'50%',background:'whitesmoke',border:'none',borderRadius:'10px',padding:'10px'}}>
          <AccountSelector/>
          </Box>

      </Modal>}
  
      <span onClick={handleShow} variant="primary"><i className="fa-solid fa-circle-chevron-down"></i> </span><span> Menu</span>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header className='offcanvas-header'>
          <div className='sidebar-lock-icon-div'  onClick={handleClose}>
            <i className="fa-solid fa-lock"></i>
          </div>
          <div className='offcanvas-title-div'>
            <i className="fa-solid fa-at" style={{color:'lightgray'}}></i>
            <div>
              <Offcanvas.Title className='offcanvas-title'>{user?user.email:"Guest"}</Offcanvas.Title>
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='sidebar-ul'>
            <li onClick={()=>navigate('/profile')} className="sidebar-ul-li-profile">
              Profile
              <i className="fa-solid fa-id-card"></i>
            </li>
            {owner&&<li onClick={()=>setSelect(true)} className="sidebar-ul-li-profile">
              Manage Your Hotel
              <i className="fa-solid fa-hotel"></i>
            </li>}
            {hotelLogined&&<li onClick={()=>navigate('/hotelhome')} className="sidebar-ul-li-profile">
              Got To hotel
              <i className="fa-solid fa-hotel"></i>
            </li>
            }
            {user&&user.is_deliveryboy&&<li onClick={()=>navigate('/deliveryhome')} className="sidebar-ul-li-profile">
              Manage Your Work
              <i className="fa-solid fa-truck-ramp-box"></i>
            </li>
            }
            <li onClick={()=>navigate('/myorders')} className="sidebar-ul-li-profile">
              My Orders
              <i className="fa-solid fa-rectangle-list"></i>
            </li>
            {user?<li onClick={logout} className="sidebar-ul-li-profile">
              Logout
              <i className="fa-solid fa-right-from-bracket"></i>
            </li>:
            <li onClick={()=>navigate('/')} className="sidebar-ul-li-profile">
              Login
              <i className="fa-solid fa-id-card"></i>
            </li>}
            <li onClick={()=>navigate('/bardbot')} className="sidebar-ul-li-profile">
              Chat with Bot
              <i className="fa-solid fa-robot"></i>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

