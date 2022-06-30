const { WebSocketServer, OPEN } = require('ws')
const { emojify } = require('./emojify')
const { hash } = require('./hashing')

const port = 8080
const wss = new WebSocketServer({ port })

console.log(`えもーじサーバー起動`)
console.log(` ws://localhost:${port}`)

wss.on('connection', (ws, req) => {
  ws.on('message', (data) => {
    const msg = emojify(String(data))
    const id = hash(req.socket.remoteAddress)

    console.log(`[${id}] > ${msg}`)

    wss.clients.forEach((client) => {
      if (client.readyState !== OPEN) return
      client.send(JSON.stringify({ id, msg, time: Date.now() }))
    })
  })

  ws.send('Welcome! えもーーじサーバー')
})
