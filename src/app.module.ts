import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { CaslAbilityFactory } from "./casl/casl-ability.factory";
import { APP_GUARD } from "@nestjs/core";
import { AbilitiesGuard } from "./casl/abilities.guard";
import { db_config } from "./orm.config";

@Module({
  imports: [TypeOrmModule.forRoot(db_config as any), UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    CaslAbilityFactory,
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard
    }
  ]
})
export class AppModule {
}
