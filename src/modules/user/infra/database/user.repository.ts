import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepo } from '../../domain/repositories/user.repo';
import { PrismaService } from '../../../../shared/infra/database/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../../../shared/domain/value-objects/email.vo';
import { Password } from '../../../../shared/domain/value-objects/password.vo';
import { Role } from '../../../../shared/types/role.type';

@Injectable()
export class UserRepository implements UserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }

    return new User({
      id,
      name: user.name,
      email: new Email(user.email),
      password: Password.fromHashed(user.password),
      role: user.role as Role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
