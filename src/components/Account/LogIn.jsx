import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/UserSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '../Ui/FormInput/Input';
import { toast } from 'react-toastify';

export default function LogIn() {
  //States
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  //redux states
  const { loading } = useSelector((state) => state.auth);

  //Login form handle with axios and redux.
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const remember_me = isChecked ? 1 : 0;
    const userCredentaials = {
      email,
      password,
      remember_me
    };
    dispatch(loginUser(userCredentaials)).then((result) => {
      if (result.payload.status === true) {
        localStorage.setItem('access_token', result.payload.access_token);
        localStorage.setItem('role', result.payload.role);
        navigate('/');
        toast.success(result.payload.message);
      }
      else {
        console.log(result.payload);
        setError(result.payload);
      }
    });
  };

  return (
    <div className='h-screen flex mt-14 justify-center'>
      <div className='shadow-2xl rounded-2xl w-5/12 h-fit bg-slate-200'>
        <p className='text-center pt-8 text-orange-600 font-semibold text-lg'>Log In Your Account</p>
        <form action="" className='flex flex-col items-center px-10 py-4 gap-8' onSubmit={handleLogin}>
          <div className='flex flex-col gap-2 w-full'>
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
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
              name="password"
              placeholder="Enter Password"
              required={true}
            />
            {error.password && (
              <span className="text-red-500 text-md">
                {error.password}
              </span>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                name="remember_me"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-5 mr-2"
              />
              <label htmlFor="remember_me" className="text-gray-700 text-l">
                Remember me
              </label>
            </div>
          </div>
          {error.message && <span className="text-red-500 text-md">{error.message}</span>}
          <a href="#" className="mb-4 underline text-sm">Forgot password?</a>
          <button type="submit" className="w-32 h-10 bg-orange-600 text-white rounded-md mb-4 hover:bg-blue-700 focus:outline-none">
            {loading ? 'Loading...' : 'LOGIN'}
          </button>
        </form>
        <p className='text-center pb-5'>Don't have an account ? <NavLink to='/logIn' className={() => `text-orange-600`}>Sign Up</NavLink> </p>
      </div>
    </div>
  );
}