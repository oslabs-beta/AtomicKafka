import React , { Component } from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'
// const io = require('socket.io-client')



function webSocketInvoke () {
  var socket = io('http://localhost:3001')
  socket.on('message', value => {
    console.log('SOCKET IS ON', value);
  })
}
webSocketInvoke()


class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <h2>APP RENDERING</h2>
    )
  }
}

export default App;