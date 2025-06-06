import React, { useEffect, useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import QuestionComponents from '../components/QuestionComponents'
import ResultComponents from '../components/ResultComponents'
import CodeExecutorHeadingComponents from '../components/CodeExecutorHeadingComponents'
import { useParams } from 'react-router-dom'
import { ProblemEndpoint } from '../Api/ClientApi'
import { useExecutionProvider } from '../Context/ExecutionProvider'

function ExecutionPage() {
  const {id} = useParams();
  console.log("id:- ",id);
  const {storeExecution,setStoreExecution,testResponse,setTestResponse} = useExecutionProvider();  
  
  useEffect(()=>{
    const getProblemExecution = async ()=>{
      try {
        const response = await ProblemEndpoint.Get(`get-problem-id/${id}`);
        console.log("response:- ",JSON.stringify(response.data));
        setStoreExecution(response.data);
        
      } catch (error) {
        console.log("Error in ExecutionPage:- ", error);
      }
    }

    getProblemExecution();

    return()=>{
      setStoreExecution({});
      setTestResponse([])
    }
  },[id])

  return (
    <>
    <CodeExecutorHeadingComponents/>
    <div className='executionPageStyling'>
     {storeExecution?.id && 
     <>
     <QuestionComponents/>
     <div className='flex flex-col gap-2'>
     <CodeEditor/>
     <ResultComponents/>

     </div>
     </>}
    </div>
    </>
  )
}

export default ExecutionPage