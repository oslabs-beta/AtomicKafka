import React, { useState, useEffect } from "react";
import { render } from 'react-dom'
import io from 'socket.io-client'


// const socket = io("http://localhost:3001");

function Producer() {
  const [num, setNum] = useState(30);


  function socketProducerInvoke() {
    console.log("the state of num is now...", num);
    const socket = io('http://localhost:3001')
    socket.emit('postMessage', {
      key: String(3),
      value: String(num)
    })
    setNum(num + 1);
    return () => {
      console.log("is Producer ever off?");
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


