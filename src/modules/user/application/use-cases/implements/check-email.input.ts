import { Email } from '../../../../../shared/domain/value-objects/email.vo';

export class CheckEmailInput {
  constructor(public readonly email: Email) {}
}
