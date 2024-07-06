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
    <div className='w-[1000px] max-md:w-full mx-auto '>
      <div className=''>
        <Slider {...settings}>
          <div className='w-3/4 h-[400px]'>
            <img src="/korea.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
          <div className='w-3/4 h-[400px]'>
            <img src="/england.webp" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
          <div className='w-3/4 h-[400px]'>
            <img src="/bigben.webp" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
          <div className='w-3/4 h-[400px]'>
            <img src="/japan.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
          <div className='w-3/4 h-[400px]'>
            <img src="/green.jpg" alt="slide" className='w-full h-full object-cover shadow-lg rounded-[10px]' />
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Slide