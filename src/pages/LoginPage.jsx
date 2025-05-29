import React, { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form"
import Input from '../components/Input';
import {Link, useLocation,useNavigate} from "react-router-dom"
import { AuthenticationEndpoint } from '../Api/ClientApi';
import { useAuthProvider } from '../Context/ContextProvider';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

function LoginPage() {
    const {control,handleSubmit,setError,getValues,clearErrors} = useForm();
    const {pathname} = useLocation(); // "/login"
    const navigation = useNavigate();
    const {setUser} = useAuthProvider();
    const [loading,setLoading] = useState(false)
    
    
    useEffect(()=>{
        clearErrors()
    },[pathname])

    const submit = async (data)=>{
        console.log("data in loginPage:- ",data);
        setLoading(true)
        try {
            if (pathname === "/signup") {
                try {
                    if(getValues("password") !== getValues("repassword")){
                        return setError("repassword",{message:"Password is not same"})
                    }
                    console.log("Yes working",data);
                    const response = await  AuthenticationEndpoint.Post("register",data);
                    if (response.success) {
                        setUser(response.data)
                        navigation("/login")
                    }else{
                        navigation("/signups")
                    }
                } catch (error) {
                    console.log("Error in the signUp ", error);
                    
                }
            } else if (pathname === "/login") {
               try {
                const response = await  AuthenticationEndpoint.Post("login",data);
                console.log(response);
                if (response.success) {
                    setUser(response.data)
                    navigation("/")
                }else{
                    navigation("/login")
                }
               } catch (error) {
                console.log("Error in the login ", error);
               }
            }
        } catch (error) {
            console.log("Error in running submit form:- ",error);
        } finally{
            setLoading(false)
        }
    }
  return (
    <div className='w-full h-lvh bg-gray-900 flex justify-center items-center'>
        <div className='flex justify-center items-center max-w-[444px] flex-col bg-white rounded-md'>
        <form onSubmit={handleSubmit(submit)} className=' p-2 shadow-2xl'>
            {pathname === "/login"?
            (<>
            <Controller
                name='email'
                defaultValue={""}
                rules={{required:"This field is required"}}
                control={control}
                render={({field,fieldState})=>(
                    <>
                    <Input {...field} name={"email"} placeholder={"Enter Your email..."} error={fieldState}/>
                    {fieldState.error && <span className={"text-red-600"}>{fieldState.error.message}</span>}
                    </>

                )}
            />
            <Controller
                name='password'
                defaultValue={""}
                rules={{ required: "This field is required", minLength: { value: 8, message: "Minimum 8 characters" }}}

                control={control}
                render={({field,fieldState})=>(
                    <>
                    <Input {...field} name={"password"} placeholder={"Enter Your password..."} error={fieldState}/>
                    {fieldState.error && <span className={"text-red-600"}>{fieldState.error.message}</span>}
                    </>

                )}
            />
            </>)
            :
            (<>
            <Controller
                name='username'
                defaultValue={""}
                rules={{required:"This field is required"}}
                control={control}
                render={({field,fieldState})=>(
                    <>
                    <Input {...field} name={"username"} placeholder={"Enter Your Username..."} error={fieldState}/>
                    {fieldState.error && <span className={"text-red-600"}>{fieldState.error.message}</span>}
                    </>
                )}
            />
            <Controller
                name='fullname'
                defaultValue={""}
                rules={{required:"This field is required"}}
                control={control}
                render={({field,fieldState})=>(
                    <>
                    <Input {...field} name={"fullname"} placeholder={"Enter Your Fullname..."} error={fieldState}/>
                    {fieldState.error && <span className={"text-red-600"}>{fieldState.error.message}</span>}
                    </>

                )}
            />
            <Controller
                name='password'
                defaultValue={""}
                rules={{ required: "This field is required", minLength: { value: 8, message: "Minimum 8 characters" }}}

                control={control}
                render={({field,fieldState})=>(
                    <>
                    <Input {...field} name={"password"} placeholder={"Enter Your password..."} error={fieldState}/>
                    {fieldState.error && <span className={"text-red-600"}>{fieldState.error.message}</span>}
                    </>

                )}
            />
            <Controller
                name='repassword'
                defaultValue={""}
                rules={{ required: "This field is required", minLength: { value: 8, message: "Minimum 8 characters" }}}

                control={control}
                render={({field,fieldState})=>(
                    <>
                    <Input {...field} name={"re-password"} placeholder={"Enter Your repassword..."} error={fieldState}/>
                    {fieldState.error && <span className={"text-red-600"}>{fieldState.error.message}</span>}
                    </>

                )}
            />
            <Controller
                name='email'
                defaultValue={""}
                rules={{required:"This field is required"}}
                control={control}
                render={({field,fieldState})=>(
                    <>
                    <Input {...field} name={"email"} placeholder={"Enter Your email..."} error={fieldState}/>
                    {fieldState.error && <span className={"text-red-600"}>{fieldState.error.message}</span>}
                    </>

                )}
            />
            </>)}
    

            <button type='submit' className='block mx-auto bg-green-300 py-2 px-4 rounded-md'>{pathname==="/login"?loading? <Loader2 className='animate-spin'/> :"Log In":loading?<Loader2 className='animate-spin'/>:"Sign Up"}</button>
        </form>
        <hr />
        {pathname==="/login"&&<span>Do not have an account? <Link className='text-blue-800 commonSpacing hover:underline' to={"/signup"}>Sign Up</Link> </span>}
        {pathname==="/signup"&&<span>Have an account? <Link className='text-blue-800 commonSpacing hover:underline' to={"/login"}>Log In</Link> </span>}
        
       
        </div>

    </div>
  )
}

export default LoginPage