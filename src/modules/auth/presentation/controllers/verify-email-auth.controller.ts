import { Body, Controller, Post } from '@nestjs/common';
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
@Controller('auth')
export class VerifyEmailAuthController {
  constructor(private readonly verifyEmailUseCase: VerifyEmailUseCase) {}

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify user email using token or code' })
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
