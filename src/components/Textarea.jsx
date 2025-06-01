import React, { forwardRef } from 'react'

const  Textarea = forwardRef(({className,placeholder,name,keyPressCommainTextarea=()=>{},onInput=()=>{},labeShow=true, ...rest},ref)=>{
  return (
    <div className='my-3'>
    {labeShow && <label htmlFor={name} className='font-semibold block'>{name.toUpperCase()}</label>}
    <textarea {...rest} name={name} type="text" ref={ref} placeholder={placeholder} className={`bg-white w-full p-2 rounded-md ${className}`} onInput={(e)=>onInput(e)}  onKeyDown={(e)=>keyPressCommainTextarea(e)} style={{backgroundColor:"#d9d9d9"}}></textarea>
    </div>
  )
})

export default Textarea