/**
 * Initializes the kafka broker using the following arguments passed in from the process environment. The environment values correspond to their respective properties on the Broker constructor.
 * @param {.ENV string} API_KEY : @key
 * @param {.ENV string} API_SECRET : @secret
 * @param {.ENV string} KAFKA_BOOTSTRAP_SERVER : @server
 */

const Broker = require('./broker');
require('dotenv').config();

const { API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER } = process.env;

const broker = new Broker(API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER);
const kafka = broker.create('new-client');

module.exports = kafka;