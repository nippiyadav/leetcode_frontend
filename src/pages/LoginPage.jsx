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
                if(getValues("password") !== getValues("repassword")){
                    return setError("repassword",{message:"Password is not same"})
                }
                console.log("Yes working",data);
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
        
        <div className='commanFlex mb-2'>
            <span className='cursor-pointer'>
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm.044-5.213c2.445 0 4.267-1.551 4.556-3.781v-1.891h-4.519v1.89h2.602a2.893 2.893 0 0 1-2.724 1.93c-1.194 0-2.677-1.1-2.677-2.843 0-1.621 1.161-2.876 2.677-2.876.739 0 1.413.279 1.922.736l1.399-1.376a4.744 4.744 0 1 0-3.236 8.212z"></path></svg>
            </span>
            <span className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </span>
        </div>
        </div>

    </div>
  )
}

export default LoginPage