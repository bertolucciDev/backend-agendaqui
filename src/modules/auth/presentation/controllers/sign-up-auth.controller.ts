import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterDTO } from '../dto/input/register.dto';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';

@ApiTags('Auth')
@Controller('auth')
export class SignUpAuthController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({
    description: 'Account successfully created',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid input data' })
  async signUp(@Body() dto: RegisterDTO): Promise<MessageResponseDTO> {
    await this.signUpUseCase.execute(dto);

    return new MessageResponseDTO(
      'User registered successfully. Please verify your email.',
    );
  }
}
