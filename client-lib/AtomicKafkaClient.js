/**
 *
 * This is the frontend class for atomic-kafka.
 * It utilizes socket.io to produce and consume data from frontend components.
 *
 */

import io from "socket.io-client";
// const io = require('socket.io-client');

class AtomicKafkaClient {
  constructor(kafkaServer){
    this.address = kafkaServer;
  }

  /*
  The consumer function allows a component to consume data from a socket that is emitting
  on the server. The implementation on the component requires the use of an interval so that
  state is changed when data is received on the frontend.
  */
  consumer(event, callback) {
    const socket = io(this.address);

    socket.on(event, (arg) => {
      callback(arg);
    });
    return () => {
      socket.off();
    };
  }

  /*
  The producer function allows a component to produce data to a socket that is listenening
  on the server which then sends that payload as a message to the cluster.
  */
  producer(event, payload) {
    const socket = io(this.address);
    socket.emit(event, payload);
    return () => {
      socket.off();
    };
  }
}



export default AtomicKafkaClient;
