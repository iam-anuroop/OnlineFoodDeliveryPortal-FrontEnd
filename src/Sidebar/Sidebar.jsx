import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AuthContext from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
import './Sidebar.css'

function OffCanvasExample({ name, ...props }) {

  const { user } = useContext(AuthContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  return (
    <>
      <i style={{color:"white"}} variant="primary" className="me-2 fa-solid fa-list-check" onClick={handleShow}></i>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header className='offcanvas-header'>
          <div className='sidebar-lock-icon-div'  onClick={handleClose}>
            <i class="fa-solid fa-lock"></i>
          </div>
          <div className='offcanvas-title-div'>
            <i class="fa-solid fa-at" style={{color:'lightgray'}}></i>
            <div>
              <Offcanvas.Title className='offcanvas-title'>{user?user.email:"Guest"}</Offcanvas.Title>
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='sidebar-ul'>
            <li onClick={()=>navigate('/profile')} className="sidebar-ul-li-profile">
              Profile
              <i class="fa-solid fa-id-card"></i>
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

