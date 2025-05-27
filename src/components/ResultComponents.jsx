import React, { useState } from 'react'
import {ScrollText,CodeXml} from "lucide-react"
import TestCasesComponents from './TestCasesComponents'
import TestResultComponents from './TestResultComponents';
import { useExecutionProvider } from '../Context/ExecutionProvider';

function ResultComponents() {
  const {testResponse,setTestResponse} = useExecutionProvider();
  const [resultShow,setResultShow] = useState(false);

  console.log("testResponse:- ",testResponse);
  

  return (
    <div className='flex shadow-2xl flex-col'>
      <div className='Q_menu'>
          <ScrollText color='#3b82f680'/>
          <span onClick={()=> setResultShow(false)} className='Q_menu_tag relative'>TestCases</span> 
          <CodeXml color='#ffb700'/>
          <span onClick={()=> setResultShow(true)} className='Q_menu_tag relative'>Result</span>           
      </div>

      <div className=' px-2 py-3 flex-1 overflow-auto'>
        {resultShow? 
        <div className='commanFlex flex-wrap'>
          {testResponse.map((v,i)=>(
            <TestResultComponents key={i} testCaseResult={v} textCase={i}/>
          ))}
        </div>
        :
        <TestCasesComponents/>}
      </div>
      
    </div>
  )
}

export default ResultComponents