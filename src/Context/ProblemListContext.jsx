
import React, { createContext, useContext, useState } from 'react'
import { ProblemEndpoint } from '../Api/ClientApi';

const problemListStore = createContext(null);

function ProblemContextProvider({children}) {
    const [problemList,setProblemList] = useState([]);
    const [companiesList,setCompaniesList] = useState([]);
    const [tagsList,setTagsList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [filterProblemList,setFilterProblemList] = useState([]);
    const [selectedTags,setSelectedTags] = useState(null);
    const [totalProblems,setTotalProblems] = useState(0);

    
    const problemPagination = async(pagination)=>{
        try {
            setLoading(true);
            const response = await ProblemEndpoint.Get(`get-all-problem?page=${pagination}&limit=10`);
            
            if (response.success) {
                console.log("get-all-problem:- ",[...response.data.data]);
                
                setProblemList((prev)=>{
                    return [...prev,...response.data.data??[]];   
                });

                setFilterProblemList((prev)=>{
                    return [...response.data.data[0].problems??[]]
                });
                
                setCompaniesList(response.data.companies??[])
                setTagsList(response.data.tags??[])
                setTotalProblems(response.data.totalProblems??0)
            }

        } catch (error) {
            console.log("Error in ProblemListContext",error);
            setLoading(false)
        }finally{
            setLoading(false)
        }
        
    }

    const filterProblemListFn = async (tags,index,pageNum,fuctionCalling)=>{
      console.log(tags,":- ",index);
      
     const response = await ProblemEndpoint.Get(`get-solved-search?search=${tags}`);
     console.log(response);
    
     setFilterProblemList(response.data)
      
      if (selectedTags===index) {   
        setSelectedTags(null)
      }else{
        if (fuctionCalling==="tags") {
            setSelectedTags(index);
        }
      }
      }
    
  return (
    <problemListStore.Provider value={{problemList,setProblemList,loading,problemPagination,companiesList,tagsList,filterProblemListFn,setFilterProblemList,filterProblemList,selectedTags,setSelectedTags,totalProblems}}>
        {children}
    </problemListStore.Provider>
  )
}

export default ProblemContextProvider

export const useContextProblemList = ()=>{
    const value = useContext(problemListStore);
    if (!value) {
        throw new Error("You did not configured createProblemContext")
    }
    return value
}