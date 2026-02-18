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
@Controller('auth/logout')
export class LogoutAuthController {
  constructor(private readonly logout: LogoutUserUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Logout',
    description:
      'Logs out the authenticated user by invalidating the refresh token and ending the session.',
  })
  @ApiBody({ type: LogoutDTO })
  @ApiOkResponse({
    description: 'Logout successful.',
    type: MessageResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  async logoutSession(@Body() dto: LogoutDTO): Promise<MessageResponseDTO> {
    await this.logout.execute(dto);
    return new MessageResponseDTO('Logout successful.');
  }
}
