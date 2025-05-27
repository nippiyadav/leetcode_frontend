import React from 'react'
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

    const aiQuestionSubmission = async(data)=>{
        try {
            setLoading(true)
            console.log(data);  
            const aiGeneratedQuestion = await GrokApi(data);
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
    <form onSubmit={handleSubmit(aiQuestionSubmission)}>
    <Textarea labeShow={false} {...register("AiGenerate",{required:true})}/>
    <button type='submit'>
        { loading?<Loader2 className='animate-spin'/>:<SendIcon/>}
    </button>
    </form>
    </div>
    )
}

export default AiGenerate