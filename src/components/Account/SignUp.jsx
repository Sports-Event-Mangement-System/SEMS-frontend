import React, { useState } from "react";
import Input from "./Input";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}api/register`, {
        name: e.target.elements.name.value,
        email: e.target.elements.email.value,
        username: e.target.elements.username.value,
        phone_number: e.target.elements.phone_number.value,
        password: e.target.elements.password.value,
        password_confirmation: e.target.elements.password_confirmation.value,
      })
      .then((res) => {
            console.log(res);
            if (res.data.status === true) {
                  navigate('/')
                  toast.success(res.data.message);
            }
      })
      .catch((err) => {
            
            if(err.message === "Network Error"){
                  setError({ message: err.message })
                  console.log(err)
            }
            else{
                  setError(err.response.data.errors);
            }    
      });
  };

  return (
    <div className="h-screen flex items-center justify-center w-screen">
      <div className="shadow-2xl rounded-2xl w-5/12 bg-slate-200">
        <p className="text-center pt-8  text-orange-600 font-semibold text-lg">
          Create a New Account
        </p>
        
        <form
          onSubmit={handleSignUp}
          action=""
          className="flex flex-col items-center px-10 py-4 gap-8"
        >
          <div className="flex flex-col gap-2 w-full">
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              required={true}
            />
            {error.name && (
              <span className="text-red-500 text-md">{error.name}</span>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              required={true}
            />
            {error.email && (
              <span className="text-red-500 text-md">{error.email}</span>
            )}

            <Input
              label="Username"
              type="text"
              placeholder="Username"
              name="username"
              required={true}
            />
            {error.username && (
              <span className="text-red-500 text-md">{error.username}</span>
            )}
            <Input
              label="Phone number"
              type="text"
              placeholder="Phone number"
              name="phone_number"
              required={true}
            />
            {error.phone_number && (
              <span className="text-red-500 text-md">{error.phone_number}</span>
            )}
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              required={true}
            />
            {error.password && (
              <span className="text-red-500 text-md">{error.password}</span>
            )}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              name="password_confirmation"
              required={true}
            />
            {error.password_confirmation && (
              <span className="text-red-500 text-md">
                {error.password_confirmation}
              </span>
            )}
          </div>
          {error.message && (
              <span className="text-red-500 text-md">
                {error.message}
              </span>
            )}

          <div className="flex justify-center w-full">
            <button
              type="submit"
              className=" bg-orange-600 text-white py-2 font-semibold rounded-lg w-full"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="text-center pb-5">
          Already have an account?{" "}
          <NavLink to="/logIn" className={() => `text-orange-600`}>
            Sign in
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
}

export default SignUp;
