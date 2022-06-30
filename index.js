const { WebSocketServer } = require('ws')

const port = 8080
const wss = new WebSocketServer({ port })

console.log(`emoji server start port: ${port}`)

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('cli >', data)
    ws.send(data)
  })

  ws.send('Welcome! えもーーじサーバー')
})
