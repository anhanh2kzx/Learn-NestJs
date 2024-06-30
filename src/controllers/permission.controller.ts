import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CheckAbilities } from '../casl/check-abilities.decorator';
import { Action } from '../casl/action.enum';
import { User } from '../entities/user.entity';
import { PermissionService } from '../services/permission.service';
import { Permission } from '../entities/permission.entity';

// @UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @CheckAbilities({ action: Action.Read, subject: User })
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  // @CheckAbilities({ action: Action.Read, subject: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  // @CheckAbilities({ action: Action.Create, subject: User })
  @Post()
  create(@Body() createPermissionDto: Partial<Permission>) {
    return this.permissionService.create(createPermissionDto);
  }

  @CheckAbilities({ action: Action.Update, subject: User })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: Partial<Permission>,
  ) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @CheckAbilities({ action: Action.Delete, subject: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
