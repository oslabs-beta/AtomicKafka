const kafka = require('./kafka');

const fs = require('fs');
const trucks = []

try {
    // read contents of the file
    const data = fs.readFileSync('truck_engine_sensors.json', 'UTF-8');
    // split the contents by new line
    const lines = data.split(/\r?\n/);
    // print all lines
    lines.pop();
    lines.forEach((line) => {
        // trucks.push(JSON.parse(line))
        trucks.push(line)
    });
} catch (err) {
    console.error(err);
}

// PRODUCER

const producer = kafka.producer()

const produce = async () => {
    await producer.connect();
    let idx = 0;

   const interval = setInterval( async () => {
        if(idx>=trucks.length-1) {
            console.log('in here')
            console.log(idx)
            clearInterval(interval);
        }
        try {

            const responses = await producer.send({
                topic : process.env.TOPIC,
                messages : [
                    {
                        key : String(idx),
                        // value : String(trucks[idx].engine_temperature)
                        value: String(trucks[idx])
                    }
                ]
            })
        // console.log('Published message, engine_temperature', trucks[idx].engine_temperature )
        idx++;
        }
        catch (err) {
            console.log("Error with producing: ", err);
        }

    }, 3000)
}

produce().catch(error => {
    console.log(error);
    process.exit(1);
})

// const consumer = kafka.consumer({
//     groupId: 'truck-group'
//   })

//   const consume = async () => {
//     await consumer.connect()

//     await consumer.subscribe({
//       topic: process.env.TOPIC,
//       // topic: process.env.TOPIC,
//       fromBeginning: true
//     })

//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log('Received message', {
//           topic,
//           partition,
//           key: message.key.toString(),
//           value: JSON.parse(message.value.toString()),
//           valueString: message.value.toString()
//         })
//       }
//     })
//   }

//   consume().catch(async error => {
//     console.error(error)
//     try {
//       await consumer.disconnect()
//     } catch (e) {
//       console.error('Failed to gracefully disconnect consumer', e)
//     }
//     process.exit(1)
//   })


module.exports = producer;