import React from 'react'
import Input from './Input'
import { NavLink } from 'react-router-dom'

function SignUp() {
  return (
            <div className='h-screen flex items-center justify-center w-screen'>
                  <div className='shadow-2xl rounded-2xl w-5/12 bg-slate-200'>
                        <p className='text-center pt-8 text-blue-700 font-semibold text-lg'>Create a New Account</p>
                        <form action="" className='flex flex-col items-center px-10 py-4 gap-8'>
                              <div className='flex flex-col gap-2 w-full'>
                                    
                                    <Input label="Name" type="text" placeholder= "Name" name="name" required={true}/>

                                    <Input label="Email" type="email" placeholder= "Email" name="email" required={true}/>

                                    <Input label="Username" type="text" placeholder= "Username" name="username" required={true}/>

                                    <Input label="Password" type="password" placeholder= "Password" name="password" required={true}/>

                                    <Input label="Confirm Password" type="password" placeholder= "Confirm password" name="confirmPasswrod" required={true}/> 
                              </div>

                              <div className='flex justify-center w-full'>
                                    <button type="submit" className='bg-sky-500 text-white py-2 font-semibold rounded-lg w-full'>Sign up</button>
                              </div>

                        </form>

                        <p className='text-center pb-5'>Already have an account? <NavLink to='/logIn' className={() => `text-blue-600`}>Sign in</NavLink> </p>
                  </div>
            </div>      
  )
}

export default SignUp