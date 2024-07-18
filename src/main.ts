import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { db_config } from './orm.config';
import { runSeeders } from 'typeorm-extension';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // await setupDB();
  await app.listen(3000);
}
bootstrap();

async function setupDB() {
  const dataSource = new DataSource(db_config as any);
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.synchronize();
  await runSeeders(dataSource);
}
