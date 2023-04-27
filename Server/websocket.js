// Importy
const axios = require('axios');

// Variable pro práci s herními místnostmi
let users = [];

// Založení instance sockets.io
exports.init = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*'
        }
    })

    // Websockets
    io.on('connection', socket => { // Připojení socketu
        socket.on('joinRoom', (room, userID) => {
            socket.join(room)
            users[socket.id] = {
                'sessionID': room,
                'userID': userID
            };
            socket.to(room).emit('connectedUser')
        })

        // Požadavek na sychnornizaci hráčů
        socket.on('resyncPlayers', (room) => {
            socket.to(room).emit('resyncPlayers')
        })

        // Požadavek na sychnornizaci hráčů
        socket.on('resyncGamemode', (room, mode) => {
            socket.to(room).emit('resyncGamemode', mode)
        })

        // Požadavek na sychnornizaci herního modu
        socket.on('resyncBattle', (room, dataBoje) => {
            socket.to(room).emit('resyncBattle', dataBoje)
        })

        socket.on('unMount', (identity) => {

            socket.disconnect()


        })

        // Požadavek na ukončení herní místnosti
        socket.on('disconnect', () => {
            console.log('Odpojil se socket ' + socket.id)

            if (typeof users[socket.id] === 'undefined') {
                return
            }

            try {
                axios.get(axios.defaults.baseURL + '/sessions/sessionDisconnect', {
                    params: {
                        sessionID: users[socket.id].sessionID,
                        userID: users[socket.id].userID
                    }
                })
                .then(queryResponse => {
                    
                    if(queryResponse.data == "Session Deleted"){
                        socket.to(users[socket.id].sessionID).emit('disconnectedUser', "Owner")
                    }

                    delete users[socket.id]
                })
                .catch(error => console.log("Chyba při odpojení hráče: " + error))

            } catch (error) {
                console.log("Chuba při odeslání požadavku na odpojení hráče")
            }


        })
    })

}
