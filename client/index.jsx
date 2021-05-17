import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AtomicKafkaClient from './AtomicKafkaClient.jsx'


const kafkaServerString = 'http://localhost:3001';

render(
  <BrowserRouter>
    <h1>KAFKA_TEST_PAGE</h1>
    <AtomicKafkaClient socketString={kafkaServerString}/>
  </BrowserRouter>,
  document.getElementById('root')
)
