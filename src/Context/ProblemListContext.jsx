
import React, { createContext, useContext, useState } from 'react'
import { ProblemEndpoint } from '../Api/ClientApi';

const problemListStore = createContext(null);

function ProblemContextProvider({children}) {
    const [problemList,setProblemList] = useState([]);
    const [loading,setLoading] = useState(false);
    
    const problemPagination = async(pagination)=>{
        try {
            setLoading(true);
            const response = await ProblemEndpoint.Get("get-all-problem");
            if (response.success) {
                setProblemList(response.data??[]);
            }

        } catch (error) {
            console.log("Error in ProblemListContext",error);
            setLoading(false)
        }finally{
            setLoading(false)
        }
        
    }
    
  return (
    <problemListStore.Provider value={{problemList,setProblemList,loading,problemPagination}}>
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