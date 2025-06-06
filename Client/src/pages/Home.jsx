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
      <div className='grid items-center justify-center w-full bg-secondary h-[100vh] md:h-full' >
        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl card-title text-primary">Dobrodružství zcela zdarma</h2>
            <div className="divider divider-warning"></div>
            <p>Pojdte si s přáteli užít nevídané dobrodružství plné zvratů a hrdinství z pohodlí vašeho domova. Stačí mít jen skupinku statečných přátel a můžete začít třeba hned !</p>
          </div>
        </div>

        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl card-title text-primary">Zjednodušená pravidla !</h2>
            <div className="divider divider-warning"></div>
            <p>Aplikace Rozděl a Panuj tradičně složitá a nabobtnaná pravidla stolních her na hrdiny přetváří do zábavného a interaktivního systému pro úplné nováčky nebo veterány žánru</p>
            <div className="justify-end mt-2 card-actions">
              <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop" onClick={() => handleNavigation("/rules")}>Pravidla</button>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl card-title text-primary">Plně v češtině !</h2>
            <div className="divider divider-warning"></div>
            <p>Už se nemusíte snažit krkolomně překládat pravidla zahraničních stolních her pro své kamarády. Rozděl a Panuj je plně v čestině.</p>
          </div>
        </div>

        <div className="w-full mt-5 card card-border bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl card-title text-primary">Své dobrodružství, svá úskalí</h2>
            <div className="divider divider-warning"></div>
            <p> Rozděl a Panuj podporuje naprostou volnost v nastavení každého dobrodružství. Přidejte si svá monstra, dobrodruhy, předměty nebo i lokace !</p>
          </div>
        </div>


      </div>
    </>
  )
}

export default Home