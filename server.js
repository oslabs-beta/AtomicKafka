const express = require('express');
const kafka = require('./kafka');
const kafkaApp = express();
const testRouter = express.Router();

const path = require("path");

const port = 3001;
// const consumer = require('./consumer.js')
// const producer = require('./producer.js')

kafkaApp.use(express.urlencoded({ extended:true }))
kafkaApp.use(express.json());

kafkaApp.use('/', testRouter);

kafkaApp.get('/', (req,res) => {
  console.log('*** kafkaApp.get( / )');
  res.sendFile(path.resolve(__dirname + '/index.html'))
})

/**
 * 404 handler
 */
 kafkaApp.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

/**
 * Global error handler
 */
kafkaApp.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send('********** GLOBAL INTERNAL SERVER / 500 ERROR **********');
});


const server = kafkaApp.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});



const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', client => {
  console.log('Connected', client);
  consumer.on('message', function (message) {
    console.log(message);
    client.emit('event', message.value);
  });
  client.on('disconnect', () => {
    console.log('Client disconnected');
   });
});