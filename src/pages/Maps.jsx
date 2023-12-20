import axios from 'axios';
import 'leaflet/dist/leaflet.css'
import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'


function Maps() {

  const { authTokens } = useContext(AuthContext)
  const {address} = useParams()
  const [markerPosition, setMarkerPosition] = useState(
    [ 11.0808,76.0702]
    );
  const [ useraddress,setUseraddress ] = useState(
    {
      state:'',
      dist:'',
      area:'',
      landmark:'',
      coordinates:[]
    }
  )

  console.log(address);

  const handleMapClick = (e) => {
    setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    setUseraddress(
      {
        ...useraddress,
        coordinates:[e.latlng.lat, e.latlng.lng]
      }
    )
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };


  const getAddress = async() => {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/user/address/?address=${address}`,{
          headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.token.access}`
          },
      });
      console.log(response.data.properties.address_loc.coordinates);
      if (address == 'home'){
        setUseraddress(
          {
            ...useraddress,
            coordinates:response.data.properties.address_loc.coordinates
          }
        )
        console.log(markerPosition,'kkk');
        
        const loc = response.data.properties.address_loc.coordinates
        setMarkerPosition(loc.reverse())
      }
      if (address == 'office'){
        setUseraddress(
          {
            ...useraddress,
            coordinates:response.data.properties.office_loc.coordinates
          }
        )
        console.log(markerPosition,'kkk');
        
        const loc = response.data.properties.office_loc.coordinates
        setMarkerPosition(loc.reverse())
        
      }
  }
  catch{
      console.log('Cant fetch user address');
  }
  }


  useEffect(()=>{
    getAddress()
  },[])

  const handleFormchange = (e) => {
    const { name, value } = e.target;
    setUseraddress({ ...useraddress, [name]: value });
    console.log(useraddress);
  }


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(useraddress);
      const response = await axios.post(
        `http://127.0.0.1:8000/user/address/?address=${address}`,
        {
          address: useraddress.state + ',' + useraddress.dist + ',' + useraddress.area + ',' + useraddress.landmark,
          cords: markerPosition.reverse(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.token.access}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log('Error while updating:', error);
    }
  };
  



  return (
    <div>
      <h1 style={{ color: 'black' }}>heloooo</h1>
      <div>
        <MapContainer center={markerPosition} zoom={13} style={{ height: '350px', width: '350px' }}>
          <MapEvents />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={markerPosition}>
            <Popup>
              <p>Latitude: {markerPosition[0]}</p>
              <p>Longitude: {markerPosition[1]}</p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div>
        <form action="">
            <label htmlFor="">State</label><br/>
            <input name='state' onChange={handleFormchange} type="text"  style={{border:'1px solid black'}}/><br/>
            <label htmlFor="">District</label><br/>
            <input name='dist' onChange={handleFormchange}type="text" style={{border:'1px solid black'}}/><br/>
            <label htmlFor="">Area</label><br/>
            <input name='area' onChange={handleFormchange}type="text" style={{border:'1px solid black'}}/><br/>
            <label htmlFor="">Land Mark</label><br/>
            <input name='landmark' onChange={handleFormchange}type="text" style={{border:'1px solid black'}}/><br/>
            <button onClick={handleSubmit}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default Maps;
