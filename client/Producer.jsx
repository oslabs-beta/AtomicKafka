import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import io from 'socket.io-client';



function Producer(props) {
  console.log('PRODUCER PROPS:',props);
  const [num, setNum] = useState(30);

  function socketProducerInvoke() {
    // console.log("the state of num is now...", num);
    const socket = io(props.socketString);
    socket.emit(props.socketEvent, {
      key: String(3),
      value: String(num)
    })
    setNum(num + 1);
    return () => {
      // console.log("is Producer ever off?");
      socket.off();
    }
  }
    return (
      <div className="produceData">
        <button className="produceDataButton" onClick={() => socketProducerInvoke()}>PRODUCE</button>
        <h2>I am responsive from Producer: {num}</h2>
      </div>
    )
}

export default Producer;


