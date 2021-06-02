![AtomicKafka_MastHead](./assets/logo_rect.png)

___
<p style="text-align: center;">AtomicKafka is a lightweight <a href="https://github.com/oslabs-beta/AtomicKafka"> NPM Package </a> developed to simplify the process of establishing bidirectional, real-time data streaming with Apache Kafka in your web-app.
<br>
<a href="">Homepage</a>
<br>
<a href="https://medium.com/@dbehmoaras/2eb79b20eaae">Article</a></p> 


<p align="center">
  <a href="https://github.com/oslabs-beta/AtomicKafka/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/atomickafka?color=%222ac0ba%0A&style=for-the-badge">
  </a>
  <a href="https://www.npmjs.com/package/atomic-kafka">
    <img alt="npm" src="https://img.shields.io/npm/v/atomic-kafka?color=%222ac0ba%0A&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/atomickafka/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/oslabs-beta/atomickafka?color=%222ac0ba%0A&style=for-the-badge">
  <a href="https://github.com/oslabs-beta/atomickafka/blob/main/LICENSE">
    <img alt="NPM" src="https://img.shields.io/npm/l/atomic-kafka?color=%222ac0ba%0A&style=for-the-badge">
  </a>
</p>

___
**<h2>Table of Contents</h2>**
1. [Dependencies](#dependencies)
2. [How AtomicKafka Works](#haw)
3. [Getting Started](#gs)
4. [Contribution](#contribution)
5. [License](#license)
6. [Maintainers](#maintainers)
7. [Built With](#bw)



___
**<h2 id="dependencies">Dependencies</h2>**
- Kafka-JS
- Socket-IO (Server & Client)
- React
- Dotenv
___
**<h2 id="haw">How AtomicKafka Works</h2>**
![How AtomicKafka Works](./assets/howAKworks.png)

___

**<h2 id="gs">Getting Started</h2>**

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
  ```js
  PORT=<USER_DEFINED>
  API_KEY=
  API_SECRET=
  KAFKA_BOOTSTRAP_SERVER=localhost:9092
  KAFKA_SSL=false
  ```
- Confluent Cloud .env config: (***PORT*** intentionally left blank)
  ```js
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
```js
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

```js
atomicKafkaInstance.newConsumer('group_ID_string');
atomicKafkaInstance.socketConsume('group_ID_string', 'event_string', 'topic_string');
```

___
### **4B. Create the Producer and enable the built-in websocket on the server:**
1. Initailize a ***newProducer*** on the ***aks*** instance and pass in the ***topic_string***.
2. Enable the built-in websocket by invoking ***globalProducer*** and passing in an ***event_string*** and the ***topic_string***.
```js
atomicKafkaInstance.newProducer('topic_string');
atomicKafkaInstance.globalProduce('postMessage', 'test_topic')
```
___
### **5A. JavaScript - Import Client Interface (React & Hooks)**
```js
import AtomicKafkaClient from 'atomic-kafka/client';
```
### **5B. TypeScript - Import Client Interface (React & Hooks)**
```js
declare function require(name:string)
const AtomicKafkaClient = require('atomic-kafka/client').default
```
___
### **6A. Create and implement Consumer client component (JS & TS):**
  1. Initialize ***akc*** as an ***AtomicKafkaClient***. Pass in ***AtomicKafkaServer*** instance host's ***URI_STRING***
  2. Define a callback to process message ***payload*** through the React state management tool of your choice.
  3. Implement ***useInterval*** to consume from the kafka cluster on interval.
  4. Return the invocation of the ***consumer*** function on the ***akc*** instance. Pass in a user-defined websocket ***event_string***, the previously defined ***callback***, and the ***interval_delay*** in milliseconds.
```js
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

```js
function Producer_Component () {

  const akc = new AtomicKafkaClient(URI_STRING);

  const payload = {
    //arbitrarily nested key value pairs
  };

  akc.producer(<event_string>, payload);
}
```
___
**<h2 id="contribution">Contribution</h2>**
We want this open-sourced project to continue to improve. If you would like to make a contribution to AtomicKafka, please fork [this repo](https://github.com/oslabs-beta/AtomicKafka), commit your awesome changes to a well-named feature branch of this repository, and make a pull-request. We value your input! 
___
**<h2 id="maintainers">Maintainers</h2>**
[Nikhil Massand](https://github.com/nikhilmassand) 

[Vicki Yang](https://github.com/vickiwyang)

[David Behmoaras](https://github.com/dbehmoaras)

[Joseph Lee](https://github.com/amplifygospel)

___
**<h2 id="bw">Built With</h2>**
[KafkaJS](https://kafka.js.org/)

[React](https://reactjs.org/)

[TypeScript](https://www.typescriptlang.org/)

The support of [OSLabs](https://opensourcelabs.io/)
