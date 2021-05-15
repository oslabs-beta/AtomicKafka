const kafka = require('./kafka');

class Consumer {
  constructor(groupId){
    // this.topic = topic;
    this.consumer = kafka.consumer({
      'groupId': groupId
    });
  }

  consume = async (cb, topic = process.env.TOPIC) => {
    await this.consumer.connect();
    // io.sockets.emit('connected', "Consumer Connected")

    await this.consumer.subscribe({
      topic: topic,
      // topic: process.env.TOPIC,
      fromBeginning: true
    })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Received message');
        console.log('Received message', {
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
}


// let newConsumer = new Consumer(id)
// newConsumer.generateConsumer

// const consumer = kafka.consumer({
//   groupId: 'truck-group'
// });

// const consume = async (cb, topic = process.env.TOPIC) => {


//   await consumer.connect();
//   // io.sockets.emit('connected', "Consumer Connected")

//   await consumer.subscribe({
//     topic: topic,
//     // topic: process.env.TOPIC,
//     fromBeginning: true
//   })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log('Received message');
//       console.log('Received message', {
//         topic,
//         partition,
//         key: message.key.toString(),
//         value: message.value.toString()
//         // value: message.value
//       })
//       cb(message)
//     }
//   })
// }


module.exports = Consumer;