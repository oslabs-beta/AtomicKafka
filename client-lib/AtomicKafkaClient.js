/**
 * This is the frontend class for atomic-kafka.
 * It utilizes socket.io to produce and consume data from frontend components.
 * @param {string} kafkaServer: the hostserver's URI where the AtomicKakfkaClient instance is created
 */

import io from "socket.io-client";
import { useEffect, useRef } from "react"

class AtomicKafkaClient {
  constructor(kafkaServer){
    this.address = kafkaServer;
  };

  /**
   * The consumer function allows a component to consumer data from a socket that is emitting on the server. The implementation on the component requires the use of an interval so that the state is changed when data is received on the front end.
   * @param {string} event: a custom websocket event that can be listened to anywhere that the connection exists. this event is defined by the user by invoking the producer function below
   * @param {function} callback: a custom callback defined by the user. executes on the payload after emitted event is received by the client
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
   * @param {string} event: custom websocket event defined by passing in a string as the event argument
   * @param {JSON object} payload: contains the metadata that will be sent to the server
   */
  producer(event, payload) {
    const socket = io(this.address);
    socket.emit(event, payload);
    return () => {
      socket.off();
    };
  };


  /**
   * Defines a custom state hook that affects state change on an interval. This is implemented to perform the default consumer behavior while throttling the websocket in order to maintain performance.
   * @param {function} stateHook: React state setter function
   * @param {integer} delay: length of delay in milliseconds
   */
  useInterval (stateHook, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = stateHook;
    }, [stateHook]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
};

export default AtomicKafkaClient;
