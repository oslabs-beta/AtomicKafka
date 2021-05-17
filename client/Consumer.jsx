import React, { useState, useEffect , useRef } from "react";
import io from "socket.io-client";
// import AtomicKafkaClient from "./atomic-kafka-client.js";
// const socket = io("/http://localhost:3001");

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

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

function Consumer(props) {
  // console.log('CONSUMER PROPS:',props);

  const [truck, setTruck] = useState([]);

  useInterval(() => {
    const socket = io(props.socketString);
    socket.on(props.socketEvent,  (arg) => {
      return setTruck([...truck, arg]);
    });

    return () => {
      // console.log("is App ever off?");
      socket.off();
    }

  }, 2000);

  return (
    <div>
      <h1>LIVE DATA:</h1>
      <ul>
        {/* {'state of truck: ', console.log(truck)} */}
        {truck.map((num, indx) => {
          return (
            <li key={indx}>{num}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default Consumer;