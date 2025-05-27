import React from 'react'
import {BookText, BookOpen, SprayCan, History} from "lucide-react"
import DetailsComponents from './DetailsComponents'

function QuestionComponents() {

  return (
    <div className='QuestionComponents overflow-hidden'>
      {/* menu components */}
      <div className='Q_menu'>
          <BookText color='#3b82f680'/>
          <span className='Q_menu_tag relative'>Description</span> 
          <BookOpen color='#ffb700'/>
          <span className='Q_menu_tag relative'>Editorial</span> 
          <SprayCan color='#3b82f680'/>
          <span className='Q_menu_tag relative'>Solutions</span> 
          <History color='#3b82f680'/>
          <span className='Q_menu_tag relative'>Submission</span> 
          
      </div>

      {/* question */}
      <div className='overflow-auto h-[100%] bg-gray-500'>
        <DetailsComponents/>
        
      </div>

    </div>
  )
}

export default QuestionComponents