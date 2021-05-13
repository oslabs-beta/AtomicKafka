import React , { Component, useState, useEffect } from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'
// const io = require('socket.io-client')


function Producer() {
  const [num, setNum] = useState(30);
  
  const incNum = () => {
    var socket = io('http://localhost:3001')
    socket.emit('postMessage', {
      key: String(3),
      value: String(num)
    })
    return setNum(num + 1)
  }

  useEffect(() => {
    
    // return () => {
    //   console.log("socket off on producer comp?");
    //   socket.off();
    // }
  }, [])



  return (
    <div className="produceData">
      <button className="produceDataButton" onClick={() => incNum()}>PRODUCE</button>
    </div>
  )
}

export default Producer;


