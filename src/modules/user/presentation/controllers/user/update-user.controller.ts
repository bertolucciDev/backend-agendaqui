import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
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
import { UpdateUserInput } from '../../../application/use-cases/implements/update-user.input';
import { UpdateUserDTO } from '../../dto/input/update-user.dto';
import { MessageResponseDTO } from '../../../../../core/presentation/dto/message-response.dto';
import { UpdateUserUseCase } from '../../../application/use-cases/update-user.use-case';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CLIENT)
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Patch('profile')
  @ApiOperation({ summary: 'Update the authenticated user profile' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({
    description: 'Profile updated successfully',
    type: MessageResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  async updateProfile(
    @Request() req: { user: JwtUser },
    @Body() updateData: UpdateUserDTO,
  ): Promise<MessageResponseDTO> {
    const { sub: requesterId, role: requesterRole } = req.user;

    const data = new UpdateUserInput(
      updateData,
      requesterId,
      requesterRole,
      requesterId,
      updateData.currentPassword,
    );

    await this.updateUserUseCase.execute(data);
    return { message: 'Profile updated successfully' };
  }
}
