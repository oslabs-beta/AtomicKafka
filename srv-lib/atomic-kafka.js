const { Kafka } = require('kafkajs')

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
	//instantiate a new consumer
	newConsumer(groupId){
		this.Consumers[groupId] = new Consumer(groupId);
	}

	//instantiate a new stream producer
	newProducer(topic){
		this.Producers[topic] = new Producer(topic);
	}

	//instantiate a new sumbission producer
	newSubmitProducer(topic){
		this.SubmitProducers[topic] = new SubmitProducer(topic);
	}


	//start the consumation process using
	socketConsume (groupId, topic) {
		const localConsumer = this.Consumers[groupId];
		localConsumer.consume(message => {
			let messageValue = message.value.toString('utf-8');
			this.io.on('connection', (socket) => {
				socket.emit("newMessage", messageValue)
			})
		}, topic)
		.catch(error => {
			try {
				localConsumer.disconnect()
			} catch (e) {
				console.error('Failed to gracefully disconnect consumer', e)
			}
			process.exit(1)
		})
	}

	//begin producing off of a file stream
	socketProduce (topic, interval) {
		const localProducer = this.Producers[topic];
		localProducer.produce(interval);
	}

	//begin producing off of a submission
	socketSubmitProduce (topic, interval) {
		const localProducer = this.SubmitProducers[topic];
		this.io.on('connection', (socket) => {
			socket.on('postMessage', (arg) => {
				localProducer.produce(interval, arg);
			})
		})
	}
}


module.exports = AtomicKafka;