import CreateRoles from "./databases/role.seed";
import { User } from "./user/user.entity";
import { Role } from "./user/role.entity";

export const db_config = {
  type: 'better-sqlite3',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'admin1234',
  database: 'test.db',
  seeds: [CreateRoles],
  entities: [User, Role],
  synchronize: true,
}
