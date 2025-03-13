print("ZACINAM INIT")

db.createCollection("users");


adminUser = db.users.insert({
  email: "admin",
  heslo: "$2b$10$P.XON4PqAETDBDxEJDeFF.TsNLj0kKeZX2shdDWkD4Oy.ZXjAK5f.",
  prezdivka: "admin",
  
})

// ==================
// Schopnosti
// ==================

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

// ==================
// /Schopnosti
// ==================

// ==================
// Tridy
// ==================

fighterClass =  db.classes.insert({
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
fighterClassID = Object.values(fighterClass['insertedIds'])

rangerClass =  db.classes.insert({
  jmeno: 'Hraničář',
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
rangerClassID = Object.values(rangerClass['insertedIds'])

mageClass =  db.classes.insert({
  jmeno: 'Mág',
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

mageClassID = Object.values(mageClass['insertedIds'])

var humanClasses = []
humanClasses.push(fighterClassID[0])
humanClasses.push(rangerClassID[0])
humanClasses.push(mageClassID[0])

// ==================
// RASY
// ==================

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
    dostupneTridy: humanClasses,
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
    dostupneTridy: humanClasses,
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
    dostupneTridy: humanClasses,
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
    dostupneTridy: humanClasses,
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
    dostupneTridy: humanClasses,
  }
]);

// ==================
// //RAS
// ==================

// ==================
// /Tridy
// ==================

print("KONCIM INIT")
