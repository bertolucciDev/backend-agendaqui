import { Body, Controller, Delete, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../auth/infra/guards/jwt.guard';
import { JwtUser } from '../../../../auth/domain/repositories/jwt.repository';
import { RolesGuard } from '../../../../auth/infra/guards/roles.guard';
import { Roles } from '../../../../auth/infra/decorators/roles.decorator';
import { Role } from '../../../../../core/enum/role.enum';
import { DeleteUserInput } from '../../../application/use-cases/implements/delete-user.input';
import { DeleteUserDTO } from '../../dto/input/delete-user.dto';
import { MessageResponseDTO } from '../../../../../core/presentation/dto/message-response.dto';
import { DeleteUserUseCase } from '../../../application/use-cases/delete-user.use-case';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CLIENT)
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete('profile')
  @ApiBody({ type: DeleteUserDTO })
  @ApiOperation({ summary: 'Delete the authenticated user profile' })
  @ApiOkResponse({
    description: 'Profile deleted successfully',
    type: MessageResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid password' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  async deleteProfile(
    @Body('currentPassword') dto: DeleteUserDTO,
    @Request() req: { user: JwtUser },
  ): Promise<MessageResponseDTO> {
    const { sub: requesterId, role: requesterRole } = req.user;

    const data = new DeleteUserInput(
      requesterId,
      requesterRole,
      requesterId,
      dto.password,
    );

    await this.deleteUserUseCase.execute(data);
    return { message: 'Profile deleted successfully' };
  }
}
