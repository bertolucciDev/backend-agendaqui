import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class PasswordResetDTO {
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: 'myPassword123', minLength: 6 })
  password!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'abcdef123456...' })
  token?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'abcdef' })
  code?: string;
}
