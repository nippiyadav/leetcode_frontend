import { Editor } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import ResultComponents from './ResultComponents';
import ExecutionLanguageComponents from './ExecutionLanguageComponents';
import { useExecutionProvider } from '../Context/ExecutionProvider';

function TestEditor() {
    // this is the center store of data
    const {storeExecution,setStoreExecution} = useExecutionProvider();
    const [whichActive,setWhichActive] = useState("")
    const [codeSnippetlanguage,setcodeSnippetlanguage] = useState("#");
    const [refreshSolutionLanguage,setrefreshSolutionLanguage] = useState("#");
    const [templateLanguage,setTemplateLanguage] = useState("#");

     const [code,setCode] = useState(`/**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    var twoSum = function(nums, target) {
        
    };`)

    // this useEffect will help in getting value push in the global context
    useEffect(()=>{
      if (whichActive==="codeSnippetlanguageCode") {
        
        setStoreExecution((prev)=>{             
            return {...prev,codeSnippets:{...prev.codeSnippets,[codeSnippetlanguage]: code},language:codeSnippetlanguage}

          })
        
      }else if (whichActive==="refreshSolutionLanguageCode") {
 
        setStoreExecution((prev)=>{
          return {...prev,language:refreshSolutionLanguage,refrenceSolution:{...prev.refrenceSolution,[refreshSolutionLanguage]:code}}
        })
      } else if (whichActive === "templateCode") {
        setStoreExecution((prev)=> {
          return {...prev,language:templateLanguage,templateCode:{...prev.templateCode,[templateLanguage]:code}}
        })
      }
    },[code])

    // this useEffect will run when change in the codeSnippetLanguage
    useEffect(()=>{
      if (whichActive === "codeSnippetlanguageCode") {
        setCode((prev)=> storeExecution.codeSnippets[codeSnippetlanguage]??"Nothing");
        setStoreExecution((prev)=>  {
          return {...prev,language:codeSnippetlanguage}
        })
      }
      },[codeSnippetlanguage,whichActive]);
      
    // this useEffect will run when change in the refreshSolution
      useEffect(()=>{
        if (whichActive === "refreshSolutionLanguageCode") {          
            setCode((prev)=> storeExecution.refrenceSolution[refreshSolutionLanguage]??"Nothing");
            setStoreExecution((prev)=>  {
            return {...prev,language:codeSnippetlanguage}
          })
        }
    },[refreshSolutionLanguage,whichActive]);

    // this useEffect will run when change in the templateCode
      useEffect(()=>{        
        if (whichActive === "templateCode") {          
            setCode((prev)=> storeExecution.templateCode[templateLanguage]??"Nothing");
            setStoreExecution((prev)=>  {
            return {...prev,language:templateLanguage}
          })
        }
    },[templateLanguage,whichActive]);
    

  return (
    <div>
    <div className='p-2 bg-gray-500'>
        <ExecutionLanguageComponents 
        templateLanguage={templateLanguage}
        setTemplateLanguage={setTemplateLanguage}
        setWhichActive={setWhichActive}
        codeSnippetlanguage={codeSnippetlanguage}
        refreshSolutionLanguage={refreshSolutionLanguage}
        setcodeSnippetlanguage={setcodeSnippetlanguage}
        setrefreshSolutionLanguage={setrefreshSolutionLanguage}/>
    </div>

    <div className='flex flex-col h-full' style={{gap:"5px"}}>
            <Editor
            value={code}
            height="444px" 
            theme='vs-dark'
            className='w-full flex-1'
            language={storeExecution.language}
            defaultLanguage={"python"} 
            onChange={(e)=>{setCode(e)}}
            defaultValue="// some comment" />
            
            {/*reslut div  */}
             <ResultComponents/>
    </div>
    </div>
  )
}

export default TestEditor 