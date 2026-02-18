import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterDTO } from '../dto/input/register.dto';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';

@ApiTags('Auth')
@Controller('auth/register')
export class RegisterAuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Register user',
    description:
      'Creates a new user account and sends a verification email to confirm the registration.',
  })
  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({
    description: 'Registration successful. Please verify your email.',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid input data' })
  async signUp(@Body() dto: RegisterDTO): Promise<MessageResponseDTO> {
    await this.registerUseCase.execute(dto);

    return new MessageResponseDTO(
      'Registration successful. Please verify your email.',
    );
  }
}
