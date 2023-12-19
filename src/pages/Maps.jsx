import 'leaflet/dist/leaflet.css'
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

function Maps() {
  const [markerPosition, setMarkerPosition] = useState([ 11.0808,76.0702]);

  const handleMapClick = (e) => {
    setMarkerPosition([e.latlng.lat, e.latlng.lng]);
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };
 console.log(markerPosition);
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
            <input type="text"  style={{border:'1px solid black'}}/><br/>
            <label htmlFor="">District</label><br/>
            <input type="text" style={{border:'1px solid black'}}/><br/>
            <label htmlFor="">Area</label><br/>
            <input type="text" style={{border:'1px solid black'}}/><br/>
            <label htmlFor="">Land Mark</label><br/>
            <input type="text" style={{border:'1px solid black'}}/><br/>
            <button >Save</button>
        </form>
      </div>
    </div>
  );
}

export default Maps;
