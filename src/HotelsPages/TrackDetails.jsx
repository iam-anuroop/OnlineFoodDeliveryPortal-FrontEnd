import React, { useContext, useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';



const TrackDetails = () => {
    const { authTokens } = useContext(AuthContext);
    const [thisYear,setThisyear] = useState()
    const [previosYear,setPreviosyear] = useState()
    const navigate = useNavigate()


    const getProgressDetails = async () => {
    
        try {
          const apiEndpoint = 'http://127.0.0.1:8000/hotel/track/';
          
    
          const response = await axios.get(apiEndpoint, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${authTokens.token.access}`,
            },
          });
    
          console.log('Data posted successfully:', response);
          const xx = response.data.current
          const yy = response.data.previous
          setThisyear(
            Object.keys(xx).map((foodType, index) => ({
                id: index,
                value: parseInt(xx[foodType]),
                label: foodType,
              }))
          )
          setPreviosyear(
            Object.keys(yy).map((foodType, index) => ({
                id: index,
                value: parseInt(yy[foodType]),
                label: foodType,
              }))
          )
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };

      useEffect(()=>{
        getProgressDetails();
      },[])

console.log(thisYear);
  return (
    <div>
        <button style={{background:'black',fontWeight:'bold',padding:'8px',color:'white', margin:'10px'}}
        onClick={()=>navigate('/hotelhome')}>Back</button>
        <div>
        <h3>Order progress</h3>
        <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 0, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
    />
    </div>

    <div style={{display:'flex'}}>
    <div>
    <h3>This year</h3>
    {thisYear && thisYear.length > 0 && (
        <PieChart
            series={[
                {
                    data: thisYear.map((item, index) => ({
                        id: index,
                        value: item.value,  // Change from item.count
                        label: item.label,  // Change from item.item__food_type
                    })),
                },
            ]}
            width={400}
            height={200}
        />
    )}
    </div>
    <div>
    <h3>previous year</h3>
    {previosYear && previosYear.length > 0 && (
        <PieChart
            series={[
                {
                    data: previosYear.map((item, index) => ({
                        id: index,
                        value: item.value,  // Change from item.count
                        label: item.label,  // Change from item.item__food_type
                    })),
                },
            ]}
            width={400}
            height={200}
        />
    )}
    </div>


    </div>
    </div>
  )
}

export default TrackDetails