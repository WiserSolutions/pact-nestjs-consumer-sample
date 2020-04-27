import { HttpService } from "@nestjs/common";
import { Cat } from "./cats";
import axios = require("axios");
export declare class CatService {
    private httpService;
    private url;
    getCatMock(): Cat;
    constructor(httpService: HttpService);
    setUrl(url: string): void;
    getCat(): import("rxjs").Observable<any>;
    getCatPlain(): Promise<axios.AxiosResponse<any>>;
    sum(val: number, val2: number): number;
}
