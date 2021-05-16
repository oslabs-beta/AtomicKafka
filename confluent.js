const { Kafka } = require('kafkajs')

class Confluent {
	constructor(key, secret, server){
		this.key = key;
		this.secret = secret;
		this.server = server;
	}

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




module.exports = Confluent;
