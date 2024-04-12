import React, { useRef, useEffect } from 'react';
import Accountpage from '../components/Account';

const Canvas = ({ content, setIsLoggedIn }) => {

  return (
    <div className="h-screen">
      <div className='bg-black opacity-[60%] w-full h-screen relative z-10 '>hello</div>
      <div className='absolute top-0 z-40'>
       <Accountpage setIsLoggedIn={setIsLoggedIn} className="h-full w-[100%]"></Accountpage>
      </div>
    </div>
  );
};

export default Canvas;
