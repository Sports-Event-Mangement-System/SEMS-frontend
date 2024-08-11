import React from 'react'


function Input({ type, placeholder, label, name, required, value}) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name}> {label} {required && <span className="text-red-500 text-md">*</span>}</label>
      <input type={type} placeholder={placeholder} id={name} value={value} className='border border-b-slate-400 rounded-lg py-2 pl-3 w-full font-normal' />
    </div>
  )
}

export default Input