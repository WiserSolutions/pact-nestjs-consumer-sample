"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cats_service_1 = require("./cats.service");
const common_1 = require("@nestjs/common");
const path = require("path");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinonChai = require("sinon-chai");
const pact_1 = require("@pact-foundation/pact");
const matchers_1 = require("@pact-foundation/pact/dsl/matchers");
const expect = chai.expect;
const { eachLike } = pact_1.Matchers;
chai.use(sinonChai);
chai.use(chaiAsPromised);
describe('Pact Testing', () => {
    const url = "http://localhost";
    let catsService;
    const provider = new pact_1.Pact({
        log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        spec: 2,
        consumer: "catsConsumer",
        provider: "catsProvider",
    });
    const catExample = {
        'name': 'cat',
        'age': 12,
        'breed': 'angora'
    };
    const EXPECTED_BODY = matchers_1.like(catExample);
    before(() => provider.setup().then(async (opts) => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [common_1.HttpModule],
            providers: [cats_service_1.CatService],
        }).compile();
        catsService = await moduleRef.resolve(cats_service_1.CatService);
    }));
    after(() => provider.finalize());
    afterEach(() => provider.verify());
    describe("get /cats using object pattern", () => {
        before(() => {
            return provider.addInteraction({
                state: "i have a list of cats",
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
                        "Content-Type": "application/json",
                    },
                    body: EXPECTED_BODY,
                },
            });
        });
        it("returns the correct response", done => {
            catsService.getCat().subscribe((response) => {
                console.log('-----');
                console.log(response);
                console.log(catExample);
                expect(response).to.deep.eq(catExample);
                done();
            }, done);
        });
    });
});
//# sourceMappingURL=cats.service.pacts.spec2.js.map