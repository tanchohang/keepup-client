import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-500 text-base md:text-lg  font-normal md:font-semibold">
      <form className="flex flex-col gap-8 w-[80%] md:w-[30%]">
        <div className="bg-red-200 text-red-600 p-4  rounded-sm">
          <p>! Username or Password is wrong</p>
        </div>

        <div className="flex md:justify-between w-[100%] gap-3">
          <input type="text" name="Firstname" placeholder="Firstname" className=" p-3 text-cyan-500  focus:outline-cyan-500 rounded-lg w-[100%] " />
          <input type="text" name="Lastname" placeholder="Lastname" className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%] " />
        </div>
        <input type="text" name="username" placeholder="Username" className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%]" />
        <input type="email" name="email" placeholder="email" className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%]" />

        <input type="password" name="password" placeholder="Password" className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%]" />

        <div className="flex flex-col items-center justify-center">
          <button type="submit" className=" hover:opacity-90 shadow-lg bg-white text-cyan-500 w-[100px] h-[50px]">
            Signup
          </button>
          <Link to="/login" className="text-white underline ">
            or Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export { Signup };
