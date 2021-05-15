const { CompressionTypes } = require('kafkajs');
const kafka = require('./kafka');


class Producer{
	constructor(topic){
		this.topic = topic
		this.producer = kafka.producer();
	}
	executeSend = async (data) => {
		try {
			const responses = await this.producer.send({
				topic : process.env.TOPIC,
				messages : [
					data
				]
			})
		}
		catch (err) {
			console.log("Error with producing: ", err);
		}
	}

	produce = (data, interval = 0) => {
		this.producer.connect();
		// if (!interval) callback ? executeSend(data) : executeSend(data, callback);
		// else setInterval((data, callback) => executeSend(data, callback), interval);
		console.log('executing send with: ', data)
		this.executeSend(data);
	}
}



module.exports = Producer;

// {
//     key : String(3),
//     // value : String(trucks[idx].engine_temperature)
//     value: String(300)
// }