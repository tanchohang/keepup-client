import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-500">
      <form className="flex flex-col gap-8 w-[30%]">
        <div className="bg-red-200 text-red-600 font-semibold p-4  rounded-sm">
          <p>! Username or Password is wrong</p>
        </div>

        <div className="flex justify-between">
          <input
            type="text"
            name="Firstname"
            placeholder="Firstname"
            className="text-lg p-3 text-cyan-500 font-semibold focus:outline-cyan-500 rounded-lg "
          />
          <input
            type="text"
            name="Lastname"
            placeholder="Lastname"
            className="text-lg p-3 text-cyan-500 font-semibold focus:outline-cyan-500 rounded-lg "
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="text-lg p-3 text-cyan-500 font-semibold focus:outline-cyan-500 rounded-lg w-[100%]"
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="text-lg p-3 text-cyan-500 font-semibold focus:outline-cyan-500 rounded-lg w-[100%]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="text-lg p-3 text-cyan-500 font-semibold focus:outline-cyan-500 rounded-lg w-[100%]"
        />

        <div className="flex flex-col items-center justify-center">
          <button type="submit" className=" text-lg font-bold hover:opacity-90 shadow-lg bg-white text-cyan-500 w-[100px] h-[50px]">
            Signup
          </button>
          or
          <Link to="/login" className="text-white underline font-semibold text-lg">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export { Signup };
