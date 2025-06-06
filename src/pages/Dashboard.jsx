import React, { use, useEffect } from 'react'
import { dashboardConvertingFn, data } from '../constants'
import { Link } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,Title} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ProblemEndpoint } from '../Api/ClientApi';
import { useAuthProvider } from '../Context/ContextProvider';
ChartJS.register(Tooltip,ArcElement, Legend,Title);

function Dashboard() {
  const {user,setUser} = useAuthProvider();
  console.log("UserWhole Data:- ", user);
  
  useEffect(()=>{
    const userDashboard = async ()=>{
      const response = await ProblemEndpoint.Get("get-solved-problems");
      console.log(response);
      
      const dashBoardData = dashboardConvertingFn(response.data);
      console.log("dashBoardData:- ",dashBoardData);
      
      setUser((prev)=>{
        return {...prev,...dashBoardData}
      });
    };
    userDashboard()
  },[])

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='p-2'>

        <div className='flex mb-2 gap-4 flex-col'>
          <div className='h-60 bg-gradient-to-br from-black via-gray-900 to-black rounded-md flex justify-center items-center text-3xl font-black shadow-md text-gray-100'> BANNER</div>
          <div className='flex flex-wrap items-center gap-2 bg-gradient-to-br from-black via-gray-900 to-black p-2 text-white rounded-md'>
            <div className='w-15 h-15 bg-gray-400 rounded-full'></div>
            <div className='flex flex-col'>
              <span className='text-sm font-black'>{user?.fullname}</span>
              <span className='text-sm font-black'>{user?.username}</span>
            </div>
          </div>
        </div>

        <div className='border-2 flex p-2 gap-2 flex-wrap'>
          <div className='flex-1 flex flex-col justify-center items-center border-2 text-2xl basis-[295px]'>
            <span className='font-bold'>Total Problem Solved</span>
            <span className='font-semibold italic'>{(user?.problemSolvedData?.length || 0)}</span>
          </div>
          <div className='m-auto'>
            {/* inser chart */}
             <Doughnut className='w-[400px]' data={{ ...data(user) }} 
             options={
              {
                plugins:{
                  legend:{
                    fullSize:true,
                    title:{
                      text:"Solving problem Language Used",
                      display:true,
                      font:{
                        weight:"bold",
                        size:22
                      }
                    },
                  }
                  
                }
              }
             } 
             />
          </div>
        </div>

        <div className='border-2 mt-2'>
          <div className='text-center'>
            <h2 className='font-extrabold text-2xl'>Problem Solved</h2>
          </div>
          <div className='p-2'>
            {user?.problemSolvedData?.length>0 && user?.problemSolvedData?.map((v,i)=>(
              <div key={i} className='bg-gray-900 rounded-md flex flex-col mb-2'>
              
              <Link key={i} to={v.id}>
                <div key={v.id} className='commanFlex justify-between items-center mb-2 text-white  p-2 rounded-md flex-wrap even:bg-gray-800'>

                  <div className='flex-1 flex flex-col gap-1'>
                    <span className='mb-2'>{i+1}. {v.title}</span>
                      <div className='flex gap-2 text-sm font-semibold'>
                        {v.solvedLanguage.map((v,i)=>(
                          <div key={i} className='bg-gradient-to-b from-gray-400 to-gray-700 rounded-md p-1 flex gap-2 mb-2 px-2 py-1'>
                            <span>{v.language}</span>
                            <span>{v._count}</span>
                          </div>
                        ))}
                      </div>
                  </div>

                    <span style={{flexBasis:"100px"}} className={`text-left 
                        ${v.difficulty==="EASY"&&"text-sky-500"} 
                        ${v.difficulty==="MEDIUM"&&"text-amber-300"}
                        ${v.difficulty==="HARD"&&"text-red-500"}`}>{v.difficulty}
                    </span>
                  </div>
              </Link>

            

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard