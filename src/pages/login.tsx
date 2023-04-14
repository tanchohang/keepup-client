import { Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-500">
      <form className="flex flex-col gap-8 w-[30%]">
        <div className="bg-red-200 text-red-600 font-semibold p-4 ml-10 rounded-sm">
          <p>! Username or Password is wrong</p>
        </div>
        <label className="flex gap-5  items-center ">
          <User className="stroke-white" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="text-lg p-3 text-cyan-500 font-semibold focus:outline-cyan-500 rounded-lg w-[100%]"
          />
        </label>
        <label className="flex gap-5  items-center  w-[100%]">
          <Lock className="stroke-white" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="text-lg p-3 text-cyan-500 font-semibold focus:outline-cyan-500 rounded-lg w-[100%]"
          />
        </label>
        <div className="flex flex-col items-center text-white">
          <button type="submit" className=" text-lg font-bold hover:opacity-90 shadow-lg bg-white text-cyan-500 w-[100px] h-[50px]">
            Login
          </button>
          or{' '}
          <Link to="/signup" className="text-lg font-semibold underline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};
export { Login };
