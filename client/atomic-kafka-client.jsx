import React, { Component, useState, useEffect , useRef } from "react";
import io from "socket.io-client";
import Producer from './Producer.jsx';
import Consumer from './Consumer.jsx';

class AtomicKafkaClient extends Component {
  constructor(props){
    super(props);
    this.socket = io(props.kafkaServer);
    this.Producer = Producer;
    // this.io = require('socket.io-client')(kafkaServer, {
		// 	cors: {
		// 		origin: '*',
		// 	}
		// });
  }

  clientSocketConsume () {
    console.log('in client socket consume')
    console.log(this.socket);
    let output;
    // const socketFn = () => {
    this.socket.on('newMessage', (args) => {
      console.log('socket', this.socket)
      console.log('socket args', args)
      // return setState([...state, args]);
      output = args;
      return;
    })
    // )} 
    // this.io.off();
    // return;
    return output;
  }

  render () {

  }
}



export default AtomicKafkaClient;
