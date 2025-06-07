import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import { SubmissionEndpoint } from '../Api/ClientApi';
import { useAuthProvider } from '../Context/ContextProvider';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import {Chart as ChartJS, ArcElement, Legend, Title, Tooltip,SubTitle } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(Tooltip,ArcElement, Legend,Title,SubTitle);
import {Copy, Trash2} from "lucide-react"


function IndivisualProblem() {
  const {solvedIndivisualProblems,setSolvedIndivisualProblems} = useAuthProvider();
  const [allLanuagecode,setAllLanuagecode] = useState({});
  const [title,setTitle] = useState("");
  const [activeLanguage,setActiveLanguage] = useState(null);
  const [solutionCode,setSolutionCode] = useState({
    total:0,
    right_Wrong:{right:0,wrong:0},
    solutionList:[]
  });
  const [radioSelect,setRadioSelect] = useState(0);
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const {problemId} = useParams();

useEffect(()=>{
   const response = async()=>{
     const data = await SubmissionEndpoint.Get(`get-submission/${problemId}`)
     console.log(data);

    //  this methods filter data on the basis of language
     const filterwithLanguage = data.data.submission.reduce((prev,cur)=>{
      if (!prev[cur.language]) {
        prev[cur.language] = [cur]
      }else{
        prev[cur.language] = [...prev[cur.language],cur]
      }
      // this is important for updating the prev value
      return prev
     },{})

    //  setting title
    setTitle(data.data.title??"")
    console.log("filterwithLanguage:- ",filterwithLanguage);
    setAllLanuagecode(filterwithLanguage??{})
     
    } 
    response();

},[problemId]);
  
useEffect(()=>{
  categoryChange();

  return()=>{
    setRadioSelect(null);
    setCode("");
    setSolutionCode((prev)=>{
      return {
    total:0,
    right_Wrong:{right:0,wrong:0},
    solutionList:[]
  }
    })
  }

},[activeLanguage]);

useEffect(()=>{
  console.log("allLanuagecode:- ",allLanuagecode);
  console.log("allLanuagecode:- ",Object.keys(allLanuagecode)[0]);
  const firtsLanugage = Object.keys(allLanuagecode)[0]
  setActiveLanguage(activeLanguage??firtsLanugage)
  categoryChange();
},[allLanuagecode])

const categoryChange = ()=>{  
  console.log(allLanuagecode);
  const selectedLanguage = activeLanguage;      
  
    if (activeLanguage && activeLanguage !== "#") {
  
     const right_wrongValue =  allLanuagecode[selectedLanguage]?.reduce((prev,cur)=>{
            console.log(cur.status);  
            console.log(prev[cur.status]);  
            prev[cur.status==="Accepted"?"right":"wrong"] =  (prev[cur.status==="Accepted"?"right":"wrong"]??0) + 1
            return prev
          },{});        
  
      
    setSolutionCode((prev)=>{
        return {
          total:allLanuagecode[selectedLanguage]?.length,
          solutionList:allLanuagecode[selectedLanguage],
          right_Wrong:right_wrongValue
         }
      });

    radioCheckBox("_",0)
    }
}

const radioCheckBox = (e,i)=>{
    setRadioSelect(i); 
    
    setCode(prev=>{
      return allLanuagecode?.[activeLanguage]?.[i]?.sourceCode[activeLanguage?.toLowerCase()]??""
    })
}

const deleteSubmissonCard = async (id,i)=>{
  console.log(id,i);
  const notDeletedData = solutionCode.solutionList.filter((v,i)=> v.id !== id);
  console.log(notDeletedData);
  setSolutionCode((prev)=>{
    return {...prev,solutionList:notDeletedData}
  });

  console.log(allLanuagecode);
  

  setAllLanuagecode((prev)=>{
    return {...prev,[activeLanguage]:notDeletedData}
  });

  try {
      const response = await SubmissionEndpoint.Get(`get-submission-delete/${id}`)
      console.log("jsonData:- ",response);
      
      
  } catch (error) {
    console.log("Error when Deleting Card",error);
    
  }
}
  

  return(
    <>
    {Object.entries(allLanuagecode).length>0?
      <>
    <div className=' bg-gradient-to-tl to-[#080808] via-[#06052b] from-[#080808] text-white min-h-dvh'>

      <div className='max-w-7xl mx-auto flex flex-col gap-4  p-2'>

      {/* title */}
      <div>
        <span className='text-4xl font-black text-center block'>{title}</span>
      </div>

      <div className='flex items-center flex-wrap justify-around'>
      <div className='flex flex-col items-center w-[400px] outline-2 outline-white bg-[#3a3b3b] rounded-md gap-2 p-2 h-[150px] justify-center'>
        <span className='text-3xl font-black'>Total Submssion</span>
        <span className='text-3xl font-black'>{solutionCode.total}</span>
      </div>

       <div className='w-[400px] outline-2 bg-[#3a3b3b6c] rounded-md gap-2 p-2 '>
        {/* inser chart */}
                     <Doughnut className='w-[100px]' data={
                      {
                      // ['Red','Blue','Yellow']
                      labels: [...Object.keys(solutionCode.right_Wrong ?? [])],
                      datasets: [
                          {
                        label: 'Right and Wrong',
                        // [300, 50, 100]
                        data: [...Object.values(solutionCode.right_Wrong ?? [])],
                        backgroundColor: [
                          'rgb(54, 162, 235)',
                          'rgb(255, 99, 132)',
                        ],
                        hoverOffset: 4,
                    }
                ],
                }
                  } 
                options={
                  {
                    plugins:{
                      colors:"white",
                       title:{
                          text:"Rigt and Wrong Code Submission",
                          color:"white",
                          display:true,
                          font:{
                            weight:"bold",
                            size:22
                          }
                        },
                      legend:{
                        fullSize:true,
                        labels:{
                          color:"white",
                          boxWidth:50,
                        }
                      },
                    }
                  }
                } />
      </div>
      </div>
      

      {/* source code */}
      <div>
        <div>
          <span className='text-4xl font-black text-center block mb-2'>Source Code</span>
        </div>
      {solutionCode.solutionList && 
      <>
        <div className='min-lg:w-2xl w-full mx-auto mb-4 outline-2 bg-[#3a3b3b] rounded-md gap-2 p-2 max-h-[350px]'>

          <Editor
            value={code}
            readOnly
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
            }}
          />
        </div>
      </>
      
      }
      </div>

      {/* category Selection */}
      <div className='outline-2 outline-white bg-[#3a3b3b] rounded-md gap-2'>
       <div className='bg-[#04010bd1] p-2'>
        <select value={activeLanguage} onChange={(e)=>setActiveLanguage(e.target.value)}  name="category" id="category">
          <option value="#">Select Language</option>
        {Object.keys(allLanuagecode).map((v,i)=>(
          <option defaultValue={Object.keys(allLanuagecode)[0]} key={i} value={v}>{v}</option>
        ))}
        </select>
       </div>

        


       {/* summary of submission */}
        <div className='flex gap-4 flex-wrap p-3 overflow-auto justify-center' style={{maxHeight: "1080px"}}>
          {solutionCode.solutionList?.map((v,i)=>(
            <div key={i} className={`outline-2 relative bg-[#3a3b3b] group rounded-md gap-2 w-fit p-2 ${radioSelect===i?"outline-blue-400":"outline-white"}`}>
              <span className='top-2 right-2 hidden absolute group-hover:block'>
                <Trash2 className='hover:text-red-500 cursor-pointer' onClick={()=>deleteSubmissonCard(v.id,i)}/>
              </span>
              <div>
                <input checked={radioSelect===i} type="radio" name='summaryRadio' onChange={(e)=> radioCheckBox(e,i) }/>
                </div>
              <div className='summaryClassnameDiv'>
                  <div>
                    <span>Created At</span>
                    <span>{new Date(v.createdAt).toLocaleDateString("hn-en",{
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}</span>
                    <span>{new Date(v.createdAt).toLocaleTimeString()}</span>
                  </div>

                  <div>
                    <span>Status</span>)
                    <span>{v.status}</span>
                  </div>

                  <div>
                    <span>Std In</span>
                    <span>{v.stdin.split("\n")?.map((v,i)=>(
                        <span key={i} className='bg-gray-500 px-3 py-1 rounded-md'>{v}</span>
                      ))}</span>
                  </div>
              
                  <div>
                    <span>Std Out</span>
                    <span>
                      {JSON.parse(v.stdout??"[]")?.map((v,i)=>(
                        <span key={i} className='bg-gray-500 px-3 py-1 rounded-md'>{v}</span>
                      ))}
                      </span>
                  </div>

                  <div>
                    <span>Std Err</span>
                    <span>{JSON.parse(v.stderr??"[]")?.map((v,i)=>(
                        <span key={i} className='bg-gray-500 px-3 py-1 rounded-md'>{v}</span>
                      ))}</span>
                  </div>

                  <div>
                    <span>Memory</span>
                    <span>{JSON.parse(v.memory??"[]")?.map((v,i)=>(
                        <span key={i} className='bg-gray-500 px-3 py-1 rounded-md'>{v}</span>
                      ))}</span>
                  </div>
                
                  <div>
                      <span>Time</span>
                      <span>{JSON.parse(v.time??"[]")?.map((v,i)=>(
                        <span key={i} className='bg-gray-500 px-3 py-1 rounded-md'>{v}</span>
                      ))}</span>
                  </div>
            
              </div>
            </div>
          ))}
        </div>
      </div>

      
      </div>
    </div>
      </>
      :
      <>
      </>
    }
    </>
  )
}

export default IndivisualProblem