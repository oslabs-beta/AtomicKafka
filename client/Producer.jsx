import React , { Component } from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'
// const io = require('socket.io-client')


class Producer extends Component {
  constructor(props){
    super(props)
    this.state = {
      val: 200,
    }
    this.socketProducerInvoke = this.socketProducerInvoke.bind(this)
  }

  socketProducerInvoke () {
    var socket = io('http://localhost:3001')
    socket.emit('postMessage', {
      key: String(3),
      value: String(300)
    })
  }


  render(){
    return (
      <div className="produceData">
        <button className="produceDataButton" onClick={() => this.socketProducerInvoke()}>PRODUCE</button>
      </div>
    )
  }
}

export default Producer;


