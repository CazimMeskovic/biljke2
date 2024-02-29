

import React from 'react';

export default function Korisnik(podaci) {
  return (
    <>
 
      <div >
       
        <div className=' w-[100%]  h-[100%] flex justify-center items-center  '>
          <div className='w-[100%] h-[100%] text-slate-200 flex flex-col justify-center items-center  sm:p-8 p-5' >

            <h1 className='text-3xl font-bold sm:mb-10 mb-5'> Welcome, {podaci.ime}!   </h1>
            <div className='flex items-center mb-5'>
              <img
                src='https://play-lh.googleusercontent.com/5cJf50zsUZQq9Ea-nrEnpFqx5whFflzH7o6FQKI_HOKQaiUorRKua5mWywWCQe59Lkw=w240-h480-rw'
                alt='Slika 1'
                className='w-28 h-28 mr-3 rounded-full'
              />
            
            </div>
            <h2 className='sm:mt-10 mt-5 sm: mb-10  text-2xl text-center ' > You have 400$ on your account an you can bay for thet amoun whic plants you wont</h2>

            <div className='flex items-center mb-5'>

            </div>

            <h2 className='text-xl text-center sm:mb-20 mb-10'>
              Thank you for joining our community. Enjoy the experience and follow the latest information!
            </h2>

            {/* Dodajte ikone i animacije */}
            <div className='flex mt-8 space-x-4 pb-20 '>
              <div className='bg-blue-500 text-white p-4 rounded-full'>
                <i className='fas fa-thumbs-up'></i> Like
              </div>
              <div className='bg-green-500 text-white p-4 rounded-full'>
                <i className='fas fa-comment'></i> Comment
              </div>
              <div className='bg-purple-500 text-white p-4 rounded-full'>
                <i className='fas fa-share'></i> Share
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}
