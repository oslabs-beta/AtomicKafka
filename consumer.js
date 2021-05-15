const kafka = require('./kafka');

const consumer = kafka.consumer({
  groupId: 'truck-group'
});


const consume = async (cb) => {
  await consumer.connect();
  // io.sockets.emit('connected', "Consumer Connected")

  await consumer.subscribe({
    topic: process.env.TOPIC,
    // topic: process.env.TOPIC,
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message');
      console.log('Recived message', {
        topic,
        partition,
        key: message.key.toString(),
        value: message.value.toString()
        // value: message.value
      })
      cb(message)
    }
  })
}


module.exports = consume;