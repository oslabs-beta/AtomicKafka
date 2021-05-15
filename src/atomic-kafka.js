const { Kafka } = require('kafkajs')
const produce = require('./producer.js')
const consume = require('./consumer.js')
// const io = require('./kafkaServer.js')
//connect the websocket to the kafkaServer
// const kafkaServer = require('./kafkaServer.js');
const { consumer } = require('./kafka.js');
// const io = require('socket.io')(kafkaServer, {cors: {origin: '*'}});

// const io = require('socket.io')(kafkaServer, {cors: {origin: '*'}});

class atomicKafka {
	constructor(io){
		//connect atomicKafka to the kafka client
		this.kafkaAccess = Kafka,
		this.produceSample = produce, //produceFn takes in 2 args: data, callback
		this.consumeSample = consume //consumeSample takes in 1 arg: callback
		this.io = io;
		//add consumer and producer functions here
		//set a poperty on atomic kafka that initializes an socket instance
	}
	// generateKafaClient
	// generateWebSocker
	socketConsume () {
		this.consumeSample(message => {
			let messageValue = message.value.toString('utf-8');
			this.io.on('connection', (socket) => {
				socket.emit("newMessage", messageValue)
			})
		})
		.catch(async error => {
			console.error(error)
			try {
				await this.consumeSample.disconnect()
			} catch (e) {
				console.error('Failed to gracefully disconnect consumer', e)
			}
			process.exit(1)
		})
	}

	socketProduce () {
		this.io.on('connection', (socket) => {
			socket.on('postMessage', (data) => {
				console.log('***** POST:', data)
				this.produceSample(data)
			})
		})
	}
}




//is there a reason why this should be asynchronous? taking from kafkaServer.js

module.exports = atomicKafka;




