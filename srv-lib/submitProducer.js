const { CompressionTypes } = require('kafkajs');
const kafka = require('./kafka');
const fs = require('fs');
const { setConstantValue } = require('typescript');



class SubmitProducer{
	constructor(topic){
		this.topic = topic;
		this.producer = kafka.producer();
		this.inputData = [];
	}

	executeSend = async (indx) => {
		try {
			console.log('execute send this data: ', this.inputData[indx], String(this.inputData[indx]))
			await this.producer.send({
				topic : this.topic,
				messages : [
					{
						// data
						key: String(indx),
						value: String(JSON.stringify(this.inputData[indx])),
					}
				]
			})
		}
		catch (err) {
			console.log("Error with producing in executeSend(): ", err);
		}
	}

	getData = async (arg) => {
		try {
			let data, lines;
			if (arg === null){
				data = fs.readFileSync('salesData.json', 'UTF-8');
				lines = data.split(/\r?\n/);
				lines.forEach((line) => {
					this.inputData.push(line);
				})
			} else {
				this.inputData = [arg]
			}
			// lines.pop();
		}
		catch (err) {
			console.error(err);
		} // next step is to pass the event through the socket so we can customize actions with the producer & consumer
	}

	produce = async (time = 0, data = null) => {
		console.log('producerjs data: ', data)
		await this.getData(data);
		await this.producer.connect();
		let i = 0;
		if(time !== 0){
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
		}	else {
			await this.executeSend(0)
		}

	}
}



module.exports = SubmitProducer;