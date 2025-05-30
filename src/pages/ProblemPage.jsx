import React, { Suspense, useEffect, useState } from 'react'
import ProblemListComp from '../components/ProblemListComp';

function ProblemPage() {

  return (
      <div className='p-4 grid grid-cols-5 gap-5 h-[94vh] bg-gray-800/90'>
        <div className='basis-[200px] bg-gray-900 row-span-full'>
        </div>
        <div className='flex-1 col-span-3'>
          <div>
            <h1 className='text-2xl font-black text-center mb-2 text-white'>Problem List</h1>
          </div>
              <Suspense fallback={<h1>Loading...</h1>}>
                <ProblemListComp/>
              </Suspense>
        </div>
        <div className='basis-[200px] bg-gray-900'></div>
      </div>
   
  )
}

export default ProblemPage