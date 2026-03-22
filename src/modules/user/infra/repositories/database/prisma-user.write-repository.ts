import { Injectable } from '@nestjs/common';

import { User } from '../../../../../modules/user/domain/entities/user.entity';
import { AbstractUserWriteRepository } from '../../../../../modules/user/domain/repositories/user.write-repository';
import { PrismaService } from '../../../../../shared/infra/database/prisma/prisma.service';

import { Email } from '../../../../../core/value-objects/email.vo';
import { Password } from '../../../../../core/value-objects/password.vo';
import { Role } from '../../../../../core/enum/role.enum';

@Injectable()
export class PrismaUserWriteRepository implements AbstractUserWriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmailValue(),
        // phone: user.getPhone(),
        passwordHash: user.getHashedPassword(),
        role: user.getRole(),
        isVerified: user.isUserVerified(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new User({
      id: created.id,
      name: created.name,
      email: new Email(created.email),
      phone: created.phone,
      // cpf: created.cpf,
      // cnpj: created.cnpj,
      password: Password.fromHashed(created.passwordHash),
      isVerified: created.isVerified,
      role: created.role as Role,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: user.getId() },
      data: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmailValue(),
        passwordHash: user.getHashedPassword(),
        isVerified: user.isUserVerified(),
        role: user.getRole(),
        updatedAt: new Date(),
      },
    });

    return new User({
      id: updated.id,
      name: updated.name,
      email: new Email(updated.email),
      phone: updated.phone,
      // cpf: updated.cpf,
      // cnpj: updated.cnpj,
      password: Password.fromHashed(updated.passwordHash),
      role: updated.role as Role,
      isVerified: updated.isVerified,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async updateIsVerified(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isVerified: true, updatedAt: new Date() },
    });
  }
}
