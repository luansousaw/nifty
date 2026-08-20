# Gerador de Criativos — Aracar Veículos

Aplicação Next.js que organiza dados automotivos com a OpenAI e gera duas URLs dinâmicas da Nifty Images.

## Rodar localmente

Requer Node.js 18.17 ou superior.

```bash
npm install
cp .env.example .env.local
# edite .env.local e informe sua chave
npm run dev
```

Acesse `http://localhost:3000`.

## Variáveis de ambiente

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_NAME=Aracar Veículos
```

`OPENAI_API_KEY` é obrigatória e utilizada somente no servidor. A variável de nome é opcional.

## Deploy na Vercel

1. Envie o repositório ao GitHub, GitLab ou Bitbucket.
2. Importe-o na [Vercel](https://vercel.com/new).
3. Cadastre `OPENAI_API_KEY` em **Settings → Environment Variables**.
4. Clique em **Deploy**. A Vercel detecta o Next.js e executa `npm run build` automaticamente.

O projeto não requer banco de dados. A API inclui validação, timeout, limitação básica por IP e proxy seguro para download.
