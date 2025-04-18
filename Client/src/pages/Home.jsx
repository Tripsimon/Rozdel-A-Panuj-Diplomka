import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


import HomeCarousel from '../components/HomeCarousel';

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (destination) => {
    navigate(destination);
  }


  return (
    <>
      <HomeCarousel></HomeCarousel>
      <div className='grid items-center justify-center w-full h-[100vh] md:h-full' >
        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Dobrodružství zcela zdarma</h2>
            <p>Pojdte si s přáteli užít nevídané dobrodružství plné zvratů a hrdinství z pohodlí vašeho domova. Stačí mít jen skupinku statečných přátel a můžete začít třeba hned !</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Registrovat</button>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Zjednodušená pravidla !</h2>
            <p>Aplikace Rozděl a Panuj tradičně složitá a nabobtnaná pravidla stolních her na hrdiny přetváří do zábavného a interaktivního systému pro úplné nováčky nebo veterány žánru</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Pravidla</button>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Plně v češtině !</h2>
            <p>Už se nemusíte snažit krkolomně překládat pravidla zahraničních stolních her pro své kamarády. Rozděl a Panuj je plně v čestině.</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Pravidla</button>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Své dobrodružství, svá úskalí</h2>
            <p> Rozděl a Panuj podporuje naprostou volnost v nastavení každého dobrodružství. Přidejte si svá monstra, dobrodruhy, předměty nebo i lokace !</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Pravidla</button>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default Home