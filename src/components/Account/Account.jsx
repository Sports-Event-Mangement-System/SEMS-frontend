import React from 'react'
import SignupInput from './SignupInput'

function Account() {
  return (
      <>
            <div className='h-screen flex items-center justify-center'>
                  <div className='shadow-2xl rounded-2xl'>
                        <form action="" className='flex flex-col items-center p-10 gap-6'>
                              <div className='flex flex-col gap-2'>
                                    
                                    <SignupInput label="Name" type="text" placeholder= "Name" name="name" />

                                    <SignupInput label="Username" type="text" placeholder= "Username" name="username" />

                                    <SignupInput label="Email" type="email" placeholder= "Email" name="email" />

                                    <SignupInput label="Phone number" type="text" placeholder= "Phone number" name="phoneNumber" />

                                    <SignupInput label="Password" type="password" placeholder= "Password" name="password" />

                                    <SignupInput label="Confirm Password" type="password" placeholder= "Confirm password" name="confirmPasswrod" /> 
                              </div>

                              <div className='flex justify-center'>
                                    <button type="submit" className='bg-sky-500 text-white px-20 py-2 font-semibold rounded-lg'>Sign up</button>
                              </div>

                        </form>
                  </div>
            </div>      
      </>
  )
}

export default Account