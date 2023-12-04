import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './HotelSidebar.css'
import { useNavigate } from 'react-router-dom'


function HotelSidebar() {
    const [collapsed, setCollapsed] = React.useState(true);
    const [toggled, setToggled] = React.useState(false);

    const navigate = useNavigate()


      const handleMouseEnter = () => {
        setCollapsed(false);
      };
    
      const handleMouseLeave = () => {
        setCollapsed(true);
        setToggled(false)
      };



  return (
    <div style={{position:'relative'}}>
      <div className='toggle-icon-hotel-sidebar'>
      <i onClick={()=>setToggled(true)} style={{position:'absolute',top:'3%',paddingLeft:'30px',color:'yellow'}} className=" fa-solid fa-sliders"></i>
      </div>
    <Sidebar
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{height:"100vh"}}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        backgroundColor={'white'}
        rootStyles={{
          color: 'black',
          border:'1px solid #03045e'
        }}
      >
    <Menu>
        <div onClick={()=>navigate('/hotelhome')} className="hotel-side-bar-heading-div">
            {toggled && <i class="close-hotel-sidebar-toggle fa-solid fa-xmark" onClick={()=>setToggled(false)}></i>}
            <h2>{collapsed?<i style={{fontSize:'80%'}} className="fa-solid fa-sliders"></i>:'Buisiness'}</h2>
        </div>
        {!collapsed&&<p style={{color:'gray',paddingLeft:'8%',fontWeight:'bold',fontSize:'80%',paddingTop:'6%'}} className="hotel-side-bar-general">General</p>}
        {!collapsed&&<hr style={{border:'1px solid gray', color:'gray'}}/>}
        <MenuItem onClick={()=>navigate('/managefood')} className={collapsed?'hotel-sidebar-meanu-item-collapsed':'hotel-sidebar-meanu-item'}>{collapsed?<i className="fa-solid fa-utensils"></i>:'Foods'}</MenuItem>
        <hr style={{border:'1px solid gray', color:'blue'}}/>
        <MenuItem className={collapsed?'hotel-sidebar-meanu-item-collapsed':'hotel-sidebar-meanu-item'}>{collapsed?<i className="fa-solid fa-truck-ramp-box"></i>:'Orders'}</MenuItem>
        <hr style={{border:'1px solid gray', color:'blue'}}/>
     </Menu>
     </Sidebar>
     </div>
  )
}

export default HotelSidebar