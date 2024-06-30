import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { Permission } from "./entities/permission.entity";
import { Menu } from "./entities/menu.enity";
import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from "typeorm";
import CreateUsers from "./databases/user.seed";

export const db_config = {
  type: 'better-sqlite3',
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'admin1234',
  database: 'test.db',
  seeds: [ CreateUsers],
  entities: [User, Role, Permission, Menu],
  synchronize: true,
};

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
