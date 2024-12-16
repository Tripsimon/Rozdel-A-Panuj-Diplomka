import React from 'react'

import landingPage from './../assets/images/landingPage/landingpage.png'


function Home() {


  return (
    <div className='h-[200vh]'>
      <img src={landingPage} className='w-full' alt="Logo" />
    </div>
  )
}

export default Home