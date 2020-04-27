import { CatService } from "./cats.service";
import { Cat } from "./cats";
export declare class CatsController {
    private catsService;
    value: Cat;
    constructor(catsService: CatService);
    getCat(): string;
}
