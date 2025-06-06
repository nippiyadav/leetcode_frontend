import { useEffect, useRef, useState } from 'react'
import {useForm,Controller} from "react-hook-form"
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import {CirclePlus, CloudUpload, LoaderCircle, X} from "lucide-react"
import ExampleFormComponents from '../components/ExampleFormComponents';
import {createPortal} from "react-dom"
import { useExecutionProvider } from '../Context/ExecutionProvider';
import AiGenerate from '../components/AiGenerate';

function ProblemForm() {
    const boxRef = useRef(null);
    const constraintsRef = useRef(null);
    const textareaRef = useRef(null);
    const [exampleFormView,setExampleFormView] = useState(false);
    const [hintsFormView,setHintsFormView] = useState(false);
    const [constraintsView,setConstraintsView] = useState(false);
    const {storeExecution,setStoreExecution} = useExecutionProvider();

    const {handleSubmit,control,clearErrors,getValues,setError,resetField,setValue} = useForm();
    console.log("storeExecution:- ",storeExecution);
    

    // tags adding with comma keyswords
    const keyPressCommainTextarea = (e)=>{
        // console.log(e.key);

        if (e.key===",") {
            e.preventDefault(); // This stops the default comma from being typed
            setStoreExecution((prev)=> {
                return {...prev,tags:[...prev.tags,e.target.value]}
            })
            e.target.value = ""
            resetField("tags",{defaultValue:""})
        }
        
    }
    
    // tags delete
    const deleteTags = (deleteTagsIndex)=>{
        setStoreExecution((prev)=> {
            return {...prev,tags:[...prev.tags.filter((v,i)=> i !== deleteTagsIndex)]}
        })
    }

    // example fun
    const exampleFn = (data)=>{   
        console.log("Data:- ", data);

        setStoreExecution((prev)=>{
            return {...prev,example:[...prev.example,data]}
        })
    }
    
    
    // constraints fun
    const constraintFn = (data)=>{   
        console.log("Data:- ", data);
        setStoreExecution((prev)=>{

            return {...prev,constraints:[...prev.constraints,data.constraints]}
        })
    }
    
     // hints fun
    const hintFn = (data)=>{   
        console.log("Data:- ", data);

        setStoreExecution((prev)=>{
            return {...prev,hints:[...prev.hints,data.hints]}
        })
    }

    
    
    const [boxRefi, setBoxRef] = useState(null);
    const [constantRef, setConstantRef] = useState(null);
    const [hintRef, setHintRef] = useState(null);
    
    
    useEffect(() => {
        // Wait until the DOM is ready to get the element
        const ref = document.getElementById('boxRef');
        const Constantref = document.getElementById('constantRef');
        const hintRef = document.getElementById('hintRef');
        setBoxRef(ref);
        setConstantRef(Constantref);
        setHintRef(hintRef);

        textareaHeightControl()
        
    }, []);

    useEffect(()=>{
        console.log("Somethings Changed in problem form:-");
        setValue("title",storeExecution.title)
        setValue("description",storeExecution.description)
        setValue("difficulty",storeExecution.difficulty)
        
    },[storeExecution]);

    const textareaHeightControl = (e)=>{
    const textarea = textareaRef.current;
    console.log(textarea.style.height,textarea.scrollHeight);
    
    if (textarea) {
      textarea.style.height = "auto"; // reset is neccessary when you want textarea shrink height when content reduce, if not use then it will stick
      textarea.style.height = textarea.scrollHeight + "px"; // grow to fit
    }
    }


  return (
    <div className='p-2 h-full min-h-[444px] overflow-auto'>
        <h1 className='text-center font-bold'>AI Leetcode Question Generate</h1>
        <AiGenerate/>
        <form onChange={handleSubmit(()=>{})} >
           
                <Input name={'title'}  value={storeExecution.title} onChange={(e)=>{
                    setStoreExecution((prev)=>{
                        return {...prev,title:e.target.value}
                    })
                }} placeholder="Enter your title"/>  
                
            
            
                <Textarea onInput={textareaHeightControl} className={"min-h-[50px] max-h-[300px] overflow-y-auto resize-none transition-all"} ref={textareaRef} name={'description'} value={storeExecution.description} onChange={(e)=>{
                    setStoreExecution((prev)=>{
                        return {...prev,description:e.target.value}
                    })
                }}  placeholder="Enter your description"/>  
                

            
                <label htmlFor="demo" className='font-semibold'>Demo</label>
                <div className='p-2 bg-[#d9d9d9]'>
                <select value={storeExecution.demo} onChange={(e)=>{
                    setStoreExecution((prev)=>{
                        return {...prev,demo:Boolean(e.target.value)}
                    })
                }}  
                className='block  w-full' name="demo" id="demo">
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                </select>
                </div>



                <label htmlFor="deficulty" className='font-semibold'>DEFFICULTY</label>
                <div className='p-2 bg-[#d9d9d9]'>
                <select value={storeExecution.difficulty} onChange={(e)=>{
                    setStoreExecution((prev)=>{
                        return {...prev,difficulty:e.target.value}
                    })
                }}  
                className='block  w-full' name="deficulty" id="deficulty">
                    <option value="HARD">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="EASY">Hard</option>
                </select>
                </div>
               

            {/* tags */}
            <label htmlFor="tags" className='font-semibold block flex-1 mt-4'>TAGS</label>
            <div className='commanFlex flex-wrap mt-2'>
                {storeExecution?.tags?.length > 0 && storeExecution?.tags.map((v,i)=>(
                    <span className="px-5 py-2 rounded-md bg-gray-300 relative group" key={i}>{v}
                    <X onClick={()=>deleteTags(i)} size={20} className='absolute -top-1 -right-1 bg-[#b0b3b35e] cursor-pointer hidden rounded-full p-1 group-hover:block'/>
                    </span>
                ))}
            </div>
            <Controller
                name='tags'
                control={control}
                render={({field,fieldState})=>(
                    <Textarea className="resize-none" {...field} keyPressCommainTextarea={keyPressCommainTextarea} labeShow={false} placeholder='Enter Your Tags...'></Textarea>
                )}
            />

            {/* example */}
             <div>
                <div className='commanFlex justify-between'>
                 <span className='font-semibold'>Example</span>
                 <span id='boxRef' className='relative' onClick={(e)=>
                    {   
                        setExampleFormView(prev=> !prev)
                    }
                 }>
                 <CirclePlus ref={boxRef} size={24} />
                 </span>
                 
                </div>
                <div>
                    { storeExecution?.example?.length > 0 && storeExecution?.example.map((v,i)=>(
                <div key={i} className='mb-2 leading-7'>
                    <ul className='font-medium'>Example {i+1}</ul>
                    {v.input && <li><span className='font-semibold mr-1'>Input:</span>{v?.input}</li>}
                    {v.output && <li><span className='font-semibold mr-1'>Output:</span>{v?.output}</li>}
                    {v.explaination && <li><span className='font-semibold mr-1'>Explaination:</span>{v.explaination}</li>}
                </div>
            ))}
                </div>
            </div>   

            {/* constraints */}
            <div className='commanFlex justify-between'>
                 <span className='font-semibold'>Constraints</span>
                 
                 <span id='constantRef' className='relative' onClick={(e)=>
                    {   
                        setConstraintsView(prev=> !prev)
                    }}>
                 <CirclePlus ref={constraintsRef} size={24}
                 />
                 </span>
                 
            </div>
            <div>
            {storeExecution?.constraints?.length > 0 && storeExecution?.constraints.map((v,i)=>(
                <li key={i}>{v}</li>
            ))}
            </div>

            {/* hints */}
            <div className='commanFlex justify-between'>
                 <span className='font-semibold'>Hints</span>
                 
                 <span id='hintRef' className='relative' onClick={(e)=>
                    {   
                        setHintsFormView((prev)=> !prev)
                    }}>
                 <CirclePlus ref={constraintsRef} size={24}
                 />
                 </span>
                 
            </div>
            <div className='flex flex-col gap-.5'>
            {storeExecution?.hints?.length > 0 && storeExecution?.hints.map((v,i)=>(
                <li style={{listStyle:"decimal"}} key={i}>{v}</li>
            ))}
            </div>
        </form>

          {boxRefi &&
            createPortal(
                <ExampleFormComponents
                    inputField={['input', 'output', 'explaination']}
                    exampleFn={exampleFn}
                    showHide={exampleFormView}
                    />,
                boxRefi
        )}

        {/* constraints */}
        {constantRef && 
        createPortal(
        <ExampleFormComponents 
        inputField={["constraints"]} 
        exampleFn={constraintFn} 
        showHide={constraintsView}
        />,constantRef)}

        {/* hints */}
        {hintRef && createPortal(<ExampleFormComponents inputField={["hints"]} exampleFn={hintFn} showHide={hintsFormView}/>,hintRef)}
    </div>
  )
}

export default ProblemForm