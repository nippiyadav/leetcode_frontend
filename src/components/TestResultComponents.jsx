import React from 'react'

function TestResultComponents({testCaseResult,textCase}) {
    console.log(testCaseResult);
    
  return (
    <div className={`${testCaseResult.status.id !==3? "bg-red-400":"bg-green-300"} p-2 rounded-md`}>
        <div><h1>TestCase {textCase+1} Result </h1></div>
        <div><span className='font-bold'>Stdout:- </span>{testCaseResult.stdout}</div>
        <div><span className='font-bold'>Time:- </span>{testCaseResult.time} s</div>
        <div><span className='font-bold'>Memory:- </span>{testCaseResult.memory} kb</div>
        <div><span className='font-bold'>Stderr:- </span>{testCaseResult.stderr}</div>
        <div><span className='font-bold'>Compile:- </span>{testCaseResult.compile_output}</div>
        <div><span className='font-bold'>Message:- </span>{testCaseResult.message}</div>
        <div><span className='font-bold'>Status:- </span>{testCaseResult.status.description}</div>
    </div>
  )
}

export default TestResultComponents