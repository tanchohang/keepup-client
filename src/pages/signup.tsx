import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { createUser } from '../services/user.service';
import useAuth, { AuthUser } from '../context/auth.context';
import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { auth, setAuth } = useAuth();

  const [serverErrors, setServerErrors] = useState<string[]>([]);

  async function submitHandler(data: FieldValues) {
    try {
      const { data: resData } = await createUser(data as AuthUser);
      if (resData) {
        setAuth({
          username: resData.username,
          fullname: resData.fullname,
          email: resData.email,
          accessToken: resData.accessToken,
          id: resData.id,
          circle: resData.circle,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Array.isArray(error.response?.data.message) ? setServerErrors(error.response?.data.message) : setServerErrors([error.response?.data.message]);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-500 text-base md:text-lg  font-normal md:font-semibold">
      <form className="flex flex-col gap-8 w-[80%] md:w-[30%]" onSubmit={handleSubmit(submitHandler)}>
        {(Object.keys(errors).length > 0 || serverErrors.length > 0) && (
          <div className="bg-red-200 text-red-600 p-4  rounded-sm">
            <p>{errors.username && <span>Username is required</span>}</p>
            <p>{errors.email && <span>Email is required</span>}</p>
            <p>{errors.firstname && <span>Firstname is required</span>}</p>
            <p>{errors.lastname && <span>Lastname is required</span>}</p>
            <p>{errors.password && <span>Password is required</span>}</p>
            {serverErrors.map((e) => (
              <p key={e}>
                <span>{e}</span>
              </p>
            ))}
          </div>
        )}

        <div className="flex md:justify-between w-[100%] gap-3">
          <input
            type="text"
            {...register('firstname', { required: true })}
            placeholder="Firstname"
            className=" p-3 text-cyan-500  focus:outline-cyan-500 rounded-lg w-[100%] "
          />
          <input
            type="text"
            {...register('lastname', { required: true })}
            placeholder="Lastname"
            className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%] "
          />
        </div>
        <input
          type="text"
          {...register('username', { required: true })}
          placeholder="Username"
          className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%]"
        />
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="email"
          className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%]"
        />

        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
          className=" p-3 text-cyan-500 focus:outline-cyan-500 rounded-lg w-[100%]"
        />

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
