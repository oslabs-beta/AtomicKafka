const { Kafka } = require('kafkajs')
const produce = require('./producer.js')
const consume = require('./consumer.js')

//connect the websocket to the server

const io = require('socket.io')


class atomicKafka {
	constructor(){
		//connect atomicKafka to the kafka client
		this.kafkaAccess = Kafka,
		this.produceSample = produce, //produceFn takes in 2 args: data, callback
		this.consumeSample = consume //consumeSample takes in 1 arg: callback
		//add consumer and producer functions here
		//set a poperty on atomic kafka that initializes an socket instance
	}
	// generateKafaClient
	// generateWebSocker
}

// const



module.exports = atomicKafka;




