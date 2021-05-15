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
  res.sendFile(path.resolve(__dirname + './../index.html'))
})

/**
 * 404 handler
 */
kafkaApp.use('*', (req, res) => {
  return res.status(404).send('********** KAFKASERVER GLOBAL BAD REQUEST / 404 ERROR **********');
});

/**
 * Global error handler
 */
kafkaApp.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send('********** KAFKASERVER GLOBAL INTERNAL SERVER / 500 ERROR **********');
});


const kafkaServer = kafkaApp.listen(port, () => {
  console.log(`Listening on port ${kafkaServer.address().port}`);
});



const AtomicKafka = require('./atomic-kafka.js')
const atomicKafkaInstance = new AtomicKafka(kafkaServer);
atomicKafkaInstance.newConsumer('truck-group');
atomicKafkaInstance.socketConsume('truck-group', 'test_topic');
atomicKafkaInstance.newProducer('test_topic');
atomicKafkaInstance.socketProduce('test_topic');
