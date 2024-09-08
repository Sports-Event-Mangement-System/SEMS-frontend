import React from 'react'

export default function FormInput({id, label, type, placeholder, value, onChange, accept, name, required, min}) {
  return (
    <>
      <div className='flex flex-col gap-0.5'>
      <label htmlFor={id}>{label}{required && <span className="text-red-500 text-md">*</span>}</label>
      <input 
            name={name}
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
