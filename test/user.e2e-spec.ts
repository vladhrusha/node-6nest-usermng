import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/modules/user/user.module';
import { UserService } from '../src/modules/user/user.service';
import { INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
describe('Users e2e', () => {
  let user: INestApplication;
  let userService = { getByNickname: () => ['test'], addUser: () => ['test'] };

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
    it(`GET /user`, async () => {
      const response = await request(user.getHttpServer())
        .get(`/${appName}/${appVersion}/user/:nickname`)
        .expect(200);
      expect(response.body).toEqual(await userService.getByNickname());
    });
  });
  describe('POST /user', () => {
    it(`POST /user`, async () => {
      const userObject = {
        nickname: 'vladhrusha36333144134',
        password: 'ps1',
        lastname: 'hrusha1',
        firstname: 'vlad1',
      };
      const response = await request(user.getHttpServer())
        .post(`/${appName}/${appVersion}/user`)
        .send(userObject)
        .expect(201);
      expect(response.body).toEqual(await userService.addUser());
    });
  });

  afterAll(async () => {
    await user.close();
  });
});
