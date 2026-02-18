import { Controller, Get, HttpCode, Request, UseGuards } from '@nestjs/common';
import { JwtUser } from '../../domain/repositories/jwt.repository';
import { UserResponseDTO } from '../../../../modules/user/presentation/dto/output/user-response.dto';
import { MeUseCase } from '../../application/use-cases/me.use-case';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infra/guards/jwt.guard';
import { RolesGuard } from '../../infra/guards/roles.guard';

@ApiTags('Auth')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('auth/me')
export class MeAuthController {
  constructor(private readonly meAuthUseCase: MeUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Me',
    description:
      'Returns the profile data of the currently authenticated user based on the access token.',
  })
  @ApiOkResponse({
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  async me(@Request() req: { user: JwtUser }): Promise<UserResponseDTO> {
    return this.meAuthUseCase.execute(req.user.sub);
  }
}
