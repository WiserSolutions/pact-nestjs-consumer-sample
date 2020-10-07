const publisher = require('@pact-foundation/pact-node')
const path = require('path')

const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8080';
const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';
const consumerVersion = process.env.CONSUMER_VERSION || '1.0.1';

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), "pacts")],
  pactBroker: pactBrokerUrl,
  pactBrokerUsername: pactBrokerUsername,
  pactBrokerPassword: pactBrokerPassword,
  consumerVersion: consumerVersion,
  tags: ['prod', 'test'],
}

publisher.publishPacts(opts).then(
  () => console.log('Pacts successfully published'))
