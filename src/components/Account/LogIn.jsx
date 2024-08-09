import { React, useEffect, useState } from 'react'
import './LogIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function LogIn() {
  //States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //redux states
  const { loading, error } = useSelector((state) => state.auth);
  //Login form handle with axios and redux.
  const handleLogin = (e) => {
    e.preventDefault();
    let userCredentaials = {
      email, password
    }
    console.log(email);
    dispatch(loginUser(userCredentaials)).then((result) => {
      if (result.payload.status === true) {
        localStorage.setItem('access_token', result.payload.access_token);
        localStorage.setItem('role', result.payload.role);
        setEmail('');
        setPassword('');
        navigate('/');
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center justify-center h-[61vh] w-[60vh] bg-gray-300 rounded-2xl p-5 shadow-md">
        <div className="text-2xl font-bold mb-4">
          <h1>Log In</h1>
        </div>
        <form action="" className="flex flex-col items-center w-full" onSubmit={handleLogin}>
          <div className="flex items-center mb-2 w-full">
            <label htmlFor="email" className="w-24 text-right mr-2">Email:<span className="text-red-500 text-md">
                *
              </span></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter Email"
              className="w-64 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {error.email && (
              <span className="text-red-500 text-md">
                {error.email}
              </span>
            )}
          <div className="flex items-center mb-2 w-full">
            <label htmlFor="password" className="w-24 text-right mr-2">Password:<span className="text-red-500 text-md">
                *
              </span></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter Password"
              className="w-64 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>  
          {error.password && (
              <span className="text-red-500 text-md">
                {error.password}
              </span>
            )}
          {error.message && <span className="text-red-500 text-md">{error.message}</span>}
          <a href="#" className="mb-4 underline text-sm">Forgot password?</a>
          <button type="submit" className="w-32 h-10 bg-blue-500 text-white rounded-md mb-4 hover:bg-blue-700 focus:outline-none">
            {loading ? 'Loading...' : 'LOGIN'}
          </button>
        </form>
        <div className="text-sm font-semibold mb-2">Or</div>
        <Link to='/signup' href="#" className="font-semibold">Sign Up!</Link>
      </div>
    </div>
  );
}
