import React, { useRef, useState } from 'react'
import { CircleUser, CloudUpload, Loader, LoaderCircle, Pause, Play } from 'lucide-react'
import { ExecutionEndpoint, ProblemEndpoint } from '../Api/ClientApi';
import {Link, useLocation,useParams} from "react-router-dom"
import { useExecutionProvider } from '../Context/ExecutionProvider';
import { ModefiedTesxtCase } from '../utils/utils';
import { useEffect } from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileSection from './ProfileSection';
import {createPortal} from "react-dom"
import { useAuthProvider } from '../Context/ContextProvider';

function CodeExecutorHeadingComponents({className}) {
    const {pathname} = useLocation();
    const {id} = useParams();
    console.log("location:- ",pathname);
    const rootRef = useRef(null);
    const [toast,setToast] = useState({view:false,content:"",success:false});
    
    const {storeExecution,setStoreExecution,testResponse,setTestResponse} = useExecutionProvider();   
    const {user,setUser} = useAuthProvider() 

    
    const [play,setPlay] = useState(false);
    const [submission,setSubmission] = useState(false);

    const runningCode = async ()=>{
      try {
        setPlay(true);
        
        if (!user) {
          setToast((prev)=> {return {...prev,view:true,content:"Please login"}});
          throw new Error("Please login");
        };

        if (!storeExecution.language) {
          setToast((prev)=> {return {...prev,view:true,content:"Select the Language"}});
          throw new Error("Select the Language");
        }
                
      if (pathname.startsWith(`/execution/${id}`)) {
          console.log("storeExecution:- ",storeExecution);
          
        const newTestCases = ModefiedTesxtCase(storeExecution.testCases)
        const newModifiedVersion = {...storeExecution,testCases:newTestCases}
        console.log("newModifiedVersion:- ",newModifiedVersion);

        let onlyData = {
          codeSnippets:newModifiedVersion.codeSnippets[newModifiedVersion.language],
          source_code:newModifiedVersion.templateCode[newModifiedVersion.language], 
          language:newModifiedVersion.language, 
          stdin:newModifiedVersion.testCases.map((v,i)=> v.input), 
          expected_outputs:newModifiedVersion.testCases.map((v,i)=> v.output), 
          problemId:newModifiedVersion.id,
          language_id:""
        }

        console.log("onlyData:- ",onlyData);
        

        const response = await ExecutionEndpoint.Post("",onlyData);
        console.log(response.data);
        setTestResponse((prev)=> response.data??[])
        setToast((prev)=> {return {...prev,view:true,content:response.message}})

      }else{
        if (!storeExecution) {
          console.log("No Data present here");
          return
        }
        const newTestCases = ModefiedTesxtCase(storeExecution.testCases);
        console.log("Running and testing code:- ",storeExecution.testCases);
  
        const newModifiedVersion = {...storeExecution,testCases:newTestCases}
        
        console.log("storeExecution:- ",newModifiedVersion);
    
        const response = await ProblemEndpoint.Post("testing-problem",newModifiedVersion);
        console.log(response);
        
        setTestResponse(response.data??[]);
        setToast((prev)=> {return {...prev,view:true,content:response.message}})
      }
        } catch (error) {
          console.log("Error in the running code:-", error.message);
          setPlay(false)
        }finally{
          setPlay(false);

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
          if (response.success) {
            setToast((prev)=>{
              return {...prev,view:true,content:response.message}
            });
          }else{
            setToast((prev)=>{
              return {...prev,view:true,content:response.errors[0].error}
            });

          }

          
        }
        
      } catch (error) {
        console.log("Error:- ",error);
      }finally{
        setSubmission(false)
      }
    }

    useEffect(()=>{
      console.log("ya changed in toast:- ",toast);
      if (toast.view) {
        setTimeout(() => {
          setToast((prev)=>{
            return {...prev,view:false,content:""}
          })
        }, 3000);
        
      }
      
    },[toast])

  return (
    <div className={`bg-gray-900/100 text-white p-2 flex justify-between px-4 items-center ${className}`}>
    <div>
      {/* <img src="" alt="" /> */}
      <Link to={`/all-problem?page=${1}&limit=10`}><span>Problem List</span></Link>
    </div>
    <div className='commanFlex'>
      {/* running */}
      <button className="CommonBtnStyle commanFlex items-center">{play?<Pause />:<Play onClick={()=> runningCode()}/>}Run</button>

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

      {/* toast */}
      {toast.view && <div style={{zIndex:"999"}} className='toastDiv fixed right-1 transform -translate-x-1/2 left-[50%] top-0 animate-wiggle rounded-sm flex justify-center items-center w-[350px] text-xl font-bold bg-white text-black outline-1 outline-gray-400 h-20 p-2 text-center'>{toast.content}</div>}
  </div>
  )
}

export default CodeExecutorHeadingComponents