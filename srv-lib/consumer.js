const kafka = require('./kafka');

class Consumer {
  constructor(groupId){
    /*
			initializes a kafka consumer instance using the kafka broker that was passed in
			as the consumer property
		*/
    this.consumer = kafka.consumer({
      'groupId': groupId
    });
  }

  /*
    the consume function takes a callback which is a socket emitter, this will send the message
    data to the frontend
  */
  consume = async (cb, topic = process.env.TOPIC) => {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: topic,
      fromBeginning: true
    })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Received message', {
          topic,
          partition,
          value: message.value.toString()
        })
        cb(message)
      }
    })
  }
}



module.exports = Consumer;