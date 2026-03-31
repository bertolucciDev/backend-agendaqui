# Relatório de Garantia de Qualidade (QA) - Agendaqui API

Este relatório detalha as inconformidades, riscos de segurança e falhas arquiteturais encontradas na API Agendaqui, especificamente no que tange à sua implantação em produção na Vercel versus o ambiente de desenvolvimento local.

## 1. Severidade: Crítica 🔴

### 1.1. Discrepância de Ambiente (Fastify vs. Express)
*   **Problema:** O ambiente de desenvolvimento (`src/main.ts`) utiliza `FastifyAdapter`, enquanto o ambiente de produção na Vercel (`vercel/main.ts`) utiliza `ExpressAdapter`.
*   **Impacto:** Comportamentos divergentes em produção. Middlewares, plugins e o tratamento de requisições podem falhar ou se comportar de forma inesperada.
*   **Correção:** Sincronizar as configurações globais em ambos os arquivos, garantindo que o `ExpressAdapter` na Vercel tenha as mesmas proteções e validações do `FastifyAdapter`.

### 1.2. Ausência de Validação Global em Produção
*   **Problema:** O `ValidationPipe` está configurado em `src/main.ts`, mas **totalmente ausente** em `vercel/main.ts`.
*   **Impacto:** Em produção (Vercel), a API aceita qualquer dado no corpo das requisições sem validar tipos, campos obrigatórios ou formatos (ex: e-mails inválidos, senhas curtas), ignorando os decoradores do `class-validator` nos DTOs.
*   **Correção:** Adicionar `app.useGlobalPipes(new ValidationPipe(...))` ao bootstrap da Vercel.

### 1.3. Ausência de Serialização Global em Produção
*   **Problema:** O `ClassSerializerInterceptor` não está configurado em `vercel/main.ts`.
*   **Impacto:** Dados sensíveis marcados com `@Exclude()` nos DTOs ou entidades podem ser expostos nas respostas JSON em produção.
*   **Correção:** Adicionar `app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))` ao bootstrap da Vercel.

## 2. Severidade: Alta 🟠

### 2.1. Vulnerabilidade SSL no Nodemailer
*   **Problema:** O arquivo `src/shared/infra/mail/nodemailer/nodemailer.service.ts` possui a configuração `rejectUnauthorized: false`.
*   **Impacto:** Permite ataques de Man-in-the-Middle (MitM) na comunicação com o servidor de e-mail, pois não valida o certificado SSL/TLS.
*   **Correção:** Remover a flag ou configurá-la baseada no ambiente, priorizando a segurança.

### 2.2. Segredos de Segurança com Valores Padrão (Default)
*   **Problema:** `JWT_SECRET` possui um valor default "fraco" no esquema de validação Zod.
*   **Impacto:** Se o segredo não for configurado no ambiente da Vercel, o sistema usará o padrão conhecido, facilitando a falsificação de tokens.
*   **Correção:** Remover valores padrão para segredos críticos no `env.validation.ts`, tornando-os obrigatórios.

## 3. Severidade: Média 🟡

### 3.1. Inconsistência de CORS
*   **Problema:** `src/main.ts` permite `origin: '*'`, enquanto `vercel/main.ts` restringe a domínios específicos. Embora a restrição seja boa para produção, a discrepância dificulta testes e pode causar falhas em subdomínios não listados.
*   **Correção:** Centralizar a configuração de CORS no `env` ou garantir paridade lógica.

### 3.2. Configuração de Swagger em Produção
*   **Problema:** O Swagger está habilitado na Vercel sem proteções, embora em `src/main.ts` haja uma trava de `env.APP_ENV !== 'prod'`. Na Vercel, ele está sempre habilitado no `bootstrap`.
*   **Impacto:** Exposição desnecessária da estrutura da API em produção.

---

## Status das Correções Implementadas

✅ **Sincronizar `vercel/main.ts`**: Adicionado `ValidationPipe`, `ClassSerializerInterceptor` e logs unificados. CORS ajustado para usar `FRONT_URL` e `credentials: true`.
✅ **Endurecer `env.validation.ts`**: Removido default de `JWT_SECRET`, tornando-o obrigatório.
✅ **Corrigir `NodemailerEmailService`**: Removido o bypass de segurança `rejectUnauthorized: false`.
✅ **Ajustar `main.ts` (Fastify)**: Corrigida importação redundante de `env`.
✅ **Diagnóstico de Produção**: Implementado logging diagnóstico em `src/config/env.ts` para identificar falhas de variáveis de ambiente na Vercel.
✅ **Robustez de Tipagem**: Garantida a coerção de tipos para variáveis numéricas e booleanas no `env.validation.ts`.
