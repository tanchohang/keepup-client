import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../context/auth.context';
import { useEffect, useState } from 'react';

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const refreshToken = localStorage.getItem('token');

  // useEffect(() => {
  //   const refreshToken = localStorage.getItem('token');
  //   if ( auth) {
  //     console.log(refreshToken, auth);
  //   }
  // }, []);

  return refreshToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
