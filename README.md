# Portal do Cliente - Grupo Studio

Portal web para clientes do Grupo Studio acompanharem jobs fiscais, arquivos DARF, dados cadastrais e participantes vinculados a empresa.

## Stack

- React 18
- TypeScript
- Vite 8
- React Router
- React Query
- Axios
- Lucide React
- ESLint

## Objetivo do Produto

O portal centraliza a experiencia do cliente para:

- acompanhar jobs e suas etapas;
- visualizar valores recuperados e estimativas;
- alterar dados cadastrais da empresa;
- cadastrar e acompanhar participantes da empresa;
- enviar arquivos DARF;
- consultar DARFs enviadas anteriormente;
- acompanhar processamento e pendencias de DARFs.

## Layout e Identidade

A interface segue a referencia visual enviada no inicio do projeto:

- sidebar escura fixa;
- area principal clara;
- acentos dourados;
- cards com borda sutil e raio de 8px;
- tipografia de titulo com fonte display do sistema;
- interface operacional, objetiva e voltada para acompanhamento.

## Rotas

| Rota | Tela | Descricao |
| --- | --- | --- |
| `/login` | Login | Tela de acesso com usuario padrao mockado. |
| `/home` | Home | Visao geral do portal, jobs, uploads recentes e cadastro. |
| `/jobs` | Jobs | Acompanhamento detalhado de cada job. |
| `/cadastro` | Cadastro | Edicao de dados da empresa e gestao de participantes. |
| `/darfs` | DARFs | Upload, historico e acompanhamento de arquivos DARF. |

## Login Mockado

Usuario padrao disponivel na tela de login:

- E-mail: `cliente@grupostudio.com.br`
- Senha: `Studio@2026`

No momento, o botao de login navega para `/home` sem autenticacao real.

## Funcionalidades Implementadas

### Login

- Formulario a direita.
- Informacoes da aplicacao a esquerda, integradas ao fundo.
- Usuario mockado exibido e pre-preenchido.
- Navegacao para a home.

### Home

- Resumo de jobs.
- Cards de indicadores.
- Bloco de uploads recentes de DARFs.
- Link para tela de Jobs.
- Link para tela de Cadastro.

### Jobs

Tela para o cliente selecionar um job e acompanhar as oportunidades vinculadas a ele.

Cada job funciona como um agrupador de oportunidades. Ao clicar em um job especifico, a tela exibe apenas as oportunidades daquele job.

Cada oportunidade apresenta:

- etapa atual;
- progresso;
- valor recuperado;
- estimativa total;
- prazo estimado;
- responsavel;
- proxima acao;
- linha de etapas.

Dados mockados em `src/data/jobs.ts`.

### Cadastro

Tela para edicao cadastral com:

- razao social;
- nome fantasia;
- CNPJ;
- inscricao municipal;
- e-mail financeiro;
- telefone;
- endereco;
- cidade;
- UF;
- CEP.

Tambem inclui gestao de participantes, compativel com o conceito do sistema Project:

- uma empresa pode ter varios participantes;
- exemplos: empresario, contador, advogado, financeiro, procurador;
- inclusao de participante em memoria na interface;
- lista de participantes vinculados.

Dados mockados em `src/data/registration.ts`.

### DARFs

Tela para gestao de DARFs com:

- resumo de DARFs enviadas;
- valor total dos arquivos;
- total de DARFs validadas;
- total em acompanhamento;
- upload de arquivo;
- acompanhamento do processamento atual;
- timeline de validacao;
- historico de arquivos enviados.

Dados mockados em `src/data/darfs.ts`.

## Estrutura de Pastas

```text
src/
  api/
    client.ts
  components/
    AppSidebar.tsx
  data/
    dashboard.ts
    darfs.ts
    jobs.ts
    registration.ts
  pages/
    DarfsPage.tsx
    HomePage.tsx
    JobsPage.tsx
    LoginPage.tsx
    RegistrationPage.tsx
  main.tsx
  router.tsx
  styles.css
```

## API e Integracao

O cliente Axios esta configurado em `src/api/client.ts`.

Configuracao atual:

- `baseURL`: `VITE_API_URL` ou `https://api.grupostudio.local`;
- timeout de 15 segundos;
- interceptor para enviar `Bearer token` salvo em `localStorage` como `grupoStudioToken`.

Ainda nao ha chamadas reais de API. As telas usam dados mockados.

## Integracoes Futuras

### Autenticacao

Substituir o login mockado por fluxo real:

- endpoint de autenticacao;
- armazenamento seguro do token;
- protecao de rotas;
- logout real;
- expiracao de sessao.

### Project

Integrar cadastro e participantes ao Project:

- empresa como cadastro principal;
- participantes como entidades vinculadas;
- criacao, edicao, remocao e status de participantes;
- validacoes de documento, e-mail e vinculo.

### DARFs

Integrar upload e acompanhamento:

- endpoint de upload multipart;
- progresso real de envio;
- status de processamento;
- download de arquivos;
- tratamento de pendencias.

### Jobs

Integrar acompanhamento:

- listagem real de jobs;
- etapas por job;
- valores recuperados;
- estimativas;
- responsaveis;
- proximas acoes.

## Comandos

Instalar dependencias:

```bash
npm install
```

Rodar ambiente local:

```bash
npm run dev
```

Por padrao, o portal roda em `http://localhost:5170`.

O item `Supply Tax` da sidebar redireciona para `http://localhost:5173`.

Build de producao:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Preview do build:

```bash
npm run preview
```

## Arquivos Que Nao Devem Ir Para Commit

O projeto possui `.gitignore` configurado para ignorar:

- `node_modules/`;
- `dist/`;
- arquivos `.env`;
- logs;
- caches;
- relatorios de teste;
- arquivos locais de editor e sistema operacional;
- certificados e chaves locais;
- arquivos temporarios.

## Status Atual

Projeto em fase de prototipo funcional frontend.

Validacoes ja executadas durante o desenvolvimento:

- `npm run lint`
- `npm run build`

Ambos passaram apos as ultimas alteracoes.

