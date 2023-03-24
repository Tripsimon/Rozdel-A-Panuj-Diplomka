const axios = require('axios');

let users = [];
exports.init = (server) => {
    const io = require('socket.io')(server,{
        cors:{
            origin: '*',
        }
    })
    
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

            if(typeof users[socket.id] === 'undefined'){
                console.log("Prázdnej socket")
                return
            }
    
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
                .catch(err => console.log(err))
    
        })
    })
    
}