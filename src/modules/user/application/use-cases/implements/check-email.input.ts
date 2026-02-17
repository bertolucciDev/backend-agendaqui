import { Email } from '../../../../../core/value-objects/email.vo';

export class CheckEmailInput {
  constructor(public readonly email: Email) {}
}
