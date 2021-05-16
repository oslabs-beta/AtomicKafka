const express = require('express');
const kafka = require('./kafka');
const kafkaApp = express();
// const testRouter = express.Router();

// socket.io with Express

const path = require("path");

const port = 3001;


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

//goal is to abstract away everything below this line. need

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


const consume = require('./consumer.js')
const produce = require('./producer.js')

const atomicKafka = require('./atomic-kafka');
const atomicKafkaInstance = new atomicKafka();

consume(message => {
  let messageValue = message.value.toString('utf-8');
  io.on('connection', (socket) => {
    socket.emit("newMessage", messageValue)
  })
})
.catch(async error => {
  console.error(error)
  try {
    await consumer.disconnect()
  } catch (e) {
    console.error('Failed to gracefully disconnect consumer', e)
  }
  process.exit(1)
})


io.on('connection', (socket) => {
  socket.on('postMessage', (data) => {
    console.log('***** POST:', data)
    atomicKafkaInstance.produceSample(data);
  })
})



