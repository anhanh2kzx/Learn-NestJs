import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async getHello(): Promise<string> {
    const repo = this.dataSource.getRepository(Role);
    console.log(await repo.find());

    return 'Hello World!';
  }
}
