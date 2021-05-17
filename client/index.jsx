import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AtomicKafkaClient from './AtomicKafkaClient.jsx'

// import


render(
  <BrowserRouter>
    <h1>KAFKA_TEST_PAGE</h1>
    <AtomicKafkaClient />
  </BrowserRouter>,
  document.getElementById('root')
)
