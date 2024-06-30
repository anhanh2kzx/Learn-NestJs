import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { insertDataWithPrimaryKeyId } from "../orm.config";
import { User } from "../entities/user.entity";

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const users = [
      { id: 1, username: "admin", password: "123456" } as User,
      { id: 2, username: "user", password: "123456" } as User
    ];
    await insertDataWithPrimaryKeyId(users, dataSource, User);
  }
}
