import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestPasswordResetCommand } from '../../application/use-cases/implements/request-password-reset.command';
import { RequestPasswordResetDTO } from '../dto/input/request-password-reset.dto';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';
import { RequestPasswordResetUseCase } from '../../application/use-cases/request-password-reset.use-case';

@ApiTags('Auth')
@Controller('auth')
export class RequestPasswordResetAuthController {
  constructor(
    private readonly requestPasswordReset: RequestPasswordResetUseCase,
  ) {}

  @Post('request-password-reset')
  @HttpCode(200)
  @ApiOperation({ summary: 'Request a password reset email' })
  @ApiBody({ type: RequestPasswordResetDTO })
  @ApiOkResponse({
    description: 'Password reset email sent',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid email' })
  async forgotPassword(
    @Body() dto: RequestPasswordResetDTO,
  ): Promise<MessageResponseDTO> {
    await this.requestPasswordReset.execute(
      new RequestPasswordResetCommand(dto.email),
    );
    return new MessageResponseDTO('Password reset email sent successfully.');
  }
}
