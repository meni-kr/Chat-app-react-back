import { Server } from "socket.io"


var gIo = null

export function setupSocketAPI(server){
    gIo = new Server(server,{
        cors:{
            origin:process.env.ORIGIN,
        }
    })

    gIo.on('connection', (socket) => {
        socket.on('disconnect', socket => {
            // logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('set-user-socket', userId => {
            console.log(`setup login user socket with userId: ${userId}`)
            socket.userId = userId
        })

        socket.on('unset-user-socket', userId => {
            // logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            console.log(`logout user socket with userId: ${userId}`)
            delete socket.userId
        })
    })
}