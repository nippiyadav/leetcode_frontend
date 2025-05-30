import React, { useEffect, useState } from 'react'
import { ProblemEndpoint } from '../Api/ClientApi';
import { Link } from 'react-router-dom';

function ProblemListComp({}) {
      const [leetCodeProblems,setLeetCodeProblem] = useState([]);

    useEffect(()=>{
    const allLeetCodeProblem = async()=>{
      try {
        const response = await ProblemEndpoint.Get("get-all-problem");
        console.log("response:- ",response);
        setLeetCodeProblem(response.data??[])
      } catch (error) {
        console.log("Error:- ",error);
      }
    }

    allLeetCodeProblem()
  },[]);

  return (
    <div>
        {leetCodeProblems?.map((v,i)=>(
              <Link key={i} to={`/execution/${v.id}`}>
                <div key={i} className={`commanFlex justify-between mb-2 text-white bg-gray-900 p-2 rounded-md flex-wrap even:bg-gray-800 ${v.demo?"bg-green-900/100":""}`}>
                    {v.demo?<span>Demo</span>:<></>}
                    <span className='flex-1'>{i+1}. {v.title}</span>
                    <span style={{flexBasis:"100px"}} className={`text-left 
                        ${v.difficulty==="EASY"&&"text-sky-500"} 
                        ${v.difficulty==="MEDIUM"&&"text-amber-300"}
                        ${v.difficulty==="HARD"&&"text-red-500"}`}>{v.difficulty}</span>
                </div>
              </Link>
            ))}
    </div>
  )
}

export default ProblemListComp