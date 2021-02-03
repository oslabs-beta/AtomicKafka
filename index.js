$(document).ready(function(){
  const count = 10;
  const data = {
    labels : ["0","1","2","3","4","5", "6", "7", "8", "9"],
    datasets : [
      {
        label: '# - Streamed number',
        backgroundColor: "rgba(50,220,220,0.5)",
        data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }
  const updateData = function(oldVal, newVal){
    const labels = oldVal["labels"];
    const dataSetInitial = oldVal["datasets"][0]["data"];
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
    socket.on('request', (value) => {
      updateData(data, value);
      chart.update();
    });
  }
  webSocketInvoke();
 });