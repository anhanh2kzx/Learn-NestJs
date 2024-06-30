import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { User } from '../src/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const users = [
      {
        id: 1,
        username: 'admin',
        password: '123456',
        roles: [{ id: 1, name: 'User' }],
      } as User,
      { id: 2, username: 'user', password: '123456', roles: [] } as User,
    ];

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual(expect.objectContaining(users));
      });
  });

  it('get list permission from role', () => {
    return request(app.getHttpServer())
      .get('/roles/2/menus-permissions')
      .expect(200)
      .then((response: any) => {
        console.log(JSON.stringify(response.body,null,"\t"));
      });
  });
});
