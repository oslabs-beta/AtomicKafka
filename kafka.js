const Confluent = require('./atomic-kafka');
require('dotenv').config();

const { API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER } = process.env;

const broker = new Confluent(API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER);
const kafka = broker.create('new-client');

module.exports = kafka;