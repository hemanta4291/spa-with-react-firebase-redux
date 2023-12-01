
import React from 'react';
import useLoginUser from '../hooks/useLoginUser';
import { Navigate, Outlet, Route } from 'react-router-dom';

  

  const PrivateRoute = () => {
    const isAuthenticated = useLoginUser()
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />
  };


  export default PrivateRoute