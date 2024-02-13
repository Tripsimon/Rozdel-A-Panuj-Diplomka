// Autentifikace
db = db.getSiblingDB('admin');
db.auth("root", "Aa123456");
db = db.getSiblingDB('db_rozdel_a_panuj');


vec = db.races.insertMany([
  {
    jmeno: 'Rasa',
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
    jmeno: 'Rasa2',
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

