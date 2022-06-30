var ws = require('websocket.io')

var server = ws.listen(5000, function () {
  console.log('Listening on port 5000')
})

server.on('connection', function (client) {
  console.log('Client connected: ' + server.clientsCount)

  client.on('message', function (msg) {
    server.clients.forEach(function (c) {
      if (c == null) return
      c.send(msg)
    })
  })

  client.on('close', function () {
    console.log('Client disconnected: ' + server.clientsCount)
  })

  client.on('error', function (err) {
    console.log('Error: ' + err.code)
  })
})
