const { Kafka } = require('kafkajs')
const produce = require('./producer.js')

//class created for a single consumer
const Consumer = require('./consumer.js');
const Producer = require('./producer.js');
const SubmitProducer = require('./submitProducer.js');

class AtomicKafka {
	constructor(kafkaServer){
		//connect atomicKafka to the kafka client
		this.kafkaAccess = Kafka;
		this.Consumers = {};
		this.Producers = {};
		this.SubmitProducers = {};
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
	newProducer(topic){
		this.Producers[topic] = new Producer(topic);
	}
	newSubmitProducer(topic){
		this.SubmitProducers[topic] = new SubmitProducer(topic);
	}


	//pass in topic string
	socketConsume (groupId, topic) {
		const localConsumer = this.Consumers[groupId];
		localConsumer.consume(message => {
			let messageValue = message.value.toString('utf-8');
			this.io.on('connection', (socket) => {
				socket.emit("newMessage", messageValue)
			})
		}, topic)
		.catch(error => {
			// console.error(error)
			try {
				localConsumer.disconnect()
			} catch (e) {
				console.error('Failed to gracefully disconnect consumer', e)
			}
			process.exit(1)
		})
	}

	socketProduce (topic, interval) {
		const localProducer = this.Producers[topic];
		localProducer.produce(interval);
	}

	socketSubmitProduce (topic, interval) {
		const localProducer = this.SubmitProducers[topic];
		this.io.on('connection', (socket) => {
			socket.on('postMessage', (arg) => {
				localProducer.produce(interval, arg);
			})
		})
	}
}




//is there a reason why this should be asynchronous? taking from kafkaServer.js

module.exports = AtomicKafka;