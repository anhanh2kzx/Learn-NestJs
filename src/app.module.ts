import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { db_config } from './orm.config';
import { CaslAbilityFactory } from '../dist/casl/casl-ability.factory';
import { CaslAbilityGuard } from '../dist/casl/abilities.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(db_config as any), AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    CaslAbilityFactory,
    {
      provide: APP_GUARD,
      useClass: CaslAbilityGuard,
    },
    JwtService,
    AuthService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).exclude('/auth/login').forRoutes("*")
  }

}
