import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDTO } from '../dto/input/login.dto';
import { LoginResponseDTO } from '../dto/output/login-response.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

@ApiTags('Auth')
@Controller('auth/login')
export class LoginAuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login user',
    description:
      'Authenticates the user and returns essential profile data along with access and refresh tokens.',
  })
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({
    description: 'Login successful.',
    type: LoginResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() dto: LoginDTO): Promise<LoginResponseDTO> {
    return await this.loginUseCase.execute(dto);
  }
}
