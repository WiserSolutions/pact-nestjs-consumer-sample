import { publishPacts } from "@pact-foundation/pact-node";
import { resolve } from "path";

const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8081';
const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';

const opts = {
  pactFilesOrDirs: [resolve(process.cwd(), "pacts")],
  pactBroker: pactBrokerUrl,
  pactBrokerUsername: pactBrokerUsername,
  pactBrokerPassword: pactBrokerPassword,
  consumerVersion: "2.0.0",
}

publishPacts(opts)