import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import landingPage1 from './../assets/images/landingPage/landingpage1.png'
import landingPage2 from './../assets/images/landingPage/landingpage2.png'
import landingPage3 from './../assets/images/landingPage/landingpage3.png'

function HomeCarousel() {

    var settings = {
        fade: true,
        dots: false,
        infinite: true,
        autoplay: true,
        focusOnSelect: false,
        autoplaySpeed: 6000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: false,
    };

    return (


        <Slider {...settings}>
            <div>
                <h2 className='absolute w-full text-center top-[15vh] text-6xl font-semibold uppercase drop-shadow-[0_1.2px_1.2px_rgba(180,147,6,0.8)] text-secondary'>Zažíj dobrodružství !</h2>
                <img className='w-full max-h-[100vh]' src={landingPage1}></img>
            </div>
            <div>
                <h2 className='absolute w-full text-center top-[15vh] text-6xl font-semibold uppercase drop-shadow-[0_1.2px_1.2px_rgba(180,147,6,0.8)] text-secondary'>Výprava z pohodlí domova</h2>
                <img className='w-full max-h-[100vh]' src={landingPage2}></img>
            </div>
            <div>
                <h2 className='absolute w-full text-center top-[15vh] text-6xl font-semibold uppercase drop-shadow-[0_1.2px_1.2px_rgba(180,147,6,0.8)] text-secondary'>Vyber si přátele a vyraž !</h2>
                <h3 className='absolute w-full text-center top-[25vh] text-2xl uppercase  text-primary'>Rozděl a Panuj je zážitek až pro tři dobrodruhy !</h3>
                <img className='w-full max-h-[100vh]' src={landingPage3}></img>
            </div>

        </Slider>
    )
}

export default HomeCarousel