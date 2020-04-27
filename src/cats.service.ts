import { Injectable, HttpService } from "@nestjs/common";
import { map } from 'rxjs/operators';
import { Cat } from "./cats";
import axios = require("axios");


@Injectable()
export class CatService {
    private url =  process.env.PROVIDER_URL || "http://localhost:3000";

   getCatMock(): Cat{
        return {
            'name': 'cat',
            'age': 12,
            'breed': 'angora'
        };
    }

    constructor(private httpService: HttpService){}
    setUrl(url: string){
        this.url = url;
    }
    getCat() {
         return this.httpService.get(this.url+"/cats").pipe(map(resp=>{
             console.log(resp.data);
            return resp.data}));
    }
    getCatPlain() {
        return axios.default.request({
            method: "GET",
            baseURL: this.url,
            url: "/cats",
            headers: { Accept: "application/json" },
          })
   }

    sum(val: number, val2: number): number {
        return val + val2;
    }

}