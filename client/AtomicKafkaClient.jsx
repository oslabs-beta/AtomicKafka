import React, { Component, useState, useEffect , useRef } from "react";
import io from "socket.io-client";

import ProducerModules from './ProducerModules.js';
import ConsumerModules from './ConsumerModules.js';


import Producer from './Producer.jsx';
import Consumer from './Consumer.jsx';


function AtomicKafkaParent(props) {

  // const socketString = 'http://localhost:3001';

  const producers = populateProducers(props.socketString);
  const consumers = populateConsumers(props.socketString);

  return (
    <div>
      <h3>AtomicKafkaClient Fn Component</h3>
      <div className='producersDiv'>
        {producers}
      </div>
      <div className='consumersDiv'>
        {consumers}
      </div>
    </div>
  )
}

function populateProducers(sockString, sockEvents = {prod_0: 'postMessage'}) {
  const outProds = [];
  let i=0;
  for (const key in ProducerModules){
    const producer =
      ProducerModules[key]({
        socketString: sockString,
        socketEvent: sockEvents[key],
      })
    outProds[outProds.length] = producer;
    i+=1;
  }
  return outProds;
}

function populateConsumers(sockString, sockEvents = {cons_0: 'newMessage'}) {
  const outCons = [];
  let i=0;
  for (const key in ConsumerModules){
    const consumer =
      ConsumerModules[key]({
        socketString: sockString,
        socketEvent: sockEvents[key],
      });
    outCons[outCons.length] = consumer;
    i+=1;
  }
  return outCons;
}

// const AtomicKafkaClient = {
//   AtomicKafkaParent: AtomicKafkaParent,
//   Producer: Producer,
//   Consumer: Consumer
// };

export default AtomicKafkaClient;



