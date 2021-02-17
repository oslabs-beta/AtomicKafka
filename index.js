$(document).ready(function(){
  let count = 10;
  const data = {
    labels : [...Array(count).keys()].map(i => i.toString()),
    datasets : [
      {
        label: '# - Streamed number',
        backgroundColor: "rgba(50,220,220,0.5)",
        data : Array(count).fill(0),
      }
    ]
  }
  const updateData = function(newVal){
    const labels = data["labels"];
    const dataSetInitial = data["datasets"][0]["data"];
    count++;
    labels.push(count.toString());
    labels.shift();
    const newData = Math.floor(newVal);
    dataSetInitial.push(newData);
    dataSetInitial.shift();
  };
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: 'line',
    data,
    options: {animation : false}
  });
  
  function webSocketInvoke() {
    var socket = io('http://localhost:3000');
    socket.on('event', (value) => {
      updateData(value);
      chart.update();
    });
  }
  webSocketInvoke();
 });