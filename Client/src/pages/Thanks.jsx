import React from 'react'

function Thanks() {
  return (

    <div className='content-center justify-center grid-cols-1 shadow-sm m-14 bg-secondary card'>
      <div className="items-center text-center card-body">
        <h2 className="text-2xl uppercase card-title text-primary">Martin Lešák - FIM UHK</h2>


        <p>Tato práce je předmětem tvorby bakalářské a diplomové práce na Fakultě Informatiky a Managementy Univerzity Hradec
          Králové. </p>
        <br />
        <p>2022 - 2025</p>
      </div>
      <div className="divider divider-warning"></div>

      <div className="items-center text-center card-body">
        <h2 className="text-2xl uppercase card-title text-primary">Paní Nam Le </h2>

        <p>Děkuji paní Nam Le za výpomoc při tvorbě grafických prvků projektu</p>
      </div>

      <div className="divider divider-warning"></div>
      <div className="items-center text-center card-body">
        <h2 className="text-2xl uppercase card-title text-primary">Pan Petr Bauver </h2>


        <p>Děkuji panu Ing. Petru Bauerovi, Ph.D za jeho astistenci při tvorbě projektu</p>
      </div>
      <div className="divider divider-warning"></div>
      <div className="items-center text-center card-body">
        <h2 className="text-2xl uppercase card-title text-primary">Pikolíci</h2>

        <p>Děkuji hernímu spolku Pikolíci za pomoc při testování herního modelu</p>
      </div>
    </div>
  )
}

export default Thanks