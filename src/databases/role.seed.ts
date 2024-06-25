import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../user/role.entity';
export default class CreateRoles implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roles = [
      { id: 1, name: 'User' } as Role,
      { id: 2, name: 'Admin' } as Role,
    ];
    await insertDataWithPrimaryKeyId(roles, dataSource, Role);
  }
}

export async function insertDataWithPrimaryKeyId(
  datas: any[],
  dataSource: DataSource,
  entity: EntityTarget<ObjectLiteral>,
) {
  const repo = dataSource.getRepository(entity);
  await repo.save(
    datas.map((data: DeepPartial<ObjectLiteral>[]) => repo.create(data)),
  );
  console.warn(
    '    Seeded ' +
      datas?.length +
      ' records to table: ' +
      repo.metadata.tableName,
  );
}
