import React, { useEffect, useState } from 'react'
import {CommonQuestionaryMenu} from "../constants"
import { useExecutionProvider } from '../Context/ExecutionProvider'

function DetailsComponents() {
    // this is global store
    const {storeExecution,setStoreExecution} = useExecutionProvider();

  return (
    <div className='DetailsComponents overflow-y-auto p-4 commanFlex gap-3 flex-col mb-4'>
        <h1>{storeExecution.title}</h1>
        {/* tags */}
        <div className='commanFlex'>
            {Array.isArray(storeExecution.tags) && storeExecution.tags?.map((v,i)=>(
                <span className='bg-[#d3efe6e6] px-[14px] py-[4px] rounded-2xl cursor-pointer' key={i}>{v}</span>
            ))}
        </div>
        <h3 className='commonSpacing'>{storeExecution.description}</h3>
        <div>
            {Array.isArray(storeExecution.example) && storeExecution.example?.map((v,i)=>(
                <div key={i} className='mb-2 leading-7'>
                    <ul className='font-medium'>Example {i+1}</ul>
                    {v.input && <li><span className='font-semibold mr-1'>Input:</span>{v?.input}</li>}
                    {v.output && <li><span className='font-semibold mr-1'>Output:</span>{v?.output}</li>}
                    {v.explanation && <li><span className='font-semibold mr-1'>Explaination:</span>{v?.explanation}</li>}
                </div>
            ))}
        </div>
        <div>
            <span className='font-medium'>Constraints</span>
            {Array.isArray(storeExecution.constraints) && storeExecution.constraints.map((v,i)=>(
                <li key={i}>{v}</li>
            ))}
        </div>
        <div className='commanFlex flex-col'>
            {Array.isArray(storeExecution.hints) && storeExecution.hints.map((v,i)=>(
                <div key={i}>
                    <span className='block font-medium list-none'>Hints {i+1}</span>
                    <p className='commonSpacing'>{v}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DetailsComponents