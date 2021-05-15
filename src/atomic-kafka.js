const { Kafka } = require('kafkajs')
const produce = require('./producer.js')

//class created for a single consumer
const Consumer = require('./consumer.js');

class AtomicKafka {
	constructor(kafkaServer){
		//connect atomicKafka to the kafka client
		this.kafkaAccess = Kafka;
		this.produceSample = produce; //produceFn takes in 2 args: data, callback
		this.Consumers = {}; //consumeSample takes in 1 arg: callback
		this.io = require('socket.io')(kafkaServer, {
			cors: {
				origin: '*',
			}
		});
	}
	//function to create a new consumer
	//need to add an error that
	newConsumer(groupId){
		this.Consumers[groupId] = new Consumer(groupId);
	}


	//pass in topic string
	async socketConsume (groupId, topic) {
		const localConsumer = this.Consumers[groupId];
		// console.log('*****LOCAL:',localConsumer)
		localConsumer.consume(message => {
			let messageValue = message.value.toString('utf-8');
			this.io.on('connection', (socket) => {
				socket.emit("newMessage", messageValue)
			})
		}, topic)
		.catch(async error => {
			console.error(error)
			try {
				await localConsumer.disconnect()
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

module.exports = AtomicKafka;




