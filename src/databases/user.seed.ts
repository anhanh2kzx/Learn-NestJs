import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { insertDataWithPrimaryKeyId } from '../orm.config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Menu } from '../entities/menu.enity';
import { Permission } from '../entities/permission.entity';

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const permissions = [
      { id: 1, name: 'can_read' } as Permission,
      { id: 2, name: 'can_write' } as Permission,
      { id: 3, name: 'can-execute' } as Permission,
      { id: 4, name: 'can-delete' } as Permission,
      { id: 5, name: 'can-update' } as Permission,
    ];
    await insertDataWithPrimaryKeyId(permissions, dataSource, Permission);

    const menus = [
      {
        id: 1,
        name: 'Quản trị thú cưng',
        parentId: 0,
        permissions: [{ id: 1 }, { id: 2 }],
      } as Menu,
      { id: 2, name: 'Xuất báo cáo', parentId: 1, permissions: [{ id: 1 }, { id: 2 },{id: 3},{id:4}], } as Menu,
    ];
    await insertDataWithPrimaryKeyId(menus, dataSource, Menu);

    const roles = [
      { id: 1, name: 'User', menus: [{ id: 1 }] } as Role,
      { id: 2, name: 'Admin' ,menus: [{ id: 1 },{id: 2}] } as Role,
    ];
    await insertDataWithPrimaryKeyId(roles, dataSource, Role);

    const users = [
      {
        id: 1,
        username: 'admin',
        password: '123456',
        roles: [{ id: 1 }],
      } as User,
      { id: 2, username: 'user', password: '123456' } as User,
    ];
    await insertDataWithPrimaryKeyId(users, dataSource, User);
  }
}
