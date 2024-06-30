import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { RoleService } from '../src/services/role.service';
import { Role } from '../src/entities/role.entity';
import { Menu } from '../src/entities/menu.enity';
import { User } from '../src/entities/user.entity';
import { UserService } from '../src/services/user.service';
import { AppModule } from '../src/app.module';

describe('RoleService (e2e)', () => {
  let app: INestApplication;
  let roleService: RoleService;
  let roleRepository: Repository<Role>;
  let menuRepository: Repository<Menu>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    roleService = moduleFixture.get<RoleService>(RoleService);
    roleRepository = moduleFixture.get<Repository<Role>>(getRepositoryToken(Role));
    menuRepository = moduleFixture.get<Repository<Menu>>(getRepositoryToken(Menu));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/roles (POST) create and /roles/:id/menus-permissions (GET) should return menus with permissions', async () => {
    // Create Role
    const role = await roleService.createRole({ name: 'Test Role' });

    // Create Menus and Permissions
    const menu1 = menuRepository.create({ name: 'Menu 1' , parentId: 0,});
    const menu2 = menuRepository.create({ name: 'Menu 2', parentId: 1, });
    await menuRepository.save([menu1, menu2]);

    // Add Menus to Role
    await roleService.addMenusToRole(role.id, [menu1.id, menu2.id]);

    // Fetch Menus and Permissions
    const response = await request(app.getHttpServer()).get(`/roles/${role.id}/menus-permissions`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: menu1.id,
        name: 'Menu 1',
        parentId: 0,
        permissions: [],
      },
      {
        id: menu2.id,
        name: 'Menu 2',
        parentId: 1,
        permissions: [],
      },
    ]);
  });

  it('/roles (POST) should create a role', async () => {
    const roleData = { name: 'Test Role' };
    const response = await request(app.getHttpServer()).post('/roles').send(roleData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(roleData.name);
  });

  it('/roles/:id (GET) should return a role', async () => {
    const role = await roleService.createRole({ name: 'Test Role' });

    const response = await request(app.getHttpServer()).get(`/roles/${role.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(role.name);
  });

  it('/roles/:id (PUT) should update a role', async () => {
    const role = await roleService.createRole({ name: 'Test Role' });
    const updatedRoleData = { name: 'Updated Role' };

    const response = await request(app.getHttpServer()).put(`/roles/${role.id}`).send(updatedRoleData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedRoleData.name);
  });

  it('/roles/:id (DELETE) should delete a role', async () => {
    const role = await roleService.createRole({ name: 'Test Role' });

    const response = await request(app.getHttpServer()).delete(`/roles/${role.id}`);

    expect(response.status).toBe(200);

    const deletedRole = await roleService.findOneRole(role.id);
    expect(deletedRole).toBeNull();
  });
});
