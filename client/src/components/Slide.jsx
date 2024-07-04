import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className=' relative p-[20px] max-md:m-0 h-[450px] bg-gray-50'>

      <div className='max-md:hidden'>
        <div className='absolute top-0 left-[50px] max-md:left-0 w-1/3 max-md:w-full max-md:top-0 shadow-lg '>
          <img src="/waterfall.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
        </div>
        <div className=' shadow-lg absolute top-[100px] max-md:top-[200px] left-1/2 max-md:left-0 right-1/2 max-md:right-0 transform -translate-x-1/2 max-md:translate-x-0 w-1/2 max-md:w-full h-[300px] z-20 max-md:z-10   '>
          <img src="/river.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
        </div>
        <div className='shadow-lg absolute top-0 max-md:top-[400px] right-[50px] max-md:right-0 w-1/3 max-md:w-full z-10 max-md:z-20 '>
          <img src="/london.jpg" alt="slide" className='w-full h-full object-cover rounded-[10px]' />
        </div>
      </div>

      <div className='md:hidden'>
        <Slider {...settings}>
          <div className='w-3/4 h-[400px]'>
            <img src="/waterfall.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
          <div className='w-3/4 h-[400px]'>
            <img src="/river.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
          <div className='w-3/4 h-[400px]'>
            <img src="/london.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
        </Slider>
      </div>

    </div>
  )
}

export default Slide