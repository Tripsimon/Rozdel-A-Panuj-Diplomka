// Autentifikace
db = db.getSiblingDB('admin');
db.auth("root", "Aa123456");
db = db.getSiblingDB('db_rozdel_a_panuj');

// Administrátor
db.users.insertOne({
  email: 'admin@rap.cz',
  heslo: '$2b$10$0t0jRRL3sDcb4XGMA4MNJ.aaBR6yW.Gz350eFtmtgSToK2N7f/VBq',
  prezdivka: 'admin',
  opravneni: 'administrator',
})

//Clovek Ability
legionAilities = db.abilities.insertMany([
  {
  jmeno: "Aktivka",
  typPouziti: "Active",
  pocetPouziti: 5,
  cd: 5,
  majitel:'Říšský člověk',
  popisFluff:'Říšský člověk',
  popisSchopnosti:'Říšský člověk'
  },
  {
    jmeno: "Aktivka",
    typPouziti: "Passive",
    pocetPouziti: 5,
    cd: 5,
    majitel:'Říšský člověk',
    popisFluff:'Říšský člověk',
    popisSchopnosti:'Říšský člověk'}
  ])
legionAilitiesID = Object.values(legionAilities['insertedIds'])
rasy = db.races.insertMany([
  {
    jmeno: 'Říšský člověk',
    popis: "Popis",
    bonusoveAtributy:{
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
  },
  schopnosti: legionAilitiesID,
  dostupneTridy:["String","IDCEK"],
  },
  {
    jmeno: 'Grobr',
    popis: "Popis",
    bonusoveAtributy:{
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
  },
  schopnosti:["String","IDCEK"],
  dostupneTridy:["String","IDCEK"],
  },
  {
    jmeno: 'Hruurský člověk',
    popis: "Popis",
    bonusoveAtributy:{
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
  },
  schopnosti:["String","IDCEK"],
  dostupneTridy:["String","IDCEK"],
  },
  {
    jmeno: 'Ork',
    popis: "Popis",
    bonusoveAtributy:{
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
  },
  schopnosti:["String","IDCEK"],
  dostupneTridy:["String","IDCEK"],
  },
  {
    jmeno: 'Inu-Im',
    popis: "Popis",
    bonusoveAtributy:{
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
  },
  schopnosti:["String","IDCEK"],
  dostupneTridy:["String","IDCEK"],
  }
]);


