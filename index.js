const { WebSocketServer, OPEN } = require('ws')
const { hash } = require('./hashing')

const port = 8080
const wss = new WebSocketServer({ port })

console.log(`えもーじサーバー起動`)
console.log(` ws://localhost:${port}`)

wss.on('connection', (ws, req) => {
  ws.on('message', (data) => {
    console.log(`cli > ${data}`)

    const ipId = hash(req.socket.remoteAddress)

    wss.clients.forEach((client) => {
      if (client.readyState === OPEN) {
        client.send(`${ipId}: ${data}`)
      }
    })
  })

  ws.send('Welcome! えもーーじサーバー')
})
