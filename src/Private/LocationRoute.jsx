import React from 'react'
import { Route,Routes } from 'react-router-dom'


const LocationRoute = ({ component: Component, authed, ...rest }) => {
    return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          authed ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      </Routes>
    );
  };

export default LocationRoute