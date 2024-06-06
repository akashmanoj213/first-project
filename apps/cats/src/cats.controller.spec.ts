import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './Interfaces/cat.interface';
import { HttpService } from '@nestjs/axios';
import { UserListResponseDto } from './dto/user-list-response.dto';
import { of } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  let httpService: HttpService;

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

  const mockUserListResponse: UserListResponseDto = {
    data: [
      {
        id: 1,
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
      },
    ],
    page: 1,
    per_page: 1,
    total: 1,
    total_pages: 1,
  };

  const mockAxiosResponse = {
    data: mockUserListResponse,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as AxiosRequestConfig,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(of(mockAxiosResponse)),
          },
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    httpService = moduleRef.get<HttpService>(HttpService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of cats', async () => {
      jest.spyOn(catsService, 'findAll').mockImplementation(() => cats);

      expect(await catsController.findAll()).toStrictEqual(cats);
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

  describe('findCatOwners', () => {
    it('should return user list response', async () => {
      const result = await catsController.findCatOwners();
      expect(result).toEqual(mockUserListResponse);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://reqres.in/api/users',
      );
    });
  });
});
