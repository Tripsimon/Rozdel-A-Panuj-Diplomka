

db.createUser({
  user: 'root',
  pwd: 'Aa123456',
  roles: [
      {
          role: 'readWrite',
          db: 'db_rozdel_a_panuj',
      },
  ],
});



db.races.insertOne(
  {
    name: 'Rasa'
  }
);
