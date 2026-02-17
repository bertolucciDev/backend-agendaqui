import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDTO } from '../dto/input/login.dto';
import { SignResponseDTO } from '../dto/output/sign-response.dto';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { CreateUserSessionUseCase } from '../../application/use-cases/create-user-session.handler';

@ApiTags('Auth')
@Controller('auth')
export class SignInAuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly createUserSession: CreateUserSessionUseCase,
  ) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({
    description: 'Login successful',
    type: SignResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async signIn(@Body() dto: LoginDTO): Promise<SignResponseDTO> {
    const user = await this.signInUseCase.execute(dto);

    return this.createUserSession.execute(user);
  }
}
