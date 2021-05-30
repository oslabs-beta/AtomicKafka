/**
 * Defines the AtomicKafkaServer class, which connects a local or cloud-hosted Apache Kafka cluster
 * to user-defined applications as producers or consumers.
 * @param {Node.js Server Instance} kafkaServer:listens on a user-specified port
 */

 const { Kafka } = require('kafkajs');
 const Consumer = require('./consumer.js');
 const Producer = require('./producer.js');


class AtomicKafkaServer {
	constructor(kafkaServer){
		this.kafkaAccess = Kafka;
		this.Consumers = {};
		this.Producers = {};
		this.io = require('socket.io')(kafkaServer, {
			cors: {
				origin: '*',
			}
		});
	};

	/**
	 * Creates a new instance of a Consumer class and stores it in the Consumers object of this class.
	 * @param {string} groupId: user-defined groupId
	 */
	newConsumer(groupId){
		this.Consumers[groupId] = new Consumer(groupId);
	};

	/**
	 * Creates a new instance of a Producer class and stores it in the Producers object of this class.
	 * @param {string} topic: user-defined topic that already exists on the cluster
	 * STRETCH FEATURE: this will also allow the user to create a new topic using an admin broker and the createTopics() method in the KafkaJS library. Will require a hashed key to access the admin functions required to add topics.
	 */
	newProducer(topic){
		this.Producers[topic] = new Producer(topic);
	};

	/**
	 * socketConsume emits messages that are consumed by the consumer, these messages can be received through sockets listening for the message.
	 * socketConsume is invoked on the server side to emit the events and send the payload to the client interface
	 * @param {string} groupId: the group that identifies which consumer the socket will be emitting data from
	 * @param {string} topic: the topic that exists in the cluster and will specify where the consumer will take messages
	 * @param {string} event: the event that the socket will use to emit the consumed message
	 */
	socketConsume (groupId, topic, event) {
		const socketConsumer = this.Consumers[groupId];
		socketConsumer.consume(message => {
			let messageValue = message.value.toString('utf-8');
			this.io.on('connection', (socket) => {
				socket.emit(event, messageValue)
			})
		}, topic)
		.catch(error => {
			try {
				socketConsumer.disconnect();
			} catch (e) {
				console.error('Failed to gracefully disconnect consumer. Either the groupId, the topic, or the event are not recognized.', e);
			}
			process.exit(1);
		})
	};

	/**
	* Produces messages from the local environment, this is used if data is pulled from any kind of database or store that is available on this server's host network. Does not require a websocket connection to retrieve data
	* @param {JSON Object} data: the payload that is produced as a message to the Kafka cluster
	* @param {string} topic: the topic that exists in the cluster that the producer will produce to
	*/
	fileProduce(data, topic) {
		const fileProducer = this.Producers[topic];
		fileProducer.produce(data, topic);
	};

	/**
 	* Produces messages from a socket connection. This feature is implemented when the client produces messages to the server via a websocket connection
 	* @param {string} event: the event that triggers the callback function for producing data to the topic
	* @param {string} topic: the topic that exists in the cluster that the producer will produce to
	*/
	socketProduce(event, topic) {
		const socketProducer = this.Producers[topic];
		this.io.on('connection', (socket) => {
			socket.on(event, (data) => {
				socketProducer.produce(data, topic);
			});
		});
	};
};

module.exports = AtomicKafkaServer;