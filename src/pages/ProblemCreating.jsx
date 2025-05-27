import React from 'react'
import ProblemForm from './ProblemForm'
import TestEditor from '../components/TestEditor'
import CodeExecutorHeadingComponents from '../components/CodeExecutorHeadingComponents'
import CreateProblemContextProvider from '../Context/CreateProblemContext'

function ProblemCreating() {
  return (
  <>
    <CodeExecutorHeadingComponents className={"h-[60px] sticky top-0 z-50"}/>
    <div className={`grid grid-cols-2 overflow-hidden`} style={{ height: 'calc(100vh - 60px)'}}>
        <ProblemForm/>
        <TestEditor/>
    </div>
  </>
  )
}

export default ProblemCreating