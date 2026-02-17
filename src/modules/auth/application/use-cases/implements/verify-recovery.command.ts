import { VerificationType } from '../../../../../core/enum/verification-type.enum';

export class VerifyRecoveryCommand {
  constructor(
    public readonly type: VerificationType,
    public readonly token?: string,
    public readonly code?: string,
  ) {}
}
