const { CompressionTypes } = require('kafkajs');
const kafka = require('./kafka');
const fs = require('fs');
const { setConstantValue } = require('typescript');



class Producer{
	constructor(topic){
		this.topic = topic;
		this.producer = kafka.producer();
		this.inputData = [];
	}

	executeSend = async (indx) => {
		try {
			await this.producer.send({
				topic : this.topic,
				messages : [
					{
						// data
						key: String(indx),
						value: String(this.inputData[indx]),
					}
				]
			})
		}
		catch (err) {
			console.log("Error with producing in executeSend(): ", err);
		}
	}

	getData = async () => {
		try {
			const data = fs.readFileSync('salesData.json', 'UTF-8');
			const lines = data.split(/\r?\n/);
			// lines.pop();
			lines.forEach((line) => {
				this.inputData.push(line);
			})
		}
		catch (err){
			console.error(err);
		}
	}

	produce = async (time = 0) => {
		await this.getData();
		await this.producer.connect();
		let i = 0;
		const interval = setInterval(async () => {
			console.log('i: ', i)
			if(i > this.inputData.length - 1) {
				i = 0;
				//
				// return;
			}
			try {
				console.log('executing send with: ', this.inputData[i]);
				await this.executeSend(i);
				i++;
			}
			catch (err) {
				console.log('Error with producing in produce(): ', err);
			}
		}, time)

	}
}



module.exports = Producer;