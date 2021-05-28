/**
 * Broker Class: initializes a kafka broker that connects to a kafka bootstrap server using the key and secret provided by the user.
 * @param {.ENV string} key: api key for any kafka service provider (e.g Confluent Cloud).  blank if implementing a docker image to run kafka locally without security.
 * @param {.ENV string} secret: secret key provided by any kafka service provider that requires SSL. blank if implementing a docker image to run kafka locally without security.
 * @param {.ENV string} server: the kafka bootstrap server URI. localhost:<PORT_NUMBER> if implementing docker or any other kafka service running locally
 */

const { Kafka } = require('kafkajs')

class Broker {
	constructor(key, secret, server){
		this.key = key;
		this.secret = secret;
		this.server = server;
	}

	/**
	 * Initializes the Broker on the kafka client.
	 * @param {string} client: Identifies the client ID of the broker that will serve as the client for the broker's connection to Kafka. Not to be confused with the front end client.
	 * In the Producer and Consumer Examples provided, the Broker is initialized on a Node Server by passing in the Node Server instance to the create function's invocation in the server file.
	 */
	create(client) {
		const sasl = this.key && this.secret ? { username : this.key, password : this.secret , mechanism: 'plain' } : null
		const ssl = !!sasl
		return new Kafka({
			clientId: client,
			brokers: [this.server],
			ssl,
			sasl
		})
	}
}




module.exports = Broker;
