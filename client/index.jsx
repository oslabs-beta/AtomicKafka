import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

render(
  <BrowserRouter>
    <h1>KAFKA_TEST_PAGE</h1>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
