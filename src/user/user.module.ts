import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { Menu } from '../entities/menu.enity';
import { MenuService } from '../services/menu.service';
import { PermissionService } from '../services/permission.service';
import { MenuController } from '../controllers/menu.controller';
import { PermissionController } from '../controllers/permission.controller';
import { RoleService } from '../services/role.service';
import { RoleController } from '../controllers/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission, Menu])],
  providers: [UserService, MenuService, PermissionService, RoleService],
  controllers: [
    UserController,
    MenuController,
    PermissionController,
    RoleController,
  ],
  exports: [UserService, MenuService, PermissionService, RoleService, TypeOrmModule],
})
export class UserModule {
}
