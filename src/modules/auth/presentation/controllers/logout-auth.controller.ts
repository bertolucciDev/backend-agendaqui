import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LogoutDTO } from '../dto/input/logout.dto';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';
import { LogoutUserUseCase } from '../../application/use-cases/logout-user.use-case';

@ApiTags('Auth')
@Controller('auth')
export class LogoutAuthController {
  constructor(private readonly logout: LogoutUserUseCase) {}

  @Post('logout')
  @ApiOperation({ summary: 'Logout user and invalidate refresh token' })
  @ApiBody({ type: LogoutDTO })
  @ApiOkResponse({
    description: 'Logout successful',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid token or user mismatch' })
  async logoutSession(@Body() dto: LogoutDTO): Promise<MessageResponseDTO> {
    await this.logout.execute(dto);
    return new MessageResponseDTO('Logout successful.');
  }
}
