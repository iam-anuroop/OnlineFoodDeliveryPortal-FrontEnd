import React, { useContext, useEffect, useState } from 'react';
import './AccountSelector.css';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AccountSelector = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate()


  const fetchAccounts = async () => {
    const apiEndpoint = 'http://127.0.0.1:8000/hotel/hotel/';
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'Authorization': `Bearer ${authTokens.token.access}`
        }
      });
      setAccounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = async(selectedAccount) => {
    console.log('Selected Account:', selectedAccount);
    try {
      const response = await axios.post('http://127.0.0.1:8000/hotel/hotelotp/', { 
        hotel_id:selectedAccount.id
      },{
        headers: {
          'Authorization': `Bearer ${authTokens.  token.access}`
        }
      });
      console.log('jaijavan');
      console.log('Registration successful:', response.data);
      localStorage.setItem('hotel_key',JSON.stringify(response.data.key))
      localStorage.setItem('hotel_email',JSON.stringify(response.data.email))
      toast.success('Please check your email')
      navigate('/hotellogin')
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);


  return (
    <>
        <div className="account-selector">
          <div style={{width:'100%'}}>
          <h4>Choose an Account</h4>
          <hr style={{border:'3px solid black',width:'100%'}}/>
          </div>
          <div className="account-list">
            {accounts.map((account) => (
              <div key={account.id}>
              <div key={account.id} className="account-item" onClick={() => onSelect(account)}>
                <img className='account-selector-img-logo' src="https://img.freepik.com/free-vector/facade-restaurant-flat-design_23-2147538197.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=sph" alt="" />
                <div>
                    <h5>{account.hotel_name}</h5>
                    <h6>{account.email}</h6>
                </div>
              </div>
              <hr style={{border:'1px solid black',width:'100%'}}/>
              </div>
            ))}
              <>
              <div  className="account-item" >
                <img className='account-selector-img-logo' src="https://img.freepik.com/free-psd/3d-rendering-contact-ui-icon_23-2150838975.jpg?size=626&ext=jpg&ga=GA1.1.1314413667.1699072698&semt=ais" alt="" />
                <div>
                <h5>Add Another Account</h5>
                </div>
              </div>
              <hr style={{border:'1px solid black',width:'100%'}}/>
              </>
          </div>
        </div>
  </>

  );
};

export default AccountSelector;
