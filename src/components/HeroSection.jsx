import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const [title, setTitle] = useState('title')
  return (
    <div className='hero border-t border-gray-200 pt-3'>
      <div className='container mx-auto flex bg-info-50 rounded-3xl px-4 md:px-12 py-9 md:py-[76px]'>
        <div className='basis-full lg:basis-[60%] '>
          <h1 className='text-3xl lg:text-5xl lg:pr-24 font-semibold'>Raised on Your Own Farm, Pamper your palate!</h1>
          <h3 className='text-2xl lg:text-4xl text-secondary-600 font-bold pt-[10px] pb-[40px]'>$50</h3>
          <Link to={`/products/${title}`} className=' transition-all duration-1000 ease-out hover:bg-primary-600 inline-flex items-center bg-primary-25 gap-2 text-white border-primary-600 rounded-[4px] px-[18px] py-[9px]'>Products
            <span className="material-icons-outlined ">arrow_forward</span>
          </Link>
        </div>
        <div className="basis-[40%] relative bg-[url('/images/slider-image1.jpg')]">

        </div>
      </div>
    </div>
  )
}

export default HeroSection