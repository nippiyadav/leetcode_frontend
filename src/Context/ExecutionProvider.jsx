import { createContext, useContext, useState } from "react";

const StoreExecution = createContext(null)


function ExecutionProvider({children}) {
    const [storeExecution,setStoreExecution] = useState({
      title:"",
      description:"",
      defficulty:"",
      tags:[],
      example:[],
      constraints:[ ],
      hints:[ ],
      language:"",
      templateCode:{},
      tastCases:[],
      codeSnippets:{},
      refrenceSolution: { }
    });
    const [testResponse,setTestResponse]  = useState([]);

  return (
    <StoreExecution.Provider value={{storeExecution,setStoreExecution,testResponse,setTestResponse}}>
        {children}
    </StoreExecution.Provider>
  )
}

export default ExecutionProvider

export const useExecutionProvider = ()=>{
    const value = useContext(StoreExecution);
    
    if (!value) {
        throw new Error("You did not configured the useContext")
    }
    
    return value
}

