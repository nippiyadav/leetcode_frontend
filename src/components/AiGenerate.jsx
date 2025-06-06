import React, { useRef } from 'react'
import Textarea from './Textarea'
import { set, useForm } from 'react-hook-form'
import { Loader2, SendIcon } from 'lucide-react';
import { useState } from 'react';
import { GrokApi } from '../utils/AiFunction';
import { useExecutionProvider } from '../Context/ExecutionProvider';

function AiGenerate() {
    const {storeExecution,setStoreExecution} = useExecutionProvider()
    const {register,handleSubmit} = useForm();
    const [loading,setLoading] = useState(false);
    const textAreatAiRef = useRef(null);

    const aiQuestionSubmission = async(data)=>{
        try {
            setLoading(true)
            console.log(data);  
            const aiGeneratedQuestion = await GrokApi(data,storeExecution);
            console.log(JSON.parse(aiGeneratedQuestion));
            const convertedJson = JSON.parse(aiGeneratedQuestion)
            setStoreExecution(convertedJson)
        } catch (error) {
            console.log("Error in Ai Generate:- ", error);
        }finally{
            setLoading(false)
        }
        
    }


  return (
    <div>
    <form onSubmit={handleSubmit(aiQuestionSubmission)} className='relative'>
    <Textarea placeholder="write your question..." ref={textAreatAiRef} className="min-h-[250px] max-h-[300px] overflow-y-auto resize-none pr-10" labeShow={false} {...register("AiGenerate",{required:true})}/>
    <button type='submit' className='absolute top-3 right-6'> 
        { loading?<Loader2 className='animate-spin'/>:<SendIcon/>}
    </button>
    </form>
    </div>
    )
}

export default AiGenerate