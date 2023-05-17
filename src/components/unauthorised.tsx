import { Navigate, Outlet, useNavigate } from 'react-router';
import useAuth, { AuthUser } from '../context/auth.context';
import { useEffect, useState } from 'react';
import { refreshAccessToken } from '../services/auth.service';

const UnAuthorized = () => {
  const { auth, setAuth } = useAuth();
  const refreshToken = localStorage.getItem('token');
  return auth && refreshToken ? <Navigate to={`${auth?.username}`} replace /> : <Outlet />;
};
export default UnAuthorized;
