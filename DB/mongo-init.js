const { db } = require("../Server/models/ClassModel");

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

//*****SCHOPNOSTI

//Človek Ability
legionAilities = db.abilities.insertMany([
  {
    jmeno: "Aktivka",
    typPouziti: "Active",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Říšský člověk',
    popisFluff: 'Říšský člověk',
    popisSchopnosti: 'Říšský člověk'
  },
  {
    jmeno: "Pasivka",
    typPouziti: "Passive",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Říšský člověk',
    popisFluff: 'Říšský člověk',
    popisSchopnosti: 'Říšský člověk'
  }
])
legionAilitiesID = Object.values(legionAilities['insertedIds'])

//Grobr Ability
grobrAbilities = db.abilities.insertMany([
  {
    jmeno: "Aktivka",
    typPouziti: "Active",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Grobr',
    popisFluff: 'Grobr',
    popisSchopnosti: 'Grobr'
  },
  {
    jmeno: "Pasivka",
    typPouziti: "Passive",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Grobr',
    popisFluff: 'Grobr',
    popisSchopnosti: 'Grobr'
  }
])
grobrAbilitiesID = Object.values(grobrAbilities['insertedIds'])

//Hruurský člověk Ability
hruurAbilities = db.abilities.insertMany([
  {
    jmeno: "Aktivka",
    typPouziti: "Active",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Hruurský člověk',
    popisFluff: 'Hruurský člověk',
    popisSchopnosti: 'Hruurský člověk'
  },
  {
    jmeno: "Pasivka",
    typPouziti: "Passive",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Hruurský člověk',
    popisFluff: 'Hruurský člověk',
    popisSchopnosti: 'Hruurský člověk'
  }
])
hruurAbilitiesID = Object.values(hruurAbilities['insertedIds'])

//Orc Ability
orcAbilities = db.abilities.insertMany([
  {
    jmeno: "Aktivka",
    typPouziti: "Active",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Orc',
    popisFluff: 'Orc',
    popisSchopnosti: 'Orc'
  },
  {
    jmeno: "Pasivka",
    typPouziti: "Passive",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Orc',
    popisFluff: 'Orc',
    popisSchopnosti: 'Orc'
  }
])
orcAbilitiesID = Object.values(orcAbilities['insertedIds'])

//Inu-Im Ability
inuimAbilities = db.abilities.insertMany([
  {
    jmeno: "Aktivka",
    typPouziti: "Active",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Inu-Im',
    popisFluff: 'Inu-Im',
    popisSchopnosti: 'Inu-Im'
  },
  {
    jmeno: "Pasivka",
    typPouziti: "Passive",
    pocetPouziti: 5,
    cd: 5,
    majitel: 'Inu-Im',
    popisFluff: 'Inu-Im',
    popisSchopnosti: 'Inu-Im'
  }
])
inuimAbilitiesID = Object.values(inuimAbilities['insertedIds'])

//***** /SCHOPNOSTI */

//***** Tridy */
db.classes.insert({
  jmeno: 'Bojovnik',
  popis: 'String',
  pasivniSchopnost: 'String',
  schopnosti: ['String'],
  bonusovaVybava: ['String'],
  hlavniVybava: ['String'],
  krajniVybava: ['String'],
  zbrojVýbava: ['String'],
  role: 'String',
  trueZbrane: 'String'
})



rasy = db.races.insertMany([
  {
    jmeno: 'Říšský člověk',
    popis: "Popis",
    bonusoveAtributy: {
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
    },
    schopnosti: legionAilitiesID,
    dostupneTridy: ["String", "IDCEK"],
  },
  {
    jmeno: 'Grobr',
    popis: "Popis",
    bonusoveAtributy: {
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
    },
    schopnosti: grobrAbilitiesID,
    dostupneTridy: ["String", "IDCEK"],
  },
  {
    jmeno: 'Hruurský člověk',
    popis: "Popis",
    bonusoveAtributy: {
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
    },
    schopnosti: hruurAbilitiesID,
    dostupneTridy: ["String", "IDCEK"],
  },
  {
    jmeno: 'Ork',
    popis: "Popis",
    bonusoveAtributy: {
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
    },
    schopnosti: orcAbilitiesID,
    dostupneTridy: ["String", "IDCEK"],
  },
  {
    jmeno: 'Inu-Im',
    popis: "Popis",
    bonusoveAtributy: {
      sila: 5,
      houzevnatost: 5,
      obratnost: 5,
      charisma: 5,
      inteligence: 5,
      znalost: 5
    },
    schopnosti: inuimAbilitiesID,
    dostupneTridy: ["String", "IDCEK"],
  }
]);


