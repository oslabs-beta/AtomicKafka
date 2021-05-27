/**
 * This is the frontend class for atomic-kafka.
 * It utilizes socket.io to produce and consume data from frontend components.
 * @kafkaServer : string, the address hostserver where the AtomicKakfkaClient instance is created
 */

import io from "socket.io-client";

class AtomicKafkaClient {
  constructor(kafkaServer){
    this.address = kafkaServer;
  };

  /**
   * The consumer function allows a component to consumer data from a socket that is emitting on the server. The implementation on the component requires the use of an interval so that the state is changed when data is received on the front end. 
   * @event : string, a custom websocket event that can be listened to anywhere that the connection exists. this event is defined by the user by invoking the producer function below
   * @callback : a custom callback defined by the user. executes on the payload after emitted event is received by the client
   */
  
  consumer(event, callback) {
    const socket = io(this.address);

    socket.on(event, (data) => {
      callback(data);
    });
    return () => {
      socket.off();
    };
  };


  /**
   * The producer function allows a component to produce data to a socket that is listening
   * on the server which then sends that payload as a message to the cluster.
   * The producer accepts any custom string as the event argument.
   * @event : string, custom websocket event defined by passing in a string as the event argument
   * @payload : JSON object containing the metadata that will be sent to the server
   */
  producer(event, payload) {
    const socket = io(this.address);
    socket.emit(event, payload);
    return () => {
      socket.off();
    };
  };
};

export default AtomicKafkaClient;
