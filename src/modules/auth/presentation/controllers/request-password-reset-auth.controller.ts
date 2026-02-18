import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestPasswordResetDTO } from '../dto/input/request-password-reset.dto';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';
import { RequestPasswordResetUseCase } from '../../application/use-cases/request-password-reset.use-case';

@ApiTags('Auth')
@Controller('auth/request-password-reset')
export class RequestPasswordResetAuthController {
  constructor(
    private readonly requestPasswordReset: RequestPasswordResetUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Request password reset',
    description:
      'Sends a password reset link or code to the user email if the account exists.',
  })
  @ApiBody({ type: RequestPasswordResetDTO })
  @ApiOkResponse({
    description:
      'If the email is registered, a password reset link has been sent.',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid email' })
  async forgotPassword(
    @Body() dto: RequestPasswordResetDTO,
  ): Promise<MessageResponseDTO> {
    await this.requestPasswordReset.execute(dto.email);
    return new MessageResponseDTO(
      'If the email is registered, a password reset link has been sent.',
    );
  }
}
