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
    <div className='max-w-[1024px] mx-auto'>
      <div className='p-2'>
        <div className='flex mb-2 gap-4 flex-wrap'>
          <div className='flex justify-center items-center flex-col'>
          <div className='w-20 h-20 bg-gray-400 rounded-full'></div>
          <div className='text-sm font-black'>{user?.fullname}</div>
          </div>
          <div className='flex-1 bg-gray-500 text-center rounded-md leading-[122px] text-3xl font-black'> BANNER</div>
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
              <Link key={i} to={v.id}>
                <div key={v.id} className='commanFlex justify-between mb-2 text-white bg-gray-900 p-2 rounded-md flex-wrap even:bg-gray-800'>
                        <span className='flex-1'>{i+1}. {v.title}</span>
                        <span style={{flexBasis:"100px"}} className={`text-left 
                            ${v.difficulty==="EASY"&&"text-sky-500"} 
                            ${v.difficulty==="MEDIUM"&&"text-amber-300"}
                            ${v.difficulty==="HARD"&&"text-red-500"}`}>{v.difficulty}</span>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard