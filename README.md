# kafka_socket_stream

This repo contains the project to understand end-to-end data streaming using Apache Kafka and Socket.io.

To begin:
```
npm i express socket.io kafka-node
```

Download and setup Apache Kafka: https://kafka.apache.org/quickstart
Follow till Step 3.

In a new terminal:
```
npm server_consumer.js
```

In another terminal:
```
npm producer.js
```

Open _index.html_

In the terminal with _producer.js_, start entering numbers. You should be able to see the data being streamed on the webpage.