// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { AbstractVerificationRepository } from '../../domain/repositories/verify.repository';
// import { VerificationType } from '../../../../../generated/prisma/enums';

// @Injectable()
// export class VerifyRecoveryUseCase {
//   constructor(
//     private readonly verificationRepository: AbstractVerificationRepository,
//   ) {}

//   async execute(
//     dto: VerifyRecoveryC,
//   ): Promise<{ id: string; userId: string; type: VerificationType }> {
//     const { token, code } = dto;

//     if (!token && !code) {
//       throw new HttpException(
//         'Token or code is required',
//         HttpStatus.BAD_REQUEST,
//       );
//     }

//     const record = token
//       ? await this.verificationRepository.findByToken(token)
//       : await this.verificationRepository.findByCode(code!);

//     if (!record) {
//       throw new HttpException(
//         'Invalid or expired verification record',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }

//     if (record.isUsed) {
//       const message =
//         record.type === VerificationType.PASSWORD_RESET
//           ? 'Reset link or code already used'
//           : 'Email already verified';
//       throw new HttpException(message, HttpStatus.BAD_REQUEST);
//     }

//     if (record.expiresAt.getTime() < Date.now()) {
//       throw new HttpException('Verification expired', HttpStatus.GONE);
//     }

//     return {
//       id: record.id,
//       userId: record.userId,
//       type: record.type,
//     };
//   }
// }
