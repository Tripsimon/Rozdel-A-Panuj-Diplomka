//Importy
const express = require('express')
const cors = require('cors');
const bp = require('body-parser')
const mongoose = require('mongoose');
const path = require('path')
const axios = require('axios');
const {init} = require('./websocket.js');


//Tvorba express serveru
const PORT = process.env.PORT || 3001;
const app = express()
const server = require('http').createServer(app)

//Použití balíčků
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Připojení k DB 
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://root:Aa123456@localhost:3002/db_rozdel_a_panuj?directConnection=true',{authSource:'admin'})
    .then(() => {
        console.log("Server připojen k databázi");
    })
    .catch(err =>{
        console.log("Nepodařilo se připojit k DB containeru")
        console.log(err)
    });


//Definování routeru
app.get("/",(req,res) => {
    res.send("Server je aktivní");
})

const configRouter = require('./routes/configRoute.js')
app.use('/config',configRouter);

const charakterRouter = require('./routes/adventurerRouty.js')
app.use('/character',charakterRouter);

const uzivatelRouter = require('./routes/uzivatelskeRouty.js')
app.use('/uzivatel',uzivatelRouter)

const sessionsRouty = require('./routes/sessionsRouty.js');
app.use('/sessions',sessionsRouty)

const pozadiRouter = require('./routes/pozadiRoute.js')
app.use('/pozadi',pozadiRouter);

const localityRouter = require("./routes/localityRouty.js")
app.use('/locality',localityRouter)

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

//Zpřístupnění serverových dat
app.use(express.static(path.join(__dirname,'/files')))

//Vývojářský režim
const devMode = true;
if (devMode) {
    axios.defaults.baseURL = 'http://localhost:3000'

}else{
    axios.defaults.baseURL = 'https://api.rozdel-a-panuj.cz'
}
//Websockets
init(server);

//Inicializace serveru
server.listen(PORT)
