import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import path from 'path'

import './database'
import { routes } from './routes'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (request, response) => {
    return response.render('html/client.html')
})

const http = createServer(app) // Criando Protocólo HTTP
const io = new Server(http) // Criando Protocólo WebSocket

io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} se conectou`)
})

app.use(express.json())

app.use(routes)

http.listen(3000, () => console.log('🚀 O servidor está rodando na porta 3000'))