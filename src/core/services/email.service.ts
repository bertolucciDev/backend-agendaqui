export interface SendEmailInput {
  to: string[];
  subject: string;
  html: string;
  text?: string;
}

export abstract class AbstractEmailService {
  abstract sendEmail(input: SendEmailInput): Promise<void>;
}
