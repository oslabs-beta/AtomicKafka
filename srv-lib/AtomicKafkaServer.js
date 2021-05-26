const { Kafka } = require('kafkajs')

const Consumer = require('./consumer.js');
const Producer = require('./producer.js');

/**
 * Defines the AtomicKafka class
 * an instance of AtomicKafka accepts an instance of a node server that listens on a user-specified port
 *
 * @kafkaServer : node server instance that listens on a user defined port
 *
 *
 */


class AtomicKafkaServer {
	constructor(kafkaServer){
		//connect atomicKafka to the kafka client
		this.kafkaAccess = Kafka;
		this.Consumers = {};
		this.Producers = {};
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


	//pass in topic string
	socketConsume (groupId, topic, event) {
		const localConsumer = this.Consumers[groupId];
		localConsumer.consume(message => {
			let messageValue = message.value.toString('utf-8');
			this.io.on('connection', (socket) => {
				socket.emit(event, messageValue)
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


	localProduce (data, topic) {
		const localProducer = this.Producers[topic];
		localProducer.produce(data, topic);
	}

	globalProduce (event, topic) {
		const globalProducer = this.Producers[topic];
		this.io.on('connection', (socket) => {
			socket.on(event, (arg) => {
				globalProducer.produce(arg, topic);
			})
		})
	}
}

module.exports = AtomicKafkaServer;