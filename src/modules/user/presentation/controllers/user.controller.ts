import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../modules/auth/infra/guards/jwt.guard';
import { JwtUser } from '../../../../modules/auth/domain/repositories/jwt.repository';
import { RolesGuard } from '../../../../modules/auth/infra/guards/roles.guard';
import { Roles } from '../../../../modules/auth/infra/decorators/roles.decorator';
import { Role } from '../../../../core/enum/role.enum';
import { DeleteUserInput } from '../../application/use-cases/implements/delete-user.input';
import { UpdateUserInput } from '../../application/use-cases/implements/update-user.input';
import { GetUserByIdInput } from '../../application/use-cases/implements/get-user-by-id.query';
import { UserResponseDTO } from '../dto/output/user-response.dto';
import { UpdateUserDTO } from '../dto/input/update-user.dto';
import { DeleteUserDTO } from '../dto/input/delete-user.dto';
import { MessageResponseDTO } from '../../../../core/presentation/dto/message-response.dto';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.USER)
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiOkResponse({
    description: 'Returns the profile of the authenticated user',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  async getProfile(
    @Request() req: { user: JwtUser },
  ): Promise<UserResponseDTO> {
    const { sub: requesterId, role: requesterRole } = req.user;

    const query = new GetUserByIdInput(requesterId, requesterRole, requesterId);

    return this.getUserByIdUseCase.execute(query);
  }

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

    const command = new UpdateUserInput(
      updateData,
      requesterId,
      requesterRole,
      requesterId,
      updateData.currentPassword,
    );

    await this.updateUserUseCase.execute(command);
    return { message: 'Profile updated successfully' };
  }

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

    const command = new DeleteUserInput(
      requesterId,
      requesterRole,
      requesterId,
      dto.password,
    );

    await this.deleteUserUseCase.execute(command);
    return { message: 'Profile deleted successfully' };
  }
}
