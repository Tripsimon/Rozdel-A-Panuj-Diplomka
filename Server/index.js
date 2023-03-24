/**
 * Importy
 */
const express = require('express')
const cors = require('cors');
const bp = require('body-parser')
const mongoose = require('mongoose');
const path = require('path')
const axios = require('axios');
const {init} = require('./websocket.js');


/**
 * Tvorba express serveru
 */
const PORT = process.env.PORT || 3000;
const app = express()
const server = require('http').createServer(app)

app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Připojení k DB 
mongoose.connect('mongodb://lesak:aeynV3pVQJhrAmCdgfr1Scofn@46.36.40.226:27017/lesak?authMechanism=DEFAULT&directConnection=true&authSource=lesak&tls=false&readPreference=primary')
    .then(() => console.log("Server připojen k databázi"))
    .catch(err =>console.log(err));






app.get("/",(req,res) => {
    res.send("Server je aktivní");
})

const charakterRouter = require('./routes/adventurerRouty.js')
app.use('/character',charakterRouter);

const uzivatelRouter = require('./routes/uzivatelskeRouty.js')
app.use('/uzivatel',uzivatelRouter)

const sessionsRouty = require('./routes/sessionsRouty.js');
app.use('/sessions',sessionsRouty)

const pozadiRouter = require('./routes/pozadiRoute.js')
app.use('/pozadi',pozadiRouter);

const vybavaRouter = require('./routes/vybavaRouty.js')
app.use('/vybava',vybavaRouter);

const monsterRouter = require('./routes/monsterRouty.js')
app.use('/monster',monsterRouter);

const schopnostiRouter = require('./routes/schopnostiRouty.js')
app.use('/schopnosti',schopnostiRouter);

const rasyRouter = require('./routes/raceRouty.js')
app.use('/rasy',rasyRouter);

const tridyRouter = require('./routes/tridaRouty.js');
app.use('/tridy',tridyRouter);


app.use(express.static(path.join(__dirname,'/files')))
//img
const devMode = true;
if (devMode) {
    axios.defaults.baseURL = 'http://localhost:3000'

}else{
    axios.defaults.baseURL = 'https://api.rozdel-a-panuj.cz'
}

init(server);

server.listen(PORT)
