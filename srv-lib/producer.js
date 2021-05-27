/**
 * Defines the Producer class for AtomicKafka, which produces data from the client app
 * to the Kafka cluster connected to AtomicKafka.
 */

const kafka = require('./kafka');

class Producer{
	constructor(){
		/**
		*	initializes a kafka producer instance using the kafka broker that was passed in
		*	as the producer property
		*/
		this.producer = kafka.producer();
	}
	
	/**
	* send a message to the Kafka cluster with the data passed in when socketProduce is invoked
	* and use the topic provided by the user to send message
  * @data : JSON Object, this data is sent as value to the value of the message going to the Kafka cluster
	* @topic : String, specifies which topic in the kafka cluster to send the message
	*/
	executeSend = async (data, topic) => {
		try {
			console.log('execute send this data: ', data)
			await this.producer.send({
				topic : topic,
				messages : [
					{
						value: JSON.stringify(data),
					}
				]
			})
		}
		catch (err) {
			console.log("Error with producing in executeSend(): ", err);
		}
	}

	/**
	*	producer function: takes in data (as a JSON object) and a topic (as a string).
	*	the producer connects to the kakfka cluster via the kafka broker that was required in and sends the data as the payload to the topic specified by the user
	* @data : JSON Object, this data is sent as value to the value of the message going to the Kafka cluster
	* @topic : string, specifies which topic in the kafka cluster to send the message
	*/
	produce = async (data, topic) => {
		if(!data) return console.log('No data was passed in')
		await this.producer.connect();
		await this.executeSend(data, topic)
	}
}

module.exports = Producer