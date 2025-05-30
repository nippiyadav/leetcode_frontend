import React, { useState } from 'react';
import HeaderComponents from './components/HeaderComponents';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className='h-full'>
      <HeaderComponents/>
      <Outlet/>
      <Footer/>
    </div>
  )
  
}

export default App