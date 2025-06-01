  import React, { useEffect, useState } from 'react';
  import Editor from '@monaco-editor/react';
  import { useExecutionProvider } from '../Context/ExecutionProvider';

  function CodeEditor() {
    const {storeExecution,setStoreExecution} = useExecutionProvider();
    const [allLanguage,setAllLanguage] = useState([]);
    const [languageChange,setLanguageChange] = useState('#');
    const [code,setCode] = useState("");

    useEffect(()=>{      
      console.log(Object.keys(storeExecution?.referenceSolution));
      const arrLanguage = Object.keys(storeExecution?.referenceSolution)
      setAllLanguage(arrLanguage);
      setStoreExecution((prev)=>{
        console.log("running on loading",prev);
        
        return {...prev,language:languageChange}
      })
    },[])
    
    // this useEffect run when i change value from drop down select
    useEffect(()=>{
      console.log("Changing the language");
      setCode(storeExecution?.templateCode?.[languageChange]??"")
      setStoreExecution((prev)=>{
        return {...prev,language:languageChange}
      });
    },[languageChange])

    // this useEffect run when i write code
    useEffect(()=>{

      setStoreExecution((prev)=>{
        console.log({...prev.templateCode});
    
        return {...prev,templateCode:{...prev.templateCode,
          [languageChange]:code
        }}
      })

    },[code]);

    return (
      <div className='codeEditorStyling flex-1'>
        <div className='p-1'>
          <select value={languageChange} onChange={(e)=> setLanguageChange(e.target.value)} className='text-white' name="language" id="language">
            <option value={"#"}>Language</option>
            {Array.isArray(allLanguage) && allLanguage.map((v,i)=>(
              <option  value={v} key={i}>{v.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <Editor 
        value={code}
        height="90%" 
        theme='vs-dark'

        className='w-1/2 '
        options={{
          autoIndent: "advanced",
          formatOnType: true,
          formatOnPaste: true,
          tabSize: 4, // standard Python indent
          insertSpaces: true,
        }}
        language={storeExecution?.language} 
        // defaultLanguage={languageChange} 
        onChange={(e)=>{setCode(e)}}
        defaultValue="// change language for getting templates" />
      </div>
    )
    
  }

  export default CodeEditor