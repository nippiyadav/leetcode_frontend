import React, { useState } from 'react';
import HeaderComponents from './components/HeaderComponents';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <div className='h-full'>
      
      <HeaderComponents/>
      <Outlet/>
    </div>
  )
  
}

export default App