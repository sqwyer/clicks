import { Server } from 'Socket.IO'
import { read, write } from '../../helpers/data'

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('click', () => {
        let clicks = read();
        clicks++;
        write(clicks);
        socket.broadcast.emit('update-click', clicks)
      })
    })
  }
  res.end()
}

export default SocketHandler