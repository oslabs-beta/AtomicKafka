import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import AtomicKafkaClient from './AtomicKafkaClient.jsx'
// import Consumer from './Consumer.jsx'
// import Producer from './Producer.jsx'
import { Cons, Prod } from './KafkaModules.js'

const kafkaServerString = 'http://localhost:3001';

render(
  <BrowserRouter>
    <h1>KAFKA_TEST_PAGE</h1>
    {/* <AtomicKafkaClient socketString={kafkaServerString}/> */}
    <Cons socketEvent={'newMessage'} socketString={kafkaServerString}/>
    <Prod socketEvent={'postMessage'} socketString={kafkaServerString}/>
  </BrowserRouter>,
  document.getElementById('root')
)
