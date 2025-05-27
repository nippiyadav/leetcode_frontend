import React, { useState } from 'react'
import { CircleUser, CloudUpload, Loader, LoaderCircle, Pause, Play } from 'lucide-react'
import { ExecutionEndpoint, ProblemEndpoint } from '../Api/ClientApi';
import { createProblemUseContext } from '../Context/CreateProblemContext';
import {Link, useLocation,useParams} from "react-router-dom"
import { useExecutionProvider } from '../Context/ExecutionProvider';
import { ModefiedTesxtCase } from '../utils/utils';
import { useEffect } from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileSection from './ProfileSection';

function CodeExecutorHeadingComponents({className}) {
    const {pathname} = useLocation();
    const {id} = useParams();
    console.log("location:- ",pathname);
    
    const {storeExecution,setStoreExecution,testResponse,setTestResponse} = useExecutionProvider();    

    
    const [play,setPlay] = useState(false);
    const [submission,setSubmission] = useState(false);

    const runningCode = async ()=>{
      try {
                
      if (pathname.startsWith(`/execution/${id}`)) {
          console.log("storeExecution:- ",storeExecution);
          
        const newTestCases = ModefiedTesxtCase(storeExecution.tastCases)
        const newModifiedVersion = {...storeExecution,tastCases:newTestCases}
        console.log("newModifiedVersion:- ",newModifiedVersion);

        let onlyData = {
          codeSnippets:newModifiedVersion.codeSnippets[newModifiedVersion.language],
          source_code:newModifiedVersion.templateCode[newModifiedVersion.language], 
          language:newModifiedVersion.language, 
          stdin:newModifiedVersion.tastCases.map((v,i)=> v.input), 
          expected_outputs:newModifiedVersion.tastCases.map((v,i)=> v.output), 
          problemId:newModifiedVersion.id,
          language_id:""
        }

        console.log("onlyData:- ",onlyData);
        

        const response = await ExecutionEndpoint.Post("",onlyData);
        console.log(response.data);
        setTestResponse((prev)=> response.data??[])
        
      }else{
        if (!storeExecution) {
          console.log("No Data present here");
          return
        }
        const newTestCases = ModefiedTesxtCase(storeExecution.tastCases);
        console.log("Running and testing code:- ",storeExecution.tastCases);
  
        const newModifiedVersion = {...storeExecution,tastCases:newTestCases}
        
        console.log("storeExecution:- ",newModifiedVersion);
    
        const response = await ProblemEndpoint.Post("testing-problem",newModifiedVersion);
        console.log(response);
        setTestResponse(response.message??[])

      }
        } catch (error) {
          console.log("Error in the running code", error);
          
        }finally{
          setPlay(false)
        }
        
    }

    const submissionProblem = async ()=>{
      setSubmission(true)
      try {
        if (pathname === `/execution/${id}`) {
          console.log(`/execution/${id}`);
          console.log(storeExecution);
          
        }else{
          const data = {...storeExecution};
          console.log(data);
          const response = await ProblemEndpoint.Post("create-problem",data);
          console.log("jsonResponse:- ",response);
        }
        
      } catch (error) {
        console.log("Error:- ",error);
      }finally{
        setSubmission(false)
      }
    }

    useEffect(()=>{
      console.log("Url Change");
      
    },[pathname])

  return (
    <div className={`bg-gray-900/100 text-white p-2 flex justify-between px-4 items-center ${className}`}>
    <div>
      {/* <img src="" alt="" /> */}
      <Link to={"/all-problem"}><span>Problem List</span></Link>
    </div>
    <div className='commanFlex'>
      {/* running */}
      <button onClick={()=> setPlay(prev=> !prev)} className="CommonBtnStyle commanFlex items-center">{play?<Pause />:<Play onClick={()=> runningCode()}/>}Run</button>

      {/* submit */}
      {pathname.startsWith(`/execution/${id}`)?
      <></>
      :
      <>
      <button onClick={()=> submissionProblem()} className="CommonBtnStyle commanFlex items-center !bg-green-300/15 !text-white hover:!bg-green-800/80">{submission? <LoaderCircle className='animate-spin'/>:<CloudUpload />}Submit</button>
      </>
      }
    </div>

      <ProfileSection/>
  </div>
  )
}

export default CodeExecutorHeadingComponents