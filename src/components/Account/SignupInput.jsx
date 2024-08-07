import React from 'react'


function SignupInput({type, placeholder, label, name}) {
  return (
    <>
      <div className='flex flex-col'>
        <label htmlFor={name}> {label}</label>
        <input type={type} placeholder={placeholder} id={name} className='border border-black rounded-lg px-10 py-1 pl-2 pr-32 font-normal'/>
      </div>
    </>
  )
}

export default SignupInput