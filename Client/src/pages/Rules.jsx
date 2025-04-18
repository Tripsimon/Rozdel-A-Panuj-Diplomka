import React from 'react'
import rules1 from './../assets/images/rules/Naelly_Wizzard.png'
import rules2 from './../assets/images/rules/Naelly_pub.png'
import rules3 from './../assets/images/rules/Naelly_dragon.png'

function Rules() {
  return (
    <div className='object-center w-full'>

      <div className="content-center justify-center grid-cols-1 shadow-sm m-14 bg-secondary card">

        <div className="items-center text-center card-body">
          <h2 className="text-2xl uppercase card-title text-primary">Role hráčů</h2>
          <figure className="px-10 pt-10">
          <img
            src={rules1}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
          <div className="divider divider-warning"></div>
          <p>Hráč může nabít dvou rolí. Slovotepec, který je vypravěčem a správcem příběhu nebo dobrodruh, který
            je součástí zmíněného příběhu.</p>
          <br />
          <p>Prvním a hlavním pravidlem herního systému je fakt, že hráč v roli slovotepce má vždy rozhodující
            slovo a po jeho uvážení je možné upravit i ostatní pravidla. Hlavním cílem Rozděl a Panuj je zábava
            uživatelů. Z tohoto důvodu je tento dokument pravidel spíše soupis tipů, než rigidní soubor pravidel</p>
        </div>
      </div>

      <div className="content-center justify-center grid-cols-1 shadow-sm m-14 bg-secondary card">
        <figure className="px-10 pt-10">
          <img
src={rules2}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="items-center text-center card-body">
          <h2 className="text-2xl uppercase card-title text-primary">Dobrodruzi</h2>
          <div className="divider divider-warning"></div>
          <p>Postava, do níž se hráč stylizuje se nazývá Dobrodruh. Všichni přítomní hráči, vyjma Slovotepce, tvoří
            partu Dobrodruhů.</p>
          <br />
          <p>Celá narace herního příběhu se pohybuje kolem této party. Slovotepec musí připravit takový příběh, který
            bude vyhovovat právě sestavené partě. Platí také, že při umrtídobrodruhů mohou být jednotlivý dobrodruzi
            nahrazeni z důvodu pokročení příběhu</p>
          <br />
          <p>Každý dobrodruh má určenou svou rasu a třídu. Toto rozhoduje, jaké bude mít přiřazeny schopnosti. Tyto
            schopnosti jsou přístupné v detaily dobrodruhů v herní místosti nebo při tvorbě postavy. Použití těchto
            schopností je zapotřebý slovně oznámit herní skupině, aby na tuto skutečnost mohli reagovat.</p>
          <br />
          <p>Atributy dobrodruhů jsou důležitou vlastností, od které se odvíjí výsledky akcí dobrodruhů. Porovnávání
            vždy pracuje na základě šestihranné kostky. Porovnání těchto atributů rozhodne, jaký výsledek kostka
            způsobí. Pokud jsou atributy souměrné, pro úspěch akce je zapotřebý hod kostkou 4 nebo 5 nebo 6 (Dále
            jen 4+). Pokud jsou atributy nepřítele menší, stačí pouze 3+. Pokud jsou dvakrá menší, pro úspěch stačí
            hod 2+. Naopak, pokud jsou atributy oponenta silnější, je zapotřebý hod 5+. Pokud jsou dvakrát větší,
            pro úspěch je zapotřebí hod 6+. Schopnosti mohou čísla atributů i číslo hozené kostkou upravovat, avšak
            hod 1 vždy selže a hod 6 je vždy úspěch</p>

          <br />
          <p>Dobrodruzi mají také inventář, ve kterém mají své předměty. Dobrodruzi si musí dát pozor na váhu všech
            svých předmětů. Mohou být totiž přetíženi a to uvolní ruku Slovotepci k vytváření svízelných situací.
          </p>
        </div>
      </div>

      <div className="content-center justify-center grid-cols-1 shadow-sm m-14 bg-secondary card">
        <figure className="px-10 pt-10">
          <img
src={rules3}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="items-center text-center card-body">
          <h2 className="text-2xl uppercase card-title text-primary">Režim boje a bojová vřava</h2>
          <div className="divider divider-warning"></div>
          <p>Boj je podstatnou čát herního režimu. V každém boji je soubor dobrodruhů a nepřátel. Obě tyto skupiny
            dohromady dávají bojovou vřavu, ve které je uložen průběh boje.</p>
          <br />
          <p>Každý člen bojové vřavy může nabívat tří různých stavů. Stavu připravenosti, který znázorňuje
            připravenost jedince pro konání akce. Stavu unavenosti, znázorňující vyčerpání jedincovy akce a stavu
            omráčení, který znázorňuje nemožnost jedince konat. Připravený stav je zobrazený vyplněným barevným
            polem, stav vyčerpání je zobrazen pouze obrysem pole. Stav omráčení je znázorněn ikonou blesku. Ikona
            vlaječky znázorňuje právě vybraného jedince pro výkon akce.
          </p>
          <br />
          <p>Vlastní boj je rozělen do tří fází. Fáze zásahu, ve kterém se porovnávají atributy obratností obou
            účastníků souboje. Po této fázi následuje fáze průrazu, ve které se porovná průraznost zbraně dobrodruha
            a číslo zbroje nepřítele. V poslední řadě přicházífáze zteče, ve které se vypočíá konečné poškození
            udělené nepříteli. Vždy je udělen základ poškození. Na hodu kostkou však závisí násobek udělené
            závažnosti. Při neuspěchu kterékoliv z fází útočná sekvence však končí.
          </p>
          <br />
          <p>(Dobrodruh se rozhodl zaůtočit na skřeta. Jako první dobrodruh zjiství své číslo obratnosti které je 8.
            Oproti němu skřet má číslo pouze 5. Atribut dobrodruha je větší, avšak né dvojnásobně. To znamená že na
            ůspěšný zásah potřebuje hod kostkou 3+. Dobrodruh byl šťastný a kostku hodil pod číslem 2. To znamená že
            pokračuje k fázi průrazu. Jeho zbrań má průraznost dva. Nepřítel má však číslo zbroje čtyři. To znamená
            že pro ůspěch potřebuje dobrodruh hodit 6+. To se mu podaří a přesouvá se k režimu zteče. Základ
            poškození jeho zbraně je pět. Závažnost poškození je tři. Po hodu kostkou dva je tedy zřejmé, že skřet
            obdrží jedenáct bodů poškození.)
          </p>

          <br />
          <p>Boj funguje stejným způsobem ze strany nepřátel.
          </p>
        </div>
      </div>


    </div>
  )
}

export default Rules