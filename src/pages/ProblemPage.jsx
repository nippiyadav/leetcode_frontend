import React, { Suspense, useEffect, useState } from 'react'
import ProblemListComp from '../components/ProblemListComp';
import { ProblemEndpoint } from '../Api/ClientApi';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuthProvider } from '../Context/ContextProvider';
import { useContextProblemList } from '../Context/ProblemListContext';
import { ArrowBigLeft, ChevronLeft, ChevronRight } from 'lucide-react';

function ProblemPage() {
   const [searchParams] = useSearchParams();
  const {user} = useAuthProvider();
  const {problemList,setProblemList,companiesList,tagsList,problemPagination,filterProblemList,setFilterProblemList,filterProblemListFn,selectedTags,setSelectedTags,totalProblems,loading} = useContextProblemList();

  const pageNum = searchParams.get("page");
  console.log("pageNum:- ",pageNum);
  

  // const PaginationFn = async (pagination)=>{
  //   /*
  //   if (problemList.length > 0 && problemList.length >= (10 * pagination)) {
  //       const newProblemList = problemList.slice( 
  //         Number(pagination)===1 ? 
  //         0 
  //         : 
  //         Number((Number(pagination-1)).toString().padEnd(2,1))-1,
  //         Number(pagination.padEnd(2,0)) 
  //       );

  //       setFilterProblemList(newProblemList);
  //     } else{
  //      console.log("fetching started:- problems");
  //      problemPagination(pagination);
  //    }
  //    */

  //    console.log(problemList);
     
  //    const usingPreviousData = problemList.filter((v,i)=> v.page===pagination);
  //      console.log("fetching started:- problems",usingPreviousData);
  //      if (usingPreviousData.length>0) {
  //        setFilterProblemList(usingPreviousData[0]?.problems);
  //       }else{
  //        problemPagination(pagination);
  //      }
       
    
  // }
  
  useEffect(()=>{    
       const usingPreviousData = problemList.filter((v,i)=> v.page===pageNum);
       console.log("fetching started:- problems",usingPreviousData);
       if (usingPreviousData.length>0) {
         setFilterProblemList(usingPreviousData[0]?.problems);
        }else{
         problemPagination(pageNum);
        }

       return()=>{
        setSelectedTags(null)
       }
  },[pageNum]);  
  

  return (
      <div className='p-4 grid grid-cols-5 gap-5 h-[94vh] bg-gray-800/90'>
        <div className='basis-[200px] px-2 bg-gray-900 text-white row-span-full flex pt-4 flex-col'>
          
          {/* sidebar left */}
          <Link className='hover:bg-gray-800 bg-gray-600 text-center p-2 rounded-md' to={`/dashboard/${user?.username}`}>
            <span className='font-semibold'>Dashboard</span>
          </Link>

        </div>
        {/* middle */}
        <div className='flex-1 col-span-3'>
          <div>
            <h1 className='text-2xl font-black text-center mb-2 text-white'>Problem List</h1>
          </div>

            {/* tags */}
            <div className=' text-white bg-gray-500/50 p-2 rounded-md mb-2'>
            <h2 className='mb-2 text-center text-xl font-semibold'>Tags</h2>
            <div className='flex items-center gap-2 overflow-x-auto scrollbar_width'>
            {Object.entries(tagsList).map(([tags,number],i)=>(
              <span className={`indivisualSpan ${i==selectedTags?"bg-gray-800":"bg-gray-500"} hover:bg-gray-700 cursor-pointer whitespace-nowrap`} onClick={()=> filterProblemListFn(tags,i,pageNum,"tags")} key={i}>
                <span>{tags} </span>
                <span>{number}</span>
              </span>
            ))}
            </div>
          </div>

          <div>
          {/* problem List*/} 
            <ProblemListComp/>

          {/* pagination */}
            {problemList.length>0 &&
             <div className='flex gap-2 bg-gray-500 items-center justify-around p-1 mt-2'>
                <div>
                  <Link to={`?page=${Number(pageNum)===1?1:Number(pageNum)-1}&limit=10`}>
                    <ChevronLeft className={`${Number(pageNum)===1?"bg-gray-450":"bg-gray-300"} size-8 p-2 rounded-full`}/>
                  </Link>
                </div>
                <div className='flex gap-2'>

                  {
                    Array.from({length:Math.ceil(totalProblems/10)},(_,i)=> i+1).map((v,i)=>(
                      <Link   key={i} to={`?page=${v}&limit=10`}>
                      <span  className={`${Number(pageNum)===v?"bg-gray-800 text-white":"bg-gray-600"} font-bold size-10 flex justify-center items-center cursor-pointer rounded-md`}>{v}</span>
                      </Link>
                    ))
                  }
                </div>
                  <div>
                    <Link to={`?page=${Number(pageNum)===Math.ceil(totalProblems/10)?Math.ceil(totalProblems/10):Number(pageNum)+1}&limit=10`}>
                      <ChevronRight className={`${Number(pageNum)===Math.ceil(totalProblems/10)?"bg-gray-450":"bg-gray-300"} size-8 p-2 rounded-full`}/>
                    </Link>
                  </div>
            </div>
            } 

          </div>


        </div>

        {/* right sidebar */}
        <div className='basis-[200px] bg-gray-900 p-2'>
          {/* company Question List */}
          <div className=' text-white bg-gray-500/50 p-2 rounded-md'>
            <h2 className='mb-2 text-center  text-xl font-semibold'>Trending Company</h2>
          <div className='DivindivisualSpan flex-wrap'>
            {Object.entries(companiesList).map(([company,number],i)=>(
              <span className='indivisualSpan hover:bg-gray-800 cursor-pointer' onClick={()=> filterProblemListFn(company,i,pageNum,"company")} key={i}>
                <span>{company} </span>
                <span>{number}</span>
              </span>
            ))}
            </div>
          </div>
        </div>
      </div>
   
  )
}

export default ProblemPage