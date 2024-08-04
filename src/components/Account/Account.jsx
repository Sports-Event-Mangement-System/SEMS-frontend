import React from 'react'
import SignupInput from './SignupInput'

function Account() {
  return (
      <>
            <div className='h-screen flex items-center justify-center'>
                  <div className='shadow-2xl'>
                        <form action="" className='flex flex-col items-center p-10 gap-6'>
                              <div className='flex flex-col gap-6'>
                                    <SignupInput type="text" placeholder= "First Name" />

                                    <SignupInput type="text" placeholder= "Last Name" />

                                    <SignupInput type="email" placeholder= "Email" />

                                    <SignupInput type="password" placeholder= "Password" />
                              </div>

                              <div className='flex justify-center'>
                                    <button type="submit" className='bg-sky-500 text-white px-8 py-1 font-semibold rounded-lg'>Sign up</button>
                              </div>

                        </form>
                  </div>
            </div>      
      </>
  )
}

export default Account