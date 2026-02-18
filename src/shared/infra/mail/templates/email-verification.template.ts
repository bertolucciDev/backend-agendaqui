import { VerificationType } from '../../../../core/enum/verification-type.enum';
import { env } from '../../../../config/env';

interface VerifyEmailTemplateProps {
  redirect_url: string;
  code: string;
  token: string;
  name: string;
  type: VerificationType.VERIFY_EMAIL;
}

export function verifyEmailTemplate({
  redirect_url,
  code,
  token,
  name,
  type,
}: VerifyEmailTemplateProps) {
  const verificationLink = `${redirect_url}?token=${token}&code=${code}&type=${type}`;

  return {
    subject: 'Verifique seu e-mail',
    html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333;">
          <p style="color: #333333; text-decoration: none;">Olá ${name},</p>
          <p style="color: #333333; text-decoration: none;">
            Você se cadastrou no ${env.APP_NAME}. Verifique seu e-mail.
            Você pode usar o código( ${code} ) abaixo ou clicar no botão para verificar seu e-mail:
          </p>

          <!-- Bloco do código -->
          <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px 0;">
            <tr>
              <td align="center">
                <p style="font-size: 24px; font-weight: bold; color: #3803f6; margin-bottom: 20px;">
                  ${code}
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#3803f6" style="border-radius: 8px;">
                <a href="${verificationLink}"
                  target="_blank"
                  style="font-size: 16px;
                        font-weight: bold;
                        font-family: Arial, sans-serif;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 14px 28px;
                        display: inline-block;">
                  Clique aqui para verificar
                </a>
              </td>
            </tr>
          </table>

          <p style="margin-top: 20px; color: #333333; text-decoration: none; font-size: 16px; line-height: 1.5;">
            Se você não se cadastrou na nossa plataforma, pode ignorar este e-mail.
          </p>
        </div>
      `,
  };
}
