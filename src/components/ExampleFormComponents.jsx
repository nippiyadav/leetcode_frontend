import React from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'

function ExampleFormComponents({exampleFn:parrentFn,showHide=false,inputField}) {
    const {register,handleSubmit} = useForm();    

  return (
    <>{showHide && 
    <div className={`max-w-[444px] p-2 bg-gray-500 rounded-md absolute right-10 bottom-0`} style={{zIndex:"999"}}>
        <form onSubmit={handleSubmit(parrentFn)}>
          {inputField.map((v,i)=>(
            <Input key={i} {...register(`${v}`,{required:"this is required"})}/>
          ))}
            {/* <Input {...register("output",{required:"this is required"})}/>
            <Input {...register("explanation",{required:"this is required"})}/> */}
            <button className='block mx-auto px-4 py-2 bg-green-400 rounded-md' type='submit'>Submit</button>
        </form>
    </div>}</>
  )
}

export default ExampleFormComponents