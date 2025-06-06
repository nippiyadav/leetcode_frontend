import React, { useEffect } from 'react'
import {useParams} from "react-router-dom";
import { SubmissionEndpoint } from '../Api/ClientApi';
import { useAuthProvider } from '../Context/ContextProvider';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function IndivisualProblem() {
  const {solvedIndivisualProblems,setSolvedIndivisualProblems} = useAuthProvider()
  const {problemId} = useParams();
  console.log("problemId:- ",problemId);

  useEffect(()=>{
   const response = async()=>{
     const data = await SubmissionEndpoint.Get(`get-submission/${problemId}`)
     console.log(data);
     const newValue = data.data.reduce((prev,cur)=>{
      console.log("language:- ",prev[cur.language]);
        if (!prev[cur.language]) {
          prev[cur.language] = [cur]
        }else{
          prev[cur.language] = [...prev[cur.language],cur]
        }
        return prev
     },{});

     console.log("newValue:- ",newValue);
     
     setSolvedIndivisualProblems((prev)=>{
      return {...prev,[problemId]:newValue}
     })

    } 
   response()
  },[problemId]);

  console.log("solvedIndivisualProblems:- ", Object.entries(solvedIndivisualProblems[problemId]??[]));
  

  return (
    <div className='max-w-5xl mx-auto'>
      {Object.entries(solvedIndivisualProblems[problemId]??[])?.map(([language,value],i)=>(
        <div key={i}>
          <h1 className='text-center font-semibold mb-2'>{language}</h1>
            <div className='p-2'>
              {value.map((v,i)=>(
                <div key={i} className='flex flex-wrap mb-2 gap-2 bg-gray-400 p-2 justify-around rounded-md shadow-md'>
                    <div className={`flex flex-col ${v.status==="Accepted" ?"bg-green-900":"bg-red-500"} p-2 gap-2 rounded-md text-white basis-[350px]`}>

                      <div className='DivindivisualSpan'>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>Status</span>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>{v?.status}</span>
                      </div>

                      <div className='DivindivisualSpan'>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>Stdin</span>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>{v?.stdin}</span>
                      </div>

                      <div className='DivindivisualSpan'>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>Stdout</span>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>{v?.stdout}</span>
                      </div>

                      <div className='DivindivisualSpan'>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>Memory</span>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>{v?.memory}</span>
                      </div>

                      <div className='DivindivisualSpan'>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>Time</span>
                        <span className={`indivisualSpan ${v.status==="Accepted"&&"bg-gray-400/50"}`}>{v?.time}</span>
                      </div>
                   
                    </div>
                  <div className='bg-black flex-1 w-[400px] p-2 rounded-md text-white'>
                    <h2 className='text-center font-semibold'>Source Code </h2>
                        <Editor
                          value= {v?.sourceCode[language.toLowerCase()]}
                          highlight={code => highlight(v?.sourceCode[language.toLowerCase()], languages.js)}
                          padding={10}
                          style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 16,
                          }}
                        />
                    </div>
                  </div>
              ))}
            </div>
        </div>
      ))}
    </div>
  )
}

export default IndivisualProblem