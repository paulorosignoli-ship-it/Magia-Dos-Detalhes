# Raio-X da Experiência do Cliente — Magia dos Detalhes

Diagnóstico interativo de maturidade em Experiência do Cliente.

**Idealização:** Phillipe Lontra  
**Stack:** Next.js 14 + React 18 + TypeScript + Tailwind CSS + Supabase (opcional)

## 1. Rodar localmente

Requisitos:

- Node.js 18.17+ (20 LTS recomendado)
- npm

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## 2. Build de produção

```bash
npm run build
npm start
```

## 3. Supabase (opcional)

O diagnóstico funciona sem Supabase: as respostas ficam temporariamente no `localStorage` do navegador e o envio ao banco é desativado.

Para ativar o armazenamento no Supabase:

1. Crie um projeto no Supabase.
2. Execute `supabase/schema.sql` no SQL Editor.
3. Copie `.env.example` para `.env.local`.
4. Preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

5. Reinicie o servidor.

Nunca coloque uma service-role key no frontend.

## 4. Estrutura

```text
app/
  page.tsx                         Landing page
  diagnostico/
    page.tsx                       Introdução
    contexto/page.tsx              Contexto do respondente
    [block]/page.tsx               Perguntas por bloco
    cadastro/page.tsx              Captura de lead
  resultado/page.tsx               Diagnóstico personalizado
components/                        Componentes visuais reutilizáveis
context/                            Estado global do diagnóstico
lib/
  questions.ts                     Perguntas e blocos
  context-questions.ts             Perguntas de contexto
  scoring.ts                       Cálculo dos resultados
  profiles.ts                      Perfis de diagnóstico
  moments.ts                       Momento profissional
  storage.ts                       Persistência local
  supabase.ts                      Envio opcional ao Supabase
supabase/schema.sql                Estrutura do banco
```

## 5. Alterar perguntas

As perguntas principais ficam em `lib/questions.ts`.

Cada pergunta possui:

```ts
{
  id: "clareza_01",
  block: "clareza",
  text: "...",
  options: ANSWER_OPTIONS
}
```

A escala atual é:

1. Não existe
2. Acontece raramente
3. Acontece às vezes
4. Acontece na maioria das vezes
5. É um padrão

Se você alterar o número de perguntas de um bloco, o cálculo em `lib/scoring.ts` usa os dados existentes e não depende de um número fixo.

## 6. Alterar os perfis

Os quatro perfis principais estão em `lib/profiles.ts`.

A lógica para selecionar o perfil fica em `resolveProfile()`.

## 7. Alterar o momento profissional

Os momentos ficam em `lib/moments.ts`.

## 8. Alterar a identidade visual

A paleta e tipografia principal ficam em `tailwind.config.ts` e `app/globals.css`.

Paleta atual:

- Navy profundo: `#071827`
- Navy médio: `#0D2438`
- Azul elétrico: `#18B8E8`
- Azul claro: `#7DE4FF`
- Dourado: `#F5C85B`
- Creme: `#F7F4EA`

A linguagem visual usa pontos, linhas e brilhos abstratos para representar a ideia de "Magia dos Detalhes", sem utilizar personagens, logos ou imagens oficiais da Disney.

## 9. Deploy na Vercel

1. Suba este projeto para um repositório GitHub.
2. Na Vercel, importe o repositório.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Se usar Supabase, adicione as duas variáveis de ambiente em Project Settings → Environment Variables.

## 10. Beta checklist

This repository is prepared as a **beta deployment**: the diagnostic, question flow, local persistence, lead form, scoring and results page work without external services. Supabase is optional.

Before publishing the public URL, verify:

- `npm run build` succeeds in the GitHub/Vercel environment.
- If using Supabase, run `supabase/schema.sql` and add the two public environment variables.
- Replace the placeholder Kit CTA (`#kit`) with the real checkout/landing-page URL.
- Add a real privacy-policy URL and review the consent copy for LGPD compliance.
- Test the full flow on mobile from Instagram.
- Test refreshing the page during the questionnaire; progress is preserved locally.

## 11. LGPD

O projeto coleta nome e e-mail, com WhatsApp opcional e consentimento explícito. O consentimento de WhatsApp é separado do cadastro principal.

Antes de colocar em produção, revise o texto jurídico, política de privacidade, retenção de dados e fluxo de remoção com o responsável jurídico pelo projeto.
