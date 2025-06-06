import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationEndpoint } from "../Api/ClientApi";

const AuthContext = createContext(null)


function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const [solvedIndivisualProblems,setSolvedIndivisualProblems] = useState({});

    const logout = async ()=>{
        try {
                const response = await AuthenticationEndpoint.Get("logout");
                if (response.success) {
                    setUser(null)
                    console.log("UserData:- ",response);
                }
            } catch (error) {
                console.log("Error in AuthProvider:- ", error);
            }
    }

    useEffect(()=>{
        const currentUserFetching = async ()=>{
            try {
                const response = await AuthenticationEndpoint.Get("currentUser");
                if (response.success) {
                    setUser(response.data)
                    console.log("UserData:- ",response);
                }else{
                    setUser(null)

                }
            } catch (error) {
                console.log("Error in AuthProvider:- ", error);
            }
        }
        currentUserFetching()
    },[])
    
  return (
    <AuthContext.Provider value={{user,setUser,logout,solvedIndivisualProblems,setSolvedIndivisualProblems}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuthProvider = ()=>{
    const value = useContext(AuthContext);
    
    if (!value) {
        throw new Error("You did not configured the AuthContext")
    }
    
    return value
}

