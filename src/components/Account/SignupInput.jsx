import React from 'react'


function SignupInput({type, placeholder, label, name}) {
  return (
      <div className='flex flex-col'>
        <label htmlFor={name}> {label}</label>
        <input type={type} placeholder={placeholder} id={name} className='border border-b-slate-400 rounded-lg py-2 pl-3 w-full font-normal'/>
      </div>
  )
}

export default SignupInput