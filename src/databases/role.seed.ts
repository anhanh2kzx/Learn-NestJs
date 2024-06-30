import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../entities/role.entity';
import { insertDataWithPrimaryKeyId } from "../orm.config";
export default class CreateRoles implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roles = [
      { id: 1, name: 'User' } as Role,
      { id: 2, name: 'Admin' } as Role,
    ];
    await insertDataWithPrimaryKeyId(roles, dataSource, Role);
  }
}
