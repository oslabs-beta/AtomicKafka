const kafka = require('./kafka');

const consumer = kafka.consumer({
  groupId: 'truck-group'
});


// const callBack = ({ message })=> {
//   io.sockets.emit('newMessage', { message })
//   console.log('socket emit message ', { message })
// };

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

// consume().catch(async error => {
//   console.error(error)
//   try {
//     await consumer.disconnect()
//   } catch (e) {
//     console.error('Failed to gracefully disconnect consumer', e)
//   }
//   process.exit(1)
// })

module.exports = consume;