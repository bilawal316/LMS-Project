import React from 'react';
import Login from "../auth/login";
import { Navigate } from 'react-router-dom';


const ProtectedRoutes = (props) => {
  const isAuthenticated  = false;

  return isAuthenticated ? (
    props.children
  ) : <Navigate to="/login" />
};

export default ProtectedRoutes;
