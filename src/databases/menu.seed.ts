import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { insertDataWithPrimaryKeyId } from "../orm.config";
import { Menu } from "../entities/menu.enity";

export default class CreateMenus implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roles = [
      { id: 1, name: 'Quản trị thú cưng', parentId:1 } as Menu,
      { id: 2, name: 'Xuất báo cáo', parentId:1 } as Menu,
    ];
    await insertDataWithPrimaryKeyId(roles, dataSource, Menu);
  }
}
