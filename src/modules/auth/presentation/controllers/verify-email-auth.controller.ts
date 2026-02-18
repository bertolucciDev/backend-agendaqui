import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { VerifyEmailDTO } from '../dto/input/verify-email';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';
import { VerifyEmailUseCase } from '../../application/use-cases/verify-email.use-case';

@ApiTags('Auth')
@Controller('auth/verify-email')
export class VerifyEmailAuthController {
  constructor(private readonly verifyEmailUseCase: VerifyEmailUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Verify user email',
    description:
      'Validates the verification token or code sent to the user email after registration.',
  })
  @ApiBody({ type: VerifyEmailDTO })
  @ApiOkResponse({
    description: 'Email verified successfully',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  async verifyEmail(@Body() dto: VerifyEmailDTO): Promise<MessageResponseDTO> {
    await this.verifyEmailUseCase.execute({
      token: dto.token,
      code: dto.code,
    });

    return new MessageResponseDTO('Email verified successfully.');
  }
}
