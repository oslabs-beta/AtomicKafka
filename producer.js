const readline = require('readline');
const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
producer.on('ready', () => {
  const waitForUserInput = () => {
    rl.question('Command: ', (answer) => {
      if (answer == 'exit'){
        rl.close();
      } else if(isNaN(answer)) {
        waitForUserInput();
      } else {
        let payload = [
          {
            topic: 'topic_stream',
            messages: answer,
          }
        ];
        producer.send(payload, (err, data) => {
          waitForUserInput();
        });
      }
    });
    rl.on('SIGINT', () => {
      rl.close();
    });
  }
  waitForUserInput();
});

producer.on('error', (err) => {
  console.log(err);
});