const { CompressionTypes } = require('kafkajs');
const kafka = require('./kafka');

// const fs = require('fs');
// const trucks = []

// try {
//     // read contents of the file
//     const data = fs.readFileSync('truck_engine_sensors.json', 'UTF-8');
//     // split the contents by new line
//     const lines = data.split(/\r?\n/);
//     // print all lines
//     lines.pop();
//     lines.forEach((line) => {
//         // trucks.push(JSON.parse(line))
//         trucks.push(line)
//     });
// } catch (err) {
//     console.error(err);
// }

// PRODUCER

const producer = kafka.producer()

const produce = async (data) => {
    await producer.connect();
    // let idx = 0;

    const interval = async () => {
        // if(idx>=trucks.length-1) {
        //     console.log('in here')
        //     console.log(idx)
        // }
        try {
            const responses = await producer.send({
                topic : process.env.TOPIC,
                messages : [
                    data
                ]
            })
        // console.log('Published message, engine_temperature', trucks[idx].engine_temperature )
        // idx++;
        }
        catch (err) {
            console.log("Error with producing: ", err);
        }

    }
    interval();
}

// produce().catch(error => {
//     console.log(error);
//     process.exit(1);
// })

module.exports = produce;

// {
//     key : String(3),
//     // value : String(trucks[idx].engine_temperature)
//     value: String(300)
// }