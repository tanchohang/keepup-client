import { Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-500 text-base md:text-lg font-normal md:font-semibold">
      <form className="flex flex-col gap-8 w-[80%] md:w-[30%]">
        <div className="bg-red-200 text-red-600 p-4 ml-10 rounded-sm text-xs">
          <p>! Username or Password is wrong</p>
          type="text"
        </div>
        <label className="flex gap-5  items-center ">
          <User className="stroke-white" />
          <input
            name="username"
            placeholder="Username"
            className="text-lg sm:text-base p-3 text-cyan-500  focus:outline-cyan-500 rounded-lg w-[100%]"
          />
        </label>
        <label className="flex gap-5  items-center  w-[100%]">
          <Lock className="stroke-white" />
          <input
            type="password"
            name="password"
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