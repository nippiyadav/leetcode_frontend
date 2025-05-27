import React from 'react'
import { useAuthProvider } from '../Context/ContextProvider';
import { Link } from 'react-router-dom';
import {LogOutIcon} from "lucide-react"

function ProfileInfo({classname}) {
    const {user,setUser,logout} = useAuthProvider();
    console.log(user);


  return (
    <div className={`z-50 absolute transform top-1/1 -left-[50%] p-2 w-[200px] bg-gray-700 commanFlex flex-col rounded-md ${classname}`}>
      {user && <>
        <span>{user?.username}</span>
        <span>{user?.fullname}</span>
      </>}

        {user? 
        <button onClick={()=> {setUser(null),logout()}} className='flex gap-2 items-center justify-center'><LogOutIcon color='white' className='inline'/> Log out</button>
        :
        <Link to={"/login"}> Log in</Link>
      }
    </div>
  )
}

export default ProfileInfo