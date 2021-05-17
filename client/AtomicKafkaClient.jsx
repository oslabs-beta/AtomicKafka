import React, { Component, useState, useEffect , useRef } from "react";
import io from "socket.io-client";

import ProducerModules from './ProducerModules.js';
import ConsumerModules from './ConsumerModules.js';

// const cons = require('./ConsumerModules.js')
// console.log(ConsumerModules);


function AtomicKafkaClient(props) {
  console.log(ConsumerModules);
  console.log(ProducerModules);
  const socketString = 'http://localhost:3001';



  const producers = populateProducers(socketString);
  const consumers = populateConsumers(socketString);

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
  for (const key in ProducerModules){
    const producer = ProducerModules[key](
      {
        socketString: sockString,
        socketEvent: sockEvents[key],
      });
    outProds[outProds.length] = producer;
  }
  return outProds;
}

function populateConsumers(sockString,sockEvents = {cons_0: 'newMessage'}) {
  const outCons = [];
  for (const key in ConsumerModules){
    const consumer = ConsumerModules[key](
      {
        socketString: sockString,
        socketEvent: sockEvents[key],
      });
    outCons[outCons.length] = consumer;
  }
  return outCons;
}


export default AtomicKafkaClient;



