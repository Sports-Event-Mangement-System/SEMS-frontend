import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/UserSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from './Input';
import { toast } from 'react-toastify';

export default function LogIn() {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const { loading, error: reduxError } = useSelector((state) => state.user);

  // Login form handle with axios and redux
  const handleLogin = (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password
    };

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload.status === true) {
        localStorage.setItem('access_token', result.payload.access_token);
        localStorage.setItem('role', result.payload.role);
        navigate('/');
        toast.success(result.payload.message);
      } else {
        setError(result.payload);
      }
    });
  };

  useEffect(() => {
    if (reduxError) {
      setError(reduxError);
    }
  }, [reduxError]);

  return (
    <div className='h-screen flex items-center justify-center w-screen'>
      <div className='shadow-2xl rounded-2xl w-5/12 bg-slate-200'>
        <p className='text-center pt-8 text-orange-600 font-semibold text-lg'>Log In Your Account</p>
        <form className='flex flex-col items-center px-10 py-4 gap-8' onSubmit={handleLogin}>
          <div className='flex flex-col gap-2 w-full'>
            <Input
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required={true}
            />
            {error.email && (
              <span className="text-red-500 text-md">
                {error.email}
              </span>
            )}
            <Input
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required={true}
            />
            {error.password && (
              <span className="text-red-500 text-md">
                {error.password}
              </span>
            )}
          </div>
          {error.message && <span className="text-red-500 text-md">{error.message}</span>}
          <a href="#" className="mb-4 underline text-sm">Forgot password?</a>
          <button type="submit" className="w-32 h-10 bg-orange-600 text-white rounded-md mb-4 hover:bg-blue-700 focus:outline-none">
            {loading ? 'Loading...' : 'LOGIN'}
          </button>
        </form>
        <p className='text-center pb-5'>Don't have an account? <NavLink to='/sign-up' className='text-orange-600'>Sign Up</NavLink></p>
      </div>
    </div>
  );
}
