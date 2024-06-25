import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      relations: ['roles'],
      where: { id },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOneRole(id: number): Promise<Role> {
    return this.rolesRepository.findOne({ where: { id } });
  }

  async createRole(role: Partial<Role>): Promise<Role> {
    const newRole = this.rolesRepository.create(role);
    return this.rolesRepository.save(newRole);
  }

  async updateRole(id: number, role: Partial<Role>): Promise<Role> {
    await this.rolesRepository.update(id, role);
    return this.findOneRole(id);
  }

  async removeRole(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
