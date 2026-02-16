import { VerificationType } from '../../../../../shared/types/verification-type.type';

export class VerifyRecoveryCommand {
  constructor(
    public readonly type: VerificationType,
    public readonly token?: string,
    public readonly code?: string,
  ) {}
}
