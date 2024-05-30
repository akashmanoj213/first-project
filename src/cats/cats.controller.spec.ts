import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './Interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  const cats: Cat[] = [
    {
      name: 'Tinkles',
      age: 2,
      breed: 'Persian',
    },
    {
      name: 'Snowball',
      age: 5,
      breed: 'Nadan',
    },
  ];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of cats', async () => {
      jest.spyOn(catsService, 'findAll').mockImplementation(() => cats);

      expect(await catsController.findAll()).toBe(cats);
    });
  });

  describe('findOneCat', () => {
    it('should return same cat as path param name', async () => {
      jest
        .spyOn(catsService, 'findOne')
        .mockImplementation((name: string) =>
          cats.find((cat) => cat.name === name),
        );

      const snowBall = {
        name: 'Snowball',
        age: 5,
        breed: 'Nadan',
      };

      expect(await catsController.findOneCat(snowBall.name)).toStrictEqual(
        snowBall,
      );
    });
  });
});
