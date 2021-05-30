const Consumer = require('../srv-lib/consumer')
const AtomicKafkaServer = require('../srv-lib/AtomicKafkaServer')

const http = require('http');

let httpServer;
let httpServerAddr;

describe('backend test', () => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.listen().address();

  beforeAll((done) => {
    done();
  })

  afterAll((done) => {
    httpServer.close();
    done();
  });

  // beforeEach((done) => {
  //   socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
  //     'reconnection delay': 0,
  //     'reopen delay': 0,
  //     'force new connection': true,
  //     transports: ['websocket'],
  //   });

  //   socket.on('connect', () => {
  //     done();
  //   });
  // })


  // httpServer = http.createServer().listen();
  // httpServerAddr = httpServer.listen().address();
  // ioServer = ioBack(httpServer);
  const newAKS = new AtomicKafkaServer(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`)
  xit('Should initialize with empty consumer and producer storage objects', () => {
    expect(newAKS.Consumers).toEqual({});
    expect(newAKS.Producers).toEqual({});
    httpServer.close();
  })
})


