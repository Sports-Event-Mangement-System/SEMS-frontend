import React from 'react'


function SignupInput({type, placeholder}) {
  return (
    <>
      <div>
        <input type={type} placeholder={placeholder} className='border border-black rounded-lg px-10 py-1 pl-2 pr-32 font-normal' />
      </div>
    </>
  )
}

export default SignupInput