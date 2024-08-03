import React from 'react'
import './LogIn.css';

export default function LogIn() {
  return (
    <div className="center">
      <div className="container">
        <div className="flex justify-center text-2xl font-bold my-4">
          <h1>Log In</h1>
        </div>
        <form action="" className="flex flex-col items-center">
          <label className="mb-4">
            Email: <input 
              type="email" 
              placeholder="Enter Email" 
              className="h-[2.5rem] w-64 rounded-[13px] text-center mt-1" 
            />
          </label>
          <label className="mb-4 mr-[32px]">
            Password: <input 
              type="password" 
              placeholder="Enter password" 
              className="h-[2.5rem] w-64 rounded-[13px] text-center mt-1" 
            />
          </label>
        <a href=""  className="mb-4 underline">Forget password ?</a>  
          <button type="submit" className="w-[7rem] h-[39px] bg-[rgb(54,155,235)] rounded-[10px] mb-4">
            LOGIN
          </button>
        </form>
        <h1 className="text-sm font-semibold mb-2">Or</h1>
        <a href="#" className="font-semibold">Sign Up!</a>
      </div>
    </div>
  )
}