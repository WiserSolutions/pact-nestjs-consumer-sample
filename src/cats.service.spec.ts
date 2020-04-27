import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cats.service';
import { Cat } from './cats';
import { HttpModule } from '@nestjs/common';



describe('Basic Test Cats Service', () => {
  let catsService: CatService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CatService],
    }).compile();
    catsService = await moduleRef.resolve(CatService);
  });

  describe ('Get Cats',()=> {
    it('Get Math', async ()=> {
      expect(catsService.sum(1,2)).toBe(3);
    });

    it('Get single mocked  cat', async ()=> {
      const result: Cat = {
        'name': 'cat',
        'age': 12,
        'breed': 'angora'
      };
      jest.spyOn(catsService, 'getCatMock').mockImplementation(()=> result);
      expect (catsService.getCatMock()).toMatchObject(result);
    });
  });
});
