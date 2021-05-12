const express = require('express');
const kafka = require('./kafka');
const kafkaApp = express();
// const testRouter = express.Router();

// socket.io with Express

const path = require("path");

const port = 3001;
const consume = require('./consumer.js')
// const consumerEvents = consumer.events;
// console.log("CONSUMER EVENTS: ", consumer.events);


const producer = require('./producer.js')
// const producerEvents = producer.events;




kafkaApp.use(express.urlencoded({ extended:true }))
kafkaApp.use(express.json());

// kafkaApp.use('/', testRouter);

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

//connect the consumer to the kafka cluster


consume(message => {
  let messageValue = message.value.toString('utf-8');
  console.log('socket emit message ', messageValue)
  io.on('connection', (socket) => {
    // let messageValue = message.value;

    socket.emit("newMessage", messageValue)
      // .then(arg => console.log('***THEN arg:', arg))
      // .catch((err) => console.log('error in emitter, ' + err))
  })
    // .then( io.on('newMessage', console.log('received message:', message)))
    // .catch(err => console.log('***ERR', err))
  // console.log('socket emit message ', message)
  // let messageKey = JSON.stringify(message.key);
  // let messageKey = message.key.toString('utf-8');
  // console.log('*** messageValue', messageValue);
  // console.log('*** messageKey', messageKey);
  // io.on('newMessage', () => console.log('****Jumping Jehozavat'))
})


// io.on('connection', (socket) => {
//   socket.on('newMessage', (arg) => {
//     console.log('listener argument', arg)
//   })
//   console.log('this should appear after socket emit');
// })

// io.on('connection', (client) => {
//   console.log('server.js: IO Connected');
//   // console.log('*** client', client.client)
//   // client.emit('client emitting')
//   //this is where the error is
//   // consumer.on(consumerEvents.REQUEST, function (message) {
//     //   // console.log('*** IS THIS THE INSTRUMENT',message);
//     //   client.emit('event', message.value);
//     //   console.log("MESSAGE VALUE", message);
//     // });

//   client.on('newMessage', (message) => {
//     console.log('*** MESSAGE SENT:', message.value.toString('utf-8'))
//   })
//   client.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

