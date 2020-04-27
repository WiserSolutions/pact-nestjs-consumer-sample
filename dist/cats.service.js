"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const axios = require("axios");
let CatService = class CatService {
    constructor(httpService) {
        this.httpService = httpService;
        this.url = process.env.PROVIDER_URL || "http://localhost:3000";
    }
    getCatMock() {
        return {
            'name': 'cat',
            'age': 12,
            'breed': 'angora'
        };
    }
    setUrl(url) {
        this.url = url;
    }
    getCat() {
        return this.httpService.get(this.url + "/cats").pipe(operators_1.map(resp => {
            console.log(resp.data);
            return resp.data;
        }));
    }
    getCatPlain() {
        return axios.default.request({
            method: "GET",
            baseURL: this.url,
            url: "/cats",
            headers: { Accept: "application/json" },
        });
    }
    sum(val, val2) {
        return val + val2;
    }
};
CatService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], CatService);
exports.CatService = CatService;
//# sourceMappingURL=cats.service.js.map