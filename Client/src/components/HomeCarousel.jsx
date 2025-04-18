import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeCarousel() {

    var settings = {
        fade: true,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (


        <Slider {...settings}>
            <div>
                <h2 className='absolute w-full text-center top-10'>Zažíj dobrodružství !</h2>
                <img className='w-full max-h-[100vh]' src='https://picsum.photos/1440/800'></img>
            </div>
            <div>
                <h1 className='absolute w-full text-center top-10'>Výprava z pohodlí domova</h1>
                <img className='w-full max-h-[100vh]' src='https://picsum.photos/1440/800'></img>
            </div>
            <div>
                <h2 className='absolute w-full text-center top-[15vh] text-4xl'>Vyber si přátele a vyraž !</h2>
                <h3 className='absolute w-full text-center top-[25vh] text-x'>Rozděl a Panuj je zážitek až pro tři dobrodruhy !</h3>
                <img className='w-full max-h-[100vh]' src='https://picsum.photos/1440/800'></img>
            </div>

        </Slider>
    )
}

export default HomeCarousel