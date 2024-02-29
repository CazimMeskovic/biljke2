import React from 'react'
import { Link } from 'react-router-dom'
import Podaci from './Podaci'
import "./App.css"
import Footer from './Footer'

export default function Pocetne() {
  return (
    <>
    <div className='w-[100%] h-[100vh] bg-slate-200 bgPocetne flex justify-center items-center ' >

<div className='bg-orange-200 bg-opacity-70 md:w-[50%] w-[70%] md:h-[40%] h-[60%] flex flex-col justify-center  p-10 ' >

    <h1 className='lg:text-5xl sm:text-3xl text-xl text-center ' >Welcome to the page of medicinal plants of Bosnia and Herzegovina</h1>
    <Link className=' md:w-[80%] w-[90%]  h-[20%] bg-orange-500 hover:bg-orange-600 mt-16 text-center pt-2 pb-2 sm:text-lg text-md
    font-bold ml-auto mr-auto '
     to="/singlepage">
<button  > Find your medicinal plant</button>
  </Link>
</div>
    </div>
    <Footer />
    </>
  )
}
