
import React from 'react';
import useLoginUser from '../hooks/useLoginUser';
import { Navigate, Outlet, Route } from 'react-router-dom';

  

  const PublicRoute = () => {
    const isAuthenticated = useLoginUser()
  
    return isAuthenticated ? <Navigate to="/cart" /> : <Outlet />
  };


  export default PublicRoute