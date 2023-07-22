import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
   return (
      <div className='flex flex-col items-center justify-start h-screen p-5'>
         <div>
            <h1 className='text-3xl text-slate-100 font-extrabold'>
               Page Not Found!
            </h1>
         </div>
         <h2 className='text-2xl  text-slate-100'>
            The page you are looking for is not found
         </h2>
         <p className='mt-2 font-semibold text-2xl text-slate-950'>
            Back to{' '}
            <span className='text-lime-400'>
               <Link to='/guesthome' className='underline'>
                  Home Page
               </Link>
            </span>
            .
         </p>
      </div>
   );
}
