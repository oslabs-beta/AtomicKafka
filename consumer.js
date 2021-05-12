const kafka = require('./kafka');
const consumer = kafka.consumer({
    groupId: 'truck-group'
  })

  const consume = async () => {
    await consumer.connect();
    // io.sockets.emit('connected', "Consumer Connected")

    await consumer.subscribe({
      topic: process.env.TOPIC,
      // topic: process.env.TOPIC,
      fromBeginning: true
    })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Received message', {
          topic,
          partition,
          key: message.key.toString(),
          value: message.value.toString()
          // value: message.value
        })
      }
    })
  }

  consume().catch(async error => {
    console.error(error)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
  })

  module.exports = consumer;