import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useContextProblemList } from '../Context/ProblemListContext';


function ProblemListComp() {
  const {problemList,setProblemList,loading,problemPagination,filterProblemList} = useContextProblemList();
      
  return (
    <>
        {loading?
        <>
        {
          [1,2,3,4,5,6,7,8,9,10].map((v,i)=>(
            <div key={i} className={`commanFlex justify-between mb-2 text-white bg-gray-900 p-2 rounded-md flex-wrap even:bg-gray-800 animate-pulse h-10`}>
                {<span></span>}
                <span className='flex-1'></span>
                <span style={{flexBasis:"100px"}} className={`text-left `}></span>
            </div>
              )
            )
              }
        </>
        :
        <div className='scrollbar_color overflow-y-auto h-[600px]'>
        {filterProblemList?.length>0?
        filterProblemList?.map((v,i)=>(
              <Link key={i} to={`/execution/${v._id}`}>
                <div key={i} className={`commanFlex justify-between mb-2 text-white bg-gray-800 hover:bg-gray-900 p-2 rounded-md flex-wrap even:bg-gray-700 even:hover:bg-gray-800 ${v.demo?"bg-green-950 hover:bg-green-900":""}`}>
                    {v.demo?<span>Demo</span>:<></>}
                    <span className='flex-1'>{i+1}. {v.title}</span>
                    <span style={{flexBasis:"100px"}} className={`text-left 
                        ${v.difficulty==="EASY"&&"text-sky-500"} 
                        ${v.difficulty==="MEDIUM"&&"text-amber-300"}
                        ${v.difficulty==="HARD"&&"text-red-500"}`}>{v.difficulty}</span>
                </div>
              </Link>
            )
          ):
          <h1 className='font-black text-2xl'>No Problem Found!</h1>}
        </div>
        }
    </>
  )
}

export default ProblemListComp