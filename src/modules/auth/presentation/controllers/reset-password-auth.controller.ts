import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PasswordResetDTO } from '../dto/input/password-reset.dto';
import { PasswordResetUseCase } from '../../application/use-cases/password-reset.use-case';

@ApiTags('Auth')
@Controller('auth')
export class PasswordResetAuthController {
  constructor(private readonly passwordReset: PasswordResetUseCase) {}

  @Post('reset-password')
  async resetPassword(@Body() body: PasswordResetDTO) {
    await this.passwordReset.execute(body);

    return { message: 'Password reset successfully' };
  }
}
