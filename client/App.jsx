import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import io from "socket.io-client";
// const io = require('socket.io-client')

// function webSocketInvoke() {
//   const socket = io("http://localhost:3001");
//   socket.on("newMessage", (arg) => {
//     // let message = arg.value.toString('utf-8');
//     console.log("listener argument", arg);
//     setTruck(arg);
//   });
// }
// webSocketInvoke();
//, {'multiplex': false}


function App() {
  const [truck, setTruck] = useState("");

  useEffect(() => {
  const socket = io("http://localhost:3001", {'multiplex': false});
    socket.on("newMessage",  (arg) => {
      console.log("new data: ", arg);
      // console.log("data type: ", typeof arg);
      return setTruck(arg);
      console.log("new truck state: ", truck);
    });

    // return () => {
    //   console.log("am i ever off?");
    //   socket.off();
    // }
  }, [truck]);

  return (
    <div>
      <h1>LIVE DATA: {truck}</h1>
    </div>
  );
}

export default App;
