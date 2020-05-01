import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cats.service';
import { Cat } from './cats';
import { HttpModule } from '@nestjs/common';
import path = require("path")
import { Pact, Interaction } from "@pact-foundation/pact"
import { like } from '@pact-foundation/pact/dsl/matchers';
import pact from '@pact-foundation/pact-node';

describe('Pact Testing', () => {
  const url = process.env.PACT_MOCK_URL || "http://localhost:3500"
  let catsService: CatService;
  const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8080';
  const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
  const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';
  const consumerVersion = process.env.CONSUMER_VERSION || '1.0.1';

  const publishBrokerOpts = {
    pactFilesOrDirs: ['./pacts/'],
    pactBroker: pactBrokerUrl,
    pactBrokerUsername: pactBrokerUsername,
    pactBrokerPassword: pactBrokerPassword,
    consumerVersion: consumerVersion,
    tags: ['prod', 'test']
  };

  const provider = new Pact({
    port: 3500,
    logLevel: "trace",
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "catsConsumer",
    provider: "catsProvider",
  })

  const catExample: Cat = {
    'name': 'cat',
    'age': 12,
    'breed': 'angora'
  };
  const EXPECTED_BODY = like(catExample);


  beforeAll(() =>
    provider.setup().then(async opts => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        imports: [HttpModule],
        providers: [CatService],
      }).compile();
      catsService = await moduleRef.resolve(CatService);
    })
  );

  afterAll(() => {
    console.log('consumer version: '+consumerVersion);
    console.log('mock url: '+url);
    console.log('broker url: '+pactBrokerUrl);
    console.log('p: '+pactBrokerPassword);
    console.log('u: '+pactBrokerUsername);
    
    pact.publishPacts(publishBrokerOpts).then(() => {
      console.log('Pact contract publishing complete!');
    }).catch(e => {
        console.log('Pact contract publishing failed: ', e)
      });
      provider.finalize();
  });

  afterEach(() => provider.verify());

  describe("get /cats using builder pattern", () => {
    beforeAll(() => {
      const interaction = new Interaction()
        .given("I have a single cat")
        .uponReceiving("a request for the cat with the builder pattern")
        .withRequest({
          method: "GET",
          path: "/cats",
          headers: {
            Accept: "application/json",
          },
        })
        .willRespondWith({
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: EXPECTED_BODY,
        })
      return provider.addInteraction(interaction)
    });

    it("returns the correct response", done => {
      catsService.setUrl(url);
      catsService.getCatPlain().then((response: any) => {
        expect(response.status).toBe(200);
        expect(response.data).toEqual(catExample);
        done();
      }, done);
    })
  });


  describe("get /cats using object pattern", () => {
    beforeAll(() => {
      return provider.addInteraction({
        state: "I have a single cat object",
        uponReceiving: "a request for cat with the object pattern",
        withRequest: {
          method: "GET",
          path: "/cats",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: EXPECTED_BODY,
        },
      });
    });

    it("returns the correct response", done => {
      catsService.setUrl(url);
      catsService.getCatPlain().then((response: any) => {
        expect(response.data).toEqual(catExample);
        done();
      }, done);
    });
  });
});