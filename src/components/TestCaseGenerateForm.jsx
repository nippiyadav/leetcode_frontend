import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from './Input';
import { CirclePlus,Trash2 } from 'lucide-react';

function TestCaseGenerateForm({exampleFn:parrentFn,showHide=false,top,inputField,right}) {
    const {register,handleSubmit} = useForm();
    const [fieldValue,setFieldValue] = useState([]);

    const [field,setField] = useState([1,2]);

    useEffect(()=>{
       setFieldValue((prev)=> [...field.map((v,i)=>{
            return ""
        })] ) 
    },[])

    
    const trashedField = (index)=>{
        const filterValue = field.filter((v,i)=> i !== index);
        setField((prev)=> filterValue)
    }

    const fieldNameChange = (value,index)=>{
        console.log("fieldNameChange:- ", value,index);
        
        setFieldValue(prev=> fieldValue.map((v,i)=>{
            if (i===index) {
               return v = value
            }
            return v
        }))
        
        console.log(fieldValue);
    }

    // customeSubmission
    const customeSubmission = (data)=>{
        // parrentFn
        console.log(data);
        let obj = {

        }
        let i = 0
        for (const value of Object.values(data)) {
            obj[fieldValue[i]] = value  
            i++
        }

        console.log("object:- ",obj);
        parrentFn(obj)
    }

  return (
    <>{showHide && 
    <div className={`max-w-[444px] p-2 bg-gray-500 rounded-md absolute right-10 transform -translate-y-1/2`} style={{top:`${top}px`,right:`${right+50}px`, zIndex:"999"}}>
        <form onSubmit={handleSubmit(customeSubmission)}>
            <div className='commanFlex justify-between'>
                <span>Adding Field</span>
                <span>
                    <CirclePlus onClick={()=> {
                        setField((prev) => [...prev,prev.length+1]);
                        setFieldValue((prev)=> [...prev,"newRags"])
                    }
                    }/>
                </span>
            </div>
            {field.map((v,i)=>(
            <div key={i} className='p-2 bg-gray-300/20'>
            
            <div className='commanFlex items-center'>
                <input className='flex-1' required={true} 
                onChange={(e)=> fieldNameChange(e.target.value,i)} 
                value={fieldValue[i]} placeholder='Enter tags name' />
                <Trash2 onClick={()=> trashedField(i)}/>
            </div>

            <Input showLabel={false} key={i} {...register(`value${i}`,{required:"this is required"})} placeholder='Enter value'/>
            </div>
            ))}
            {/* <Input {...register("output",{required:"this is required"})}/>
            <Input {...register("explanation",{required:"this is required"})}/> */}
            <button className='block mx-auto px-4 py-2 bg-green-400 rounded-md' type='submit'>Submit</button>
        </form>
    </div>}</>
  )
}

export default TestCaseGenerateForm