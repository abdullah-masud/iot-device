import { useState } from 'react';
import './App.css';
import AcCard from './components/AcCard';
import LightCard from './components/LightCard';
import Wavify from './components/Wavify';

function App() {
 return (
    <div className=''>
    <div className=' min-h-screen flex flex-col justify-center items-center mx-16'>
      <div className='flex justify-between  w-full '>
      <h1 className='text-5xl  font-bold text-start  '>Device List</h1>
      <h1 className='text-5xl  font-bold text-start '>EDU Future Factory</h1>
      </div>
      <div className='flex justify-between  w-full' >
      <h1 className='text-xl font-semibold mb-4 mt-2 text-start  '>Manage All Your IoT Device in One Place</h1>
      <h1 className='text-xl font-semibold mb-4 mt-2 text-start  '>IoT Device Version 1</h1>
      </div>
          <div className='flex flex-row justify-start  items-center body gap-14 w-full'>
          <LightCard/>
          <AcCard/>
          </div>
    </div>
    {/* <Wavify className="absolute top-32 left-0 z-0 mb-96 "/>   */}
    </div>     
  );
}

export default App;
