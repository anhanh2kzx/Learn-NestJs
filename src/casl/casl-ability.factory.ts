import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Role } from '../user/role.entity';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = InferSubjects<typeof User | typeof Role> | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user?.roles.some((role) => role?.name === 'admin')) {
      can('manage', 'all');
    } else {
      can('read', 'all');
      can('update', User, { id: user?.id });
      cannot('delete', User, { id: user?.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
