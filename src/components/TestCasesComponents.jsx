import React, { useEffect, useRef, useState } from 'react'
import { CirclePlus, X } from 'lucide-react';
import TestCaseGenerateForm from './TestCaseGenerateForm';
import { useExecutionProvider } from '../Context/ExecutionProvider';

function TestCasesComponents() {
  
  const {storeExecution,setStoreExecution} = useExecutionProvider();
  const creatingProblemRef = useRef(null);
  const [viewCases,setViewCases] = useState(0);
  const [testCaseFormOpening,setTestCaseFormOpening] = useState({show:false,clientY:0,right:0});

  const [textCasesData,seTextCasesData] = useState(storeExecution.tastCases);
  const [filterCases,setFilterCases] = useState([]);
  const [inputValueChange,setInputValueChange] = useState();

  useEffect(()=>{
    console.log("viewCases:- ",viewCases);
    
    let filterValue;
    filterValue = storeExecution.tastCases?.filter((v,i)=> i===viewCases);
    if (storeExecution.tastCases?.length === 0 ) {
      filterValue = [];
    }
    
    console.log("filterValue:- ",filterValue);
    setFilterCases(filterValue)
  },[viewCases,textCasesData]);

  
  const openingTestCaseBox = ()=>{
    console.log(creatingProblemRef.current.getBoundingClientRect());
    setTestCaseFormOpening((prev)=> {
      return {...prev,show:!prev.show,clientY:creatingProblemRef.current.getBoundingClientRect().top,right:-10}
    });

    console.log("testCaseFormOpening:- ",testCaseFormOpening,);
    
  };

  const textCaseFn = (data)=>{   
        console.log("Data:- ", data);
        seTextCasesData((prev)=> [...prev,data]);

      setStoreExecution((prev)=> {
      return {...prev,tastCases:[...prev?.tastCases,data]} })
    }


  const deleteTestCase = (index)=>{
    console.log("deleteTestCase:- ",index);
    let newValues = textCasesData.filter((v,i)=> i !== index);
    console.log("newValues:- ",newValues);

    seTextCasesData((prev)=>{
      const newNormal = index-1 < 0? 0:index-1;
      console.log("newNormal:- ",newNormal);
      setViewCases(newNormal)

      return newValues
    })

    setStoreExecution((prev)=> {
      return {...prev,tastCases:newValues}
    })
    
  }
  

  return (
    <div>
      <div className='commanFlex justify-between'>
        <div className='commanFlex flex-wrap'>
        {storeExecution.tastCases?.length > 0 && storeExecution?.tastCases?.map((v,i)=>(
          <span key={i} onClick={()=> setViewCases(i)} className='px-4 py-2 rounded-md bg-gray-300/100 mr-2 group relative cursor-pointer'>Test {i+1}
          <X onClick={()=>{   
            deleteTestCase(i)
            }} size={20} className='absolute -top-1 -right-1 bg-[#b0b3b35e] hidden rounded-full p-1 group-hover:block'/>
          </span>
        ))}
        </div>
        <span>
          <CirclePlus ref={creatingProblemRef} size={24} onClick={(e)=>
                    {   
                        openingTestCaseBox()
                    }}
                 />
        </span>
      </div>
      <div>
        {filterCases?.length>0 && filterCases?.map((v,i)=>(
          <div key={i} className='mt-3 commanFlex flex-col'>
            {Object.entries(v).map(([ele,v],i)=>(
              <span key={i}>
                <label htmlFor={ele}>{ele}: </label>
                <input type="text" value={v} onChange={(e)=>setInputValueChange(e.target.value)}/>
              </span>
            ))}
          </div>
        ))}
      </div>

      <TestCaseGenerateForm inputField={["input","output"]} exampleFn={textCaseFn} showHide={testCaseFormOpening.show} top={testCaseFormOpening.clientY} right={testCaseFormOpening.right}/>

    </div>
  )
}

export default TestCasesComponents