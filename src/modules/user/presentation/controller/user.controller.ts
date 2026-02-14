import { Controller, Get, Param } from '@nestjs/common';
import { GetUserIdUseCase } from '../../application/use-cases/get-user-id.use-case';
import { User } from '../../domain/entities/user.entity';

@Controller('/users')
export class UserController {
  constructor(private readonly getUserId: GetUserIdUseCase) {}

  @Get(':id')
  async getId(@Param('id') id: string): Promise<User | null> {
    return await this.getUserId.execute(id);
  }
}
