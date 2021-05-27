/**
 * Defines the Consumer class for AtomicKafka, which consumes data 
 * from the Kafka cluster connected to AtomicKafka.
 */

const kafka = require('./kafka');

class Consumer {
  constructor(groupId){
    /*
		*	initializes a kafka consumer instance using the kafka broker that was passed in
		*	as the consumer property
		*/
    this.consumer = kafka.consumer({
      'groupId': groupId
    });
  };

  /**
  *  the consume function takes a callback which is a socket emitter, this will send the message
  *  data to the frontend
  *  @cb : Function, the callback that is passed in emits consumed messages through the socket
  *  @topic : string, specifies the topic that the consumer should listen to from the cluster
  */
  consume = async (cb, topic = process.env.TOPIC) => {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: topic,
      fromBeginning: true
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Received message', {
          topic,
          partition,
          value: message.value.toString()
        });
        cb(message);
      }
    });
  };
};



module.exports = Consumer;