const express = require('express')
const cors = require('cors');
const bp = require('body-parser')
const mongoose = require('mongoose');
const path = require('path')
const axios = require('axios');
const io = require('socket.io')(3001,{
    cors:{
        origin: '*'
    }
});

const app = express()
app.use(cors());
//Body Parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Připojení k DB 
mongoose.connect('mongodb://localhost:3500/RozdelAPanuj_Develop')
    .then(() => console.log("Server připojen k databázi"))
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

const schopnostiRouter = require('./routes/schopnostiRouty.js')
app.use('/schopnosti',schopnostiRouter);

const rasyRouter = require('./routes/raceRouty.js')
app.use('/rasy',rasyRouter);

const tridyRouter = require('./routes/tridaRouty.js')
app.use('/tridy',tridyRouter);


app.use(express.static(path.join(__dirname,'/files')))
//img

let users = [];

//Websockets
io.on('connection',socket =>{

    socket.on('joinRoom', (room,userID) =>{
        socket.join(room)
        users[socket.id] = {'sessionID':room , 'userID':userID};
        socket.to(room).emit('resyncPlayers')
        console.log(users)

    })

    socket.on('resyncPlayers', (room) =>{
        socket.to(room).emit('resyncPlayers')
    })

    socket.on('resyncGamemode',(room,mode) =>{
        socket.to(room).emit('resyncGamemode',mode)
    })

    socket.on('resyncBattle',(room,dataBoje) =>{
        socket.to(room).emit('resyncBattle',dataBoje)
    })

    socket.on('disconnect', ()=>{
        console.log('Odpojil se socket ' + socket.id)
        console.log(users)

        axios.get('http://localhost:3000/sessions/sessionDisconnect', { params: { sessionID: users[socket.id].sessionID,userID: users[socket.id].userID}})
            .then(queryResponse => {
                switch (queryResponse.data) {
                    case 'sessionDelete':
                        
                        break;
                
                    default:
                        break;
                }
                socket.to(users[socket.id].sessionID).emit('resyncPlayers')
                console.log(queryResponse.data)
            })

    })
})

app.listen(PORT)
