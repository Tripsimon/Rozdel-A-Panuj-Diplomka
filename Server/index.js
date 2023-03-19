/**
 * Importy
 */
const express = require('express')
const cors = require('cors');
const bp = require('body-parser')
const mongoose = require('mongoose');
const path = require('path')
const axios = require('axios');
const https = require('https')
const { Server } = require('socket.io')

/**
 * Tvorba express serveru
 */
const PORT = process.env.PORT || 3000;
const app = express()
https.createServer(app).listen(PORT, () =>{console.log("Server poslouchá")})

/*
const httpsServer = createServer(app)
const io = new Server(httpsServer,{    
    cors:{origin: '*'}
})
*/


const io = require('socket.io')({
    cors:{
        origin: '*'
    }
});





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

const tridyRouter = require('./routes/tridaRouty.js')
app.use('/tridy',tridyRouter);


app.use(express.static(path.join(__dirname,'/files')))
//img

let users = [];
axios.defaults.baseURL = 'https://api.rozdel-a-panuj.cz'



//Websockets
io.on('connection',socket =>{
    socket.on('joinRoom', (room,userID) =>{
        socket.join(room)
        users[socket.id] = {'sessionID':room , 'userID':userID};
        socket.to(room).emit('resyncPlayers')
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

        axios.get(axios.defaults.baseURL+'/sessions/sessionDisconnect', { params: { sessionID: users[socket.id].sessionID,userID: users[socket.id].userID}})
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

//app.listen(PORT)
