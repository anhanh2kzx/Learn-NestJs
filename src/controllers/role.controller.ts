import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CheckAbilities } from "../casl/check-abilities.decorator";
import { Action } from "../casl/action.enum";
import { Role } from "../entities/role.entity";
import { RoleService } from "../services/role.service";

// @UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly userService: UserService,
              private readonly roleService: RoleService) {}

  @CheckAbilities({ action: Action.Read, subject: Role })
  @Get()
  findAllRoles() {
    return this.userService.findAllRoles();
  }

  @CheckAbilities({ action: Action.Read, subject: Role })
  @Get(':id')
  findOneRole(@Param('id') id: string) {
    return this.userService.findOneRole(+id);
  }

  // @CheckAbilities({ action: Action.Create, subject: Role })
  @Post()
  createRole(@Body() createRoleDto: Partial<Role>) {
    return this.userService.createRole(createRoleDto);
  }

  @CheckAbilities({ action: Action.Update, subject: Role })
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: Partial<Role>) {
    return this.userService.updateRole(+id, updateRoleDto);
  }

  @CheckAbilities({ action: Action.Delete, subject: Role })
  @Delete(':id')
  removeRole(@Param('id') id: string) {
    return this.userService.removeRole(+id);
  }

  @Patch(':roleId/menus')
  addMenusToRole(@Param('roleId') roleId: string, @Body('menuIds') menuIds: number[]) {
    return this.roleService.addMenusToRole(+roleId, menuIds);
  }
}
