// server.js

const express = require('express');
const ws = require('ws');
const uuid = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new ws.Server({ server });

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

function randomColour() {
  const randomizer = Math.floor(Math.random() * 4);
  switch(randomizer) {
    case 0:
      return 'colour0';
    case 1:
      return 'colour1';
    case 2:
      return 'colour2';
    case 3:
      return 'colour3';
    default:
      return 'colour0';
  }
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client server has connected....');
  ws.colour = randomColour();
  // console.log(ws.colour);
  let userCount = wss.clients.size;
  const userJoin = {id: uuid(), type: 'postNotification', content: 'A new user has joined the room.', userCount}
  broadcast(JSON.stringify(userJoin))


  ws.on('message', (message) => {
    const messageObj = JSON.parse(message);
    messageObj.id = uuid();
    messageObj.userCount = userCount;
    messageObj.colour = ws.colour;
    // console.log("here is your colour: ", messageObj.colour)
    broadcast(JSON.stringify(messageObj));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected.')
    userCount = wss.clients.size;
    const userLeave = {id: uuid(), type: 'postNotification', content: 'A new user has left the room.', userCount}
    broadcast(JSON.stringify(userLeave))

  });
});