# Raio-X da Experiência do Cliente

Diagnóstico interativo da metodologia **Magia dos Detalhes · Phillipe Lontra**.

## Beta — GitHub / Vercel

Este pacote foi organizado para ser enviado diretamente a um repositório GitHub e importado no Vercel como uma aplicação Next.js.

### Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase (opcional no beta)
- `@react-pdf/renderer` para gerar o relatório individual em PDF

### Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

### Deploy no Vercel

1. Crie um repositório novo no GitHub.
2. Envie o conteúdo desta pasta para o repositório.
3. No Vercel, selecione **Add New → Project** e importe o repositório.
4. O Vercel deve detectar Next.js automaticamente.
5. Faça o primeiro deploy sem configurar Supabase se quiser apenas testar a experiência.

### Supabase (opcional)

O questionário funciona no beta sem banco de dados, usando `localStorage` para preservar o progresso no navegador.

Para salvar leads, respostas e resultados, crie um projeto Supabase e execute:

`supabase/schema.sql`

Depois configure no Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Estrutura importante

- `lib/questions.ts` — perguntas e alternativas
- `lib/scoring.ts` — cálculo das dimensões e sinais
- `lib/profiles.ts` — perfis de diagnóstico
- `lib/moments.ts` — momento profissional
- `lib/context-questions.ts` — perguntas de contexto
- `context/DiagnosticContext.tsx` — estado do diagnóstico
- `app/diagnostico/[block]/page.tsx` — fluxo das perguntas
- `app/diagnostico/cadastro/page.tsx` — captura de lead
- `app/resultado/page.tsx` — resultado personalizado
- `components/DiagnosticPDF.tsx` — relatório individual em PDF

### Imagens

A atualização recebida referenciava imagens que não vieram dentro do pacote enviado. Para evitar URLs quebradas em produção, o beta usa efeitos visuais em CSS e não depende desses arquivos.

Quando as imagens finais forem fornecidas, coloque-as em `public/images/` e atualize os componentes relevantes.

### Observação sobre build

O projeto foi estruturado para deploy no Vercel. Nesta preparação não foi possível completar `npm install` no ambiente de execução por timeout da instalação de dependências; portanto, não há uma afirmação de que um `next build` foi executado com sucesso aqui. O Vercel fará a instalação limpa das dependências durante o primeiro deploy.
