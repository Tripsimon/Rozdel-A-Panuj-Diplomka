// Autentifikace
db = db.getSiblingDB('admin');
db.auth("root", "Aa123456");
db = db.getSiblingDB('db_rozdel_a_panuj');

// Administrátor
db.users.insertOne({
  email: 'admin@rap.cz',
  heslo: 'Aa123456',
  prezdivka: 'admin',
  opravneni: 'administrator',
})

vec = db.races.insertMany([
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
  schopnosti:["String","IDCEK"],
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

db.ungabunga.insertOne({
  dsa: vec
})

