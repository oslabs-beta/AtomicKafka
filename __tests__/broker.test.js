const broker = require('../srv-lib/broker')

const { Kafka } = require('kafkajs')

describe('Broker instantiation tests', () => {
  let API_KEY = 'EAA4XK6CDMXEEJOK';
  let API_SECRET = 'LWjiq29pFoLKvT+o5etLSWZ6XXbekltmkr59gA+uwTxh+obN7OZoX/tUPNBOtjtA';
  let KAFKA_BOOTSTRAP_SERVER= 'pkc-lzvrd.us-west4.gcp.confluent.cloud:9092';
  let newBroker;
  beforeAll(() => {
    newBroker = new broker(API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER)
  })
  describe('Broker constructed successfully with these properties', () => {
    it('The key should match what was inputted', () => {
      expect(newBroker.key).toBe(API_KEY)
    });
    it('The secret should match what was inputted', () => {
      expect(newBroker.secret).toBe(API_SECRET)
    });
    it('The bootstrap server should match what was inputted', () => {
      expect(newBroker.server).toBe(KAFKA_BOOTSTRAP_SERVER)
    });
  })

  describe('Broker create method successfully returns a new kafka instance', () => {
    let testKafka;
    beforeAll(() => {
      testKafka = newBroker.create('new-client')
    })
    it('When the create method is invoked it should return a Kafka object with the ability to produce and consumer', () => {

      console.log(testKafka)
    });
  })

})