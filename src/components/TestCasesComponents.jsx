import React, { useEffect, useRef, useState } from 'react'
import { CirclePlus, X } from 'lucide-react';
import TestCaseGenerateForm from './TestCaseGenerateForm';
import { useExecutionProvider } from '../Context/ExecutionProvider';
import {useParams} from "react-router-dom"

function TestCasesComponents() {
  const {storeExecution,setStoreExecution} = useExecutionProvider();
  const creatingProblemRef = useRef(null);
  const [viewCases,setViewCases] = useState(0);
  const [testCaseFormOpening,setTestCaseFormOpening] = useState({show:false,clientY:0,right:0});

  const [textCasesData,seTextCasesData] = useState(storeExecution?.testCases??[]);
  const [filterCases,setFilterCases] = useState([]);
  const params = useParams();
  console.log(params);
  

  useEffect(()=>{
    console.log("viewCases:- ",viewCases);
    
    let filterValue;
    filterValue = storeExecution?.testCases?.filter((v,i)=> i===viewCases);
    if (storeExecution?.testCases?.length === 0 ) {
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
      return {...prev,testCases:[...prev?.testCases,data]} })
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
      return {...prev,testCases:newValues}
    })
    
  }
  

  const testCaseInputValueChange = (data,keys)=>{
    // i have got which testcase you are chaning and at that which object value you are changing
    console.log(viewCases);
    
    console.log(data,keys);
    setFilterCases((prev)=>{
      console.log([{...prev[0],[keys]:data}])
      return [{...prev[0],[keys]:data}]
    })
    setStoreExecution((prev)=>{
      console.log(prev);

      const modifiedValue = prev.testCases.map((testCasedata,index)=>{
        if (index === viewCases) {
          return {...testCasedata,[keys]:data}

        }else{
          return testCasedata
        }
      });

      console.log("modifiedValue:- ",modifiedValue);      
      return {...prev,testCases:modifiedValue}
    })
  }

  const testcaseAdding = ()=>{
    let newAddedTestcase;
    setStoreExecution((prev)=> {
      newAddedTestcase = prev.testCases[prev.testCases.length-1]
      return {...prev,testCases:
        [...prev?.testCases,
          newAddedTestcase
        ]} 
      })
    
     seTextCasesData((prev)=> [...prev,newAddedTestcase]);
  }

  return (
    <div className='p-2 h-[250px] overflow-x-auto'>
      <div className='commanFlex justify-between'>
        <div className='commanFlex flex-wrap'>
        {storeExecution?.testCases?.length > 0 && storeExecution?.testCases?.map((v,i)=>(
          <span key={i} onClick={()=> setViewCases(i)} className={`px-4 py-2 rounded-md ${i===viewCases?"bg-gray-500":"bg-gray-300/100"} mr-2 group relative cursor-pointer`}>Test {i+1}
          <X onClick={()=>{   
            deleteTestCase(i)
            }} size={20} className='absolute -top-1 -right-1 bg-[#b0b3b35e] hidden rounded-full p-1 group-hover:block'/>
          </span>
        ))}
        </div>
        <span>
          <CirclePlus ref={creatingProblemRef} size={24} onClick={(e)=>
                    {   
                      if (params.id) {
                        testcaseAdding()
                      }else{
                        openingTestCaseBox();
                      }
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
                <input type="text" value={v} onChange={(e)=>testCaseInputValueChange(e.target.value,ele)}/>
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