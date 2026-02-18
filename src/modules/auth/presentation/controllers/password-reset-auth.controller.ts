import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PasswordResetDTO } from '../dto/input/password-reset.dto';
import { PasswordResetUseCase } from '../../application/use-cases/password-reset.use-case';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';

@ApiTags('Auth')
@Controller('auth/reset-password')
export class PasswordResetAuthController {
  constructor(private readonly passwordReset: PasswordResetUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Password reset',
    description:
      'Resets the user password using a valid reset token or verification code.',
  })
  @ApiBody({ type: PasswordResetDTO })
  @ApiOkResponse({
    description: 'Password has been reset successfully.',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  async resetPassword(
    @Body() body: PasswordResetDTO,
  ): Promise<MessageResponseDTO> {
    await this.passwordReset.execute(body);

    return new MessageResponseDTO('Password has been reset successfully.');
  }
}
