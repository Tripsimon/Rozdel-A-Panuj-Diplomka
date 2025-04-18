import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import landingPage from './../assets/images/landingPage/landingpage.png'
import HomeCarousel from '../components/HomeCarousel';

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (destination) => {
    navigate(destination);
  }


  return (
    <>
      <HomeCarousel></HomeCarousel>
      <div className='flex items-center justify-center w-full h-[100vh] md:h-full' >

      </div>
    </>
  )
}

export default Home