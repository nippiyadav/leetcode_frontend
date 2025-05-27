
import React, { createContext, useContext, useState } from 'react'

const createProblemContextStore = createContext(null);

function CreateProblemContextProvider({children}) {
    const [problemContext,setProblemContext] = useState({
        title:"",
        description:"",
        defficulty:"",
        tags:[],
        example:[
            {
                input:"",
                output:"",
                explaination:""
            }
        ],
        constraints:[ 
            // {constraints: ''}
        ],
        hints:[ ],
    })
  return (
    <createProblemContextStore.Provider value={{problemContext,setProblemContext}}>
        {children}
    </createProblemContextStore.Provider>
  )
}

export default CreateProblemContextProvider

export const createProblemUseContext = ()=>{
    const value = useContext(createProblemContextStore);
    if (!value) {
        throw new Error("You did not configured createProblemContext")
    }
    return value
}