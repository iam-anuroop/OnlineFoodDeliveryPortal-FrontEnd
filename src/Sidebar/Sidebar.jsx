import { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AuthContext from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
import './Sidebar.css'
import AccountSelector from '../HotelsPages/AccountSelector';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function OffCanvasExample({ name, ...props }) {

  const { user } = useContext(AuthContext)

  // selector bar codes
  const [select,setSelect] = useState(false)
  const [owner,setOwner] = useState(false)
  const handleModalClose = () => setSelect(false)

  try{
    user.is_owner&&setOwner(true)

  }catch{
    console.log('No owner');
  }
  // Side bar states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  console.log(user);

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
              <i className="fa-solid fa-id-card"></i>
            </li>}
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

