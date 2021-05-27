/**
 * Initializes the kafka broker using the following arguments passed in from the process environment. The environment values correspond to their respective properties on the Broker constructor.
 * @API_KEY : @key
 * @API_SECRET : @secret
 * @KAFKA_BOOTSTRAP_SERVER : @server
 */

const Broker = require('./broker');
require('dotenv').config();

const { API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER } = process.env;

const broker = new Broker(API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER);
const kafka = broker.create('new-client');

module.exports = kafka;