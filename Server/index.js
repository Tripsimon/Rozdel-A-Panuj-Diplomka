const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()
app.use(cors())

//Připojení k DB 
mongoose.connect('mongodb://localhost:3500/RozdelAPanuj_Develop')
    .then(() => console.log("DB connected to docker"))
    .catch(err =>console.log(err));


const PORT = process.env.PORT || 3000;

app.get("/",(req,res) => {
    res.send("Server je aktivnía");
})


app.get('/getClasses',(req,res) =>{
    res.send(['Kolos','Harcovník','Hraničář','Lupič','Čaroděj','Vizír']);
})

const charakterRouter = require('./routes/routeCharacterCreation.js')
app.use('/character',charakterRouter);

const uzivatelRouter = require('./routes/uzivatelskeRouty.js')
app.use('/uzivatel',uzivatelRouter)

app.listen(PORT)
