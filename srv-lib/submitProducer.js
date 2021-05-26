const { CompressionTypes } = require('kafkajs');
const kafka = require('./kafka');
const fs = require('fs');
const { setConstantValue } = require('typescript');



class SubmitProducer{
	constructor(){
		this.producer = kafka.producer();
	}

	executeSend = async (data, topic) => {
		try {
			console.log('execute send this data: ', data)
			await this.producer.send({
				topic : topic,
				messages : [
					{
						// data
						key: String('test'),
						value: String(JSON.stringify(data)),
					}
				]
			})
		}
		catch (err) {
			console.log("Error with producing in executeSend(): ", err);
		}
	}


	produce = async (data = null, topic) => {
		if(!data) return console.log('no data passed in')
		console.log('submitProducerjs data: ', data)
		console.log('submitProducerjs topic: ', topic)
		await this.producer.connect();
		await this.executeSend(data, topic)

	}
}



module.exports = SubmitProducer;