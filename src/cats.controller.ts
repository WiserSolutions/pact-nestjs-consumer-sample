import { Controller, Get } from "@nestjs/common";
import { CatService } from "./cats.service";
import { Cat } from "./cats";

@Controller('catsDetails')
export class CatsController {
    value: Cat;
    constructor(private catsService: CatService){
        this.catsService.getCat().subscribe(response => this.value = response);
    }
    @Get()
    getCat(): string{
        
        return 'Details for the cat: Name is '+this.value.name + ", Age is "+this.value.age;
    }
}