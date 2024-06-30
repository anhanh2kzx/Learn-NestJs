import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckAbilities } from '../casl/check-abilities.decorator';
import { Action } from '../casl/action.enum';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CheckAbilities({ action: Action.Read, subject: User })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @CheckAbilities({ action: Action.Read, subject: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @CheckAbilities({ action: Action.Create, subject: User })
  @Post()
  create(@Body() createUserDto: Partial<User>) {
    return this.userService.create(createUserDto);
  }

  @CheckAbilities({ action: Action.Update, subject: User })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.userService.update(+id, updateUserDto);
  }

  @CheckAbilities({ action: Action.Delete, subject: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @CheckAbilities({ action: Action.Read, subject: Role })
  @Get('/roles')
  findAllRoles() {
    return this.userService.findAllRoles();
  }

  @CheckAbilities({ action: Action.Read, subject: Role })
  @Get('/roles/:id')
  findOneRole(@Param('id') id: string) {
    return this.userService.findOneRole(+id);
  }

  // @CheckAbilities({ action: Action.Create, subject: Role })
  @Post('/roles')
  createRole(@Body() createRoleDto: Partial<Role>) {
    return this.userService.createRole(createRoleDto);
  }

  @CheckAbilities({ action: Action.Update, subject: Role })
  @Put('/roles/:id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: Partial<Role>) {
    return this.userService.updateRole(+id, updateRoleDto);
  }

  @CheckAbilities({ action: Action.Delete, subject: Role })
  @Delete('/roles/:id')
  removeRole(@Param('id') id: string) {
    return this.userService.removeRole(+id);
  }

  @Patch(':userId/roles/:roleId')
  addRoleToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.addRoleToUser(+userId, +roleId);
  }

  @Patch(':userId/roles')
  addRolesToUser(
    @Param('userId') userId: string,
    @Body('roleIds') roleIds: number[],
  ) {
    return this.userService.addRolesToUser(+userId, roleIds);
  }
}
