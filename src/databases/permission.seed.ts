import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../entities/role.entity';
import { insertDataWithPrimaryKeyId } from "../orm.config";
import { Permission } from "../entities/permission.entity";
export default class CreatePermission implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roles = [
      { id: 1, name: 'can_read' } as Permission,
      { id: 2, name: 'can_write' } as Permission,
      { id: 3, name: 'can-execute' } as Permission,
      { id: 4, name: 'can-delete' } as Permission,
      { id: 5, name: 'can-update' } as Permission,
    ];
    await insertDataWithPrimaryKeyId(roles, dataSource, Permission);
  }
}
