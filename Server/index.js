const express = require('express')
const cors = require('cors');
const bp = require('body-parser')
const mongoose = require('mongoose');
const path = require('path')
const io = require('socket.io')(3001,{
    cors:{
        origin: 'http://127.0.0.1:5173'
    }
});

const app = express()
app.use(cors());
//Body Parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Připojení k DB 
mongoose.connect('mongodb://localhost:3500/RozdelAPanuj_Develop')
    .then(() => console.log("DB connected to docker"))
    .catch(err =>console.log(err));


const PORT = process.env.PORT || 3000;

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

const schopnostiRouter = require('./routes/schopnostiRouty')
app.use('/schopnosti',schopnostiRouter);


app.use(express.static(path.join(__dirname,'/uploads')))
//img
app.get('/obr',(req,res) =>{
    
})


//Websockets
io.on('connection',socket =>{
    socket.on('playerJoined', () => {
        io.emit('updatePlayers')
    })
})



app.listen(PORT)
