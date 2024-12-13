import { Server } from "socket.io"


var gIo = null

export function setupSocketAPI(server){
    gIo = new Server(server,{
        cors:{
            origin:'*'
        }
    })

    gIo.on('connection', (socket) => {
        const userId = socket.handshake.query.userId

        socket.on('set-user-socket', userId => {
            socket.userId = userId
        })

        socket.on('unset-user-socket', () => {
            logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            delete socket.userId
        })
    })
}