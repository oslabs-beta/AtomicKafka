![AtomicKafka_MastHead](./assets/logo_rect.png)
___
## **Dependencies**
- Kafka-JS
- Socket-IO (Server & Client)
- React
- Dotenv
___

## **Getting Started**:

### **1. Initialize Kafka Cluster:**

Atomic Kafka currently supports running Apache Kafka clusters either using a Docker image or by connecting to Confluent Cloud.


**Docker:**
- Download this [.yml](https://github.com/AtomicKafka/atomicKafkaConsumer/blob/main/docker-compose.yml) and run the following command in your terminal:
  ```
  docker-compose up -d
  ```

**Confluent Cloud:**
- Follow the steps on [Confluent Cloud](https://www.confluent.io/confluent-cloud/) to create a free account with Confluent cloud. Obtain the ***API_ACCESS_KEY***, **_API_ACCESS_SECRET_**, and ***BOOTSTRAP_SERVER***

___
### **2. Configure *.env* file.**
Include the following lines in your .env depending on your Kafka environment.

- Docker .env config: (***API_KEY*** and ***API_SECRET*** are intentionally left blank)
  ```
  PORT=<USER_DEFINED>
  API_KEY=
  API_SECRET=
  KAFKA_BOOTSTRAP_SERVER=localhost:9092
  KAFKA_SSL=false
  ```
- Confluent Cloud .env config: (***PORT*** intentionally left blank)
  ```
  PORT=<USER_DEFINED>
  API_KEY=<API_ACCESS_KEY>
  API_SECRET=<API_ACCESS_SECRET>
  KAFKA_BOOTSTRAP_SERVER=<BOOTSTRAP_SERVER>
  ```
___
### **3. Create Server Instance:**
Initialize a server instance of your choice (HTTP, Node.js, etc). The example below contemplates a Node.js Express server.

**ATTENTION:** a Server instance must be created for every remote Atomic Kafka Client.
1. Initialize and configure ***expressApp*** according to desired specifications.
2. Require in ***AtomicKafkaServer***.
3. Define a ***server*** that listens on the user-defined PORT environment variable.
4. Initialize an AtomicKafkaServer instance ***aks*** by passing in the ***server***.
```
//initialize and configure expressApp according to user specifications

const AtomicKafkaServer = require('atomic-kafka/server')

const server = expressApp.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})

const aks = new AtomicKafkaServer(server);
```
___
### **4A. Create the Consumer and enable the built-in websocket on the server:**
1. Initailize a **_newConsumer_** on the **_aks_** instance and pass in the **_group_ID_string_**.
2. Enable the built-in websocket by invoking **_socketConsume_** and passing in the **_group_ID_string_**, an **_event_string_**, and the **_topic_string_**.

```
atomicKafkaInstance.newConsumer('group_ID_string');
atomicKafkaInstance.socketConsume('group_ID_string', 'event_string', 'topic_string');
```

___
### **4B. Create the Producer and enable the built-in websocket on the server:**
1. Initailize a ***newProducer*** on the ***aks*** instance and pass in the ***topic_string***.
2. Enable the built-in websocket by invoking ***globalProducer*** and passing in an ***event_string*** and the ***topic_string***.
```
atomicKafkaInstance.newProducer('topic_string');
atomicKafkaInstance.globalProduce('postMessage', 'test_topic')
```
___
### **5A. JavaScript - Import Client Interface (React & Hooks)**
```
import AtomicKafkaClient from 'atomic-kafka/client';
```
### **5B. TypeScript - Import Client Interface (React & Hooks)**
```
declare function require(name:string)
const AtomicKafkaClient = require('atomic-kafka/client').default
```
___
### **6A. Create and implement Consumer client component (JS & TS):**
  1. Initialize ***akc*** as an ***AtomicKafkaClient***. Pass in ***AtomicKafkaServer*** instance host's ***URI_STRING***
  2. Define a callback to process message ***payload*** through the React state management tool of your choice.
  3. Implement ***useInterval*** to consume from the kafka cluster on interval.
  4. Return the invocation of the ***consumer*** function on the ***akc*** instance. Pass in a user-defined websocket ***event_string***, the previously defined ***callback***, and the ***interval_delay*** in milliseconds.
```
function Consumer_Component () {

  const akc = new AtomicKafkaClient(URI_STRING);

  const callback = (payload) => {
    //user-defined function definition
  }

  akc.useInterval(() => akc.consumer(<event_string>, callback), <interval_delay>)
}
```

### **6B.: Create and implement Producer client component (JS & TS):**

1. Initialize **_akc_** as an **_AtomicKafkaClient_**. Pass in **_AtomicKafkaServer_** instance host's **_URI_STRING_**
2. Generate a ***payload*** formatted as an arbitrarily-nested JSON object. The example below defines a payload, but it can be generated at any point in the client according to the user's specification.
3. Invoke the consumer function. Pass in the websocket ***event_string*** and the ***payload***.

```
function Producer_Component () {

  const akc = new AtomicKafkaClient(URI_STRING);

  const payload = {
    //arbitrarily nested key value pairs
  };

  akc.producer(<event_string>, payload);
}
```

