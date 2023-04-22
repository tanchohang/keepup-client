import { Lock, User } from 'lucide-react';

import { FieldValues, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import useAuth, { AuthUser as UserType } from '../context/auth.context';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function submitHandler(data: FieldValues): Promise<void> {
    const { username, password } = data;
    const { data: resData } = await login(username, password);
    console.log(resData);

    if (resData) {
      console.log(resData);
      const user: UserType = {
        id: resData.id,
        email: resData.email,
        username: resData.username,
        fullname: resData.fullname,
        accessToken: resData.accessToken,
      };

      setAuth(user);
      localStorage.setItem('token', resData.refresh_token);
      sessionStorage.setItem('accessToken', resData.access_token);

      if (location.state?.from) {
        navigate(location.state?.from?.pathname || '/', { replace: true });
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-500 text-base md:text-lg font-normal md:font-semibold">
      <form className="flex flex-col gap-8 w-[80%] md:w-[30%]" onSubmit={handleSubmit(submitHandler)}>
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-200 text-red-600 p-4 ml-10 rounded-sm text-xs">
            <p>{errors.username && <span>Username is required</span>}</p>
            <p>{errors.password && <span>Password is required</span>}</p>
          </div>
        )}
        <label className="flex gap-5  items-center ">
          <User className="stroke-white" />
          <input
            {...register('username', { required: true })}
            placeholder="Username"
            className="text-lg sm:text-base p-3 text-cyan-500  focus:outline-cyan-500 rounded-lg w-[100%]"
          />
        </label>
        <label className="flex gap-5  items-center  w-[100%]">
          <Lock className="stroke-white" />
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Password"
            className="text-lg sm:text-base p-3 text-cyan-500  focus:outline-cyan-500 rounded-lg w-[100%]"
          />
        </label>
        <div className="flex flex-col items-center text-white">
          <button type="submit" className=" hover:opacity-90 shadow-lg bg-white text-cyan-500 w-[100px] h-[50px]">
            Login
          </button>
          or{' '}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};
export { Login };
