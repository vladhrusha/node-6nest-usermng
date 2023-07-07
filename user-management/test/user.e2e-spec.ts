import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/modules/user/user.module';
import { UserService } from '../src/modules/user/user.service';
import { INestApplication } from '@nestjs/common';

describe('Users e2e', () => {
  let user: INestApplication;
  let userService = { getByNickname: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    user = moduleRef.createNestApplication();
    await user.init();
  });
  describe('GET /user', () => {
    it(`should return user`, async () => {
      const response = await request(user.getHttpServer())
        .get('/task6/v1/user/:nickname')
        .expect(200);
      expect(response.body).toEqual(await userService.getByNickname());
    });
  });

  afterAll(async () => {
    await user.close();
  });
});
