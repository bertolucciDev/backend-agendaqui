import { VerificationType } from '../../../../core/enum/verification-type.enum';
interface ResetPasswordTemplateProps {
  redirect_url: string;
  code: string;
  token: string;
  name: string;
  type: VerificationType.PASSWORD_RESET;
}

export function ResetPasswordTemplate({
  redirect_url,
  code,
  token,
  name,
  type,
}: ResetPasswordTemplateProps) {
  const resetLink = `${redirect_url}?token=${token}&code=${code}&type=${type}`;

  return {
    subject: 'Recuperação de senha',
    html: `
        <div style="font-family: Arial, sans-serif; color: #333333; font-size: 16px; line-height: 1.5;">
        <p>Olá ${name},</p>
        <p>Você solicitou a recuperação da sua senha. Clique no botão abaixo:</p>

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
              <a href="${resetLink}"
                target="_blank"
                style="font-size: 16px;
                        font-weight: bold;
                        font-family: Arial, sans-serif;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 14px 28px;
                        display: inline-block;">
                Redefinir Senha
              </a>
            </td>
          </tr>
        </table>

        <p style="color: #333333; text-decoration: none; margin-top: 20px;">
          Se você não solicitou a redefinição, pode ignorar este e-mail.
        </p>
      </div>
    `,
  };
}
