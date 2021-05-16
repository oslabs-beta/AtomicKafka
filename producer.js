const { CompressionTypes } = require('kafkajs');
const kafka = require('./kafka');

const producer = kafka.producer()


const executeSend = async (data) => {
	try {
		const responses = await producer.send({
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

const produce = async (data, interval = 0) => {
	await producer.connect();
	// if (!interval) callback ? executeSend(data) : executeSend(data, callback);
	// else setInterval((data, callback) => executeSend(data, callback), interval);
	console.log('executing send with: ', data)
	executeSend(data);
}


module.exports = produce;

// {
//     key : String(3),
//     // value : String(trucks[idx].engine_temperature)
//     value: String(300)
// }