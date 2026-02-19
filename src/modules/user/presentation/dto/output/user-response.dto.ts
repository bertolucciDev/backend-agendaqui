import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';

import { User } from '../../../domain/entities/user.entity';
import { Role } from '../../../../../core/enum/role.enum';

export class UserResponseDTO {
  @IsUUID()
  @Expose()
  @ApiProperty({
    example: 'a3b1c4d5-6789-40ab-91cd-ef1234567890',
    description: 'Unique identifier of the user',
  })
  readonly id: string;

  @IsString()
  @Expose()
  @ApiProperty({
    example: 'Lucas Lanza',
    description: 'Full name of the user',
  })
  readonly name: string;

  @IsEmail()
  @Expose()
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  readonly email: string;

  @Expose()
  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
    example: Role.CLIENT,
    description: 'Role assigned to the user',
  })
  readonly role: Role;

  constructor(user: User) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmailValue();
    this.role = user.getRole();
  }
}
