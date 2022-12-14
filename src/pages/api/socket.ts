import { Server } from 'socket.io'
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', async (socket) => {
      socket.on('click', () => {
        console.log('click!')
        const raw = readFileSync(join(process.cwd(), 'json') + '/data.json').toString()
        let clicks = JSON.parse(raw).clicks;
        clicks++;
        writeFileSync(join(process.cwd(), 'json') + '/data.json', JSON.stringify({clicks}))
        socket.broadcast.emit('update-click', clicks)
      })
    })
  }
  res.end()
}

export default SocketHandler