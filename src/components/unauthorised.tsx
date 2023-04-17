import { Navigate, Outlet, useNavigate } from 'react-router';
import useAuth from '../context/auth.context';

const UnAuthorized = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  return auth ? <Navigate to={`${auth.username}/chats`} replace /> : <Outlet />;
};
export default UnAuthorized;
