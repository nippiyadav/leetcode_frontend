import React, { forwardRef } from 'react'

const  Input = forwardRef(({placeholder,name,showLabel=true, ...rest},ref)=>{
  return (
    <div className='my-3'>
    {showLabel && <label htmlFor={name} className='font-semibold'>{name.toUpperCase()}</label>}
    <input {...rest} name={name} type="text" ref={ref} placeholder={placeholder} className='bg-white' style={{backgroundColor:"#d9d9d9"}}/>
    </div>
  )
})

export default Input