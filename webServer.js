#!/usr/bin/env node
const express = require("express")
const WebSocket = require('ws')
const http = require('http')


const App = express()
const Server = http.createServer(App)
const wss = new WebSocket.Server({server: Server})

 wss.on("connection", (ws, req)=>{


    ws.on('message', (message) =>{
        console.log("Message Recieved = "+message);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message.toString());
            }
          });
    })

    ws.on('close', ()=>{
        console.log("Client disconnected")
    }) 
})



Server.on('error', (error) => {
    console.error('Server error:', error);
  });

App.get('/', (req, res) => {
  //res.send("Test");
    res.sendFile(__dirname + '/index.html')
})

Server.listen(9999, ()=>{
})


