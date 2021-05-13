import React, { useState, useEffect } from "react";
import { render } from 'react-dom'
import io from 'socket.io-client'
// const io = require('socket.io-client')
const socket = io("http://localhost:3001");


function Producer() {
  const [num, setNum] = useState(30);

  useEffect(() => {
    socket.emit('postMessage', {
      key: String(3),
      value: String(num)
    })
  
      return () => {
        console.log("am i ever off?");
        socket.off();
      }
  });

  // socketProducerInvoke () {
  //   var socket = io('http://localhost:3001')
  //   socket.emit('postMessage', {
  //     key: String(3),
  //     value: String(300)
  //   })
  // }


    return (
      <div className="produceData">
        <button className="produceDataButton" onClick={() => setNum(num + 1)}>PRODUCE</button>
        <h2>I am responsive from Producer: {num}</h2>
      </div>
    )
}

export default Producer;


