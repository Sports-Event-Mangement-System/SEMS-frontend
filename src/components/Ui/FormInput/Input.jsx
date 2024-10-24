import React from 'react'

export default function Input({id, label, type, placeholder, value, onChange, accept, name, required, min}) {
  return (
    <>
      <div className='flex flex-col gap-0.5'>
      <label htmlFor={id}>{label}{required && <span className="text-red-500 text-md">*</span>}</label>
      <input 
            name={name}
            className='border border-gray-400 rounded-md p-2 focus:outline-orange-400'
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            accept={accept}
            id={id}
            min={min}
      />
      </div>
    </>
  )
}

