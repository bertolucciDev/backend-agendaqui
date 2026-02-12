# 📅 Agendaqui API

Bem-vindo ao projeto **Back-Agendamento**! 🚀
Este é um backend robusto e performático desenvolvido com as melhores práticas e ferramentas do ecossistema Node.js.

## 💻 Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna para garantir escalabilidade, segurança e alta performance. Abaixo você encontra a lista de tecnologias, links para suas documentações oficiais e uma breve descrição:

- **[NestJS](https://nestjs.com/)** 🦁: Framework Node.js progressivo para construir aplicações server-side eficientes e escaláveis.
- **[Node.js 20 LTS](https://nodejs.org/)** 🟢: Ambiente de execução JavaScript (Runtime) estável e moderno.
- **[Fastify](https://fastify.dev/)** ⚡: Framework web focado em performance e baixo overhead, utilizado como adaptador HTTP no NestJS (substituindo o Express).
- **[Docker](https://www.docker.com/)** 🐳 + **[PostgreSQL 16 Alpine](https://www.postgresql.org/)** 🐘: Banco de dados relacional rodando em container, utilizando a versão Alpine (leve) do Postgres 16.
- **[Prisma ORM v7](https://www.prisma.io/)** 🔺: ORM (Object-Relational Mapping) de nova geração para Node.js e TypeScript, facilitando o acesso ao banco de dados.
- **[Zod](https://zod.dev/)** 💎: Biblioteca de validação de esquemas TypeScript-first, utilizada para garantir a integridade das variáveis de ambiente.
- **[Class Validator](https://github.com/typestack/class-validator) & [Class Transformer](https://github.com/typestack/class-transformer)** 🛠️: Utilizados para validação de dados de entrada (DTOs) e serialização/transformação de respostas.
- **[Swagger](https://swagger.io/)** 📃: Ferramenta para documentar e testar a API de forma interativa (OpenAPI).

---

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js 20 LTS](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (Gerenciador de pacotes utilizado no projeto)
- [Docker](https://www.docker.com/) e Docker Compose

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar a aplicação localmente.

### 1. Instalação

Clone o repositório e instale as dependências utilizando o `pnpm`:

```bash
pnpm install
```

### 2. Configuração de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto. Você pode usar o exemplo abaixo, ajustando conforme necessário (baseado no `env.validation.ts`):

```env
APP_NAME=Back-Agendamento
APP_ENV=dev
APP_PORT=3000
APP_URL=http://localhost:3000

# Conexão com o Banco de Dados (Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
```

### 3. Subindo o Banco de Dados

Utilize o Docker Compose para iniciar o container do PostgreSQL:

```bash
docker-compose up -d
```
*Isso iniciará o banco de dados `postgres:16-alpine` na porta 5432.*

### 4. Configurando o Prisma

Gere o cliente do Prisma e execute as migrações para criar as tabelas no banco:

```bash
# Gera os tipos do Prisma Client
pnpm prisma generate

# Aplica as migrações no banco de dados (modo dev)
pnpm prisma migrate dev
```

### 5. Executando a Aplicação

Agora você pode iniciar o servidor:

```bash
# Modo de desenvolvimento (com hot-reload)
pnpm start:dev

# Modo de produção
pnpm start:prod
```

A API estará rodando em: `http://localhost:3000` 🚀

---

## 📚 Documentação (Swagger)

Para visualizar e testar os endpoints da API, acesse a documentação gerada automaticamente pelo Swagger:

👉 **http://localhost:3000/docs**

---

## 💡 Exemplos de Uso no Código

Aqui estão alguns exemplos reais de como as tecnologias foram implementadas neste projeto:

### 💎 Validação de Ambiente com Zod

Usamos o `Zod` para validar se as variáveis de ambiente estão corretas antes da aplicação subir. Se faltar algo, o app nem inicia!

```typescript
import { z } from 'zod';

export const envSchema = z.object({
  APP_PORT: z.coerce.number().default(3000), // Força conversão para número
  DATABASE_URL: z.string(), // Garante que é uma string
  APP_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
});
```

### 🛠️ DTOs com Class Transformer e Swagger

Os DTOs controlam o que entra e sai da API. O `@Expose` define o que é enviado no JSON de resposta (serialização), e o `@ApiProperty` gera a documentação no Swagger.

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseHealthDTO {
  @Expose()
  @ApiProperty({ example: 'healthy', description: 'Status do banco de dados' })
  database!: string;

  @Expose()
  @ApiProperty({ example: '2025-09-21T12:00:00.000Z', description: 'Timestamp da verificação' })
  timestamp!: string;
}
```

### ⚡ Performance com Fastify

No `main.ts`, configuramos o NestJS para usar o `FastifyAdapter`, garantindo maior throughput de requisições em comparação ao Express padrão.

```typescript
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(), // 🚀 Fastify engine ativado
);
```
