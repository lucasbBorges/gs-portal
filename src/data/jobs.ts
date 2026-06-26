export type OpportunityStep = {
  label: string;
  done: boolean;
  current?: boolean;
};

export type JobOpportunity = {
  id: string;
  title: string;
  category: string;
  stage: string;
  progress: number;
  recovered: number;
  estimate: number;
  deadline: string;
  owner: string;
  nextAction: string;
  status: string;
  steps: OpportunityStep[];
};

export type ClientJob = {
  id: string;
  title: string;
  description: string;
  status: string;
  owner: string;
  progress: number;
  updatedAt: string;
  opportunities: JobOpportunity[];
};

export const clientJobs: ClientJob[] = [
  {
    id: 'job-creditos-federais',
    title: 'Creditos tributarios federais',
    description: 'Mapeamento e recuperacao de oportunidades em tributos federais.',
    status: 'Em andamento',
    owner: 'Time Fiscal',
    progress: 68,
    updatedAt: 'Atualizado ha 8 min',
    opportunities: [
      {
        id: 'recuperacao-pis-cofins',
        title: 'Recuperacao PIS/COFINS',
        category: 'Credito tributario',
        stage: 'Analise fiscal',
        progress: 64,
        recovered: 184320,
        estimate: 295000,
        deadline: '15/07/2026',
        owner: 'Time Fiscal',
        nextAction: 'Validar base de notas fiscais de entrada',
        status: 'Em andamento',
        steps: [
          { label: 'Documentos recebidos', done: true },
          { label: 'Analise fiscal', done: true, current: true },
          { label: 'Memoria de calculo', done: false },
          { label: 'Protocolo', done: false }
        ]
      },
      {
        id: 'credito-inss-terceiros',
        title: 'Credito INSS terceiros',
        category: 'Previdenciario',
        stage: 'Levantamento fiscal',
        progress: 48,
        recovered: 72800,
        estimate: 168000,
        deadline: '28/07/2026',
        owner: 'Consultoria',
        nextAction: 'Conferir rubricas de folha por competencia',
        status: 'Em andamento',
        steps: [
          { label: 'Diagnostico', done: true },
          { label: 'Levantamento fiscal', done: false, current: true },
          { label: 'Memoria de calculo', done: false },
          { label: 'Entrega final', done: false }
        ]
      }
    ]
  },
  {
    id: 'job-teses-tributarias',
    title: 'Teses tributarias',
    description: 'Acompanhamento de oportunidades juridico-fiscais com potencial de recuperacao.',
    status: 'Em validacao',
    owner: 'Consultoria',
    progress: 78,
    updatedAt: 'Atualizado ha 1 h',
    opportunities: [
      {
        id: 'exclusao-icms',
        title: 'Exclusao ICMS da base',
        category: 'Tese tributaria',
        stage: 'Memoria de calculo',
        progress: 78,
        recovered: 428900,
        estimate: 520000,
        deadline: '02/08/2026',
        owner: 'Consultoria',
        nextAction: 'Conferencia juridica dos periodos apurados',
        status: 'Em validacao',
        steps: [
          { label: 'Diagnostico', done: true },
          { label: 'Levantamento fiscal', done: true },
          { label: 'Memoria de calculo', done: true, current: true },
          { label: 'Entrega final', done: false }
        ]
      },
      {
        id: 'insumos-credito-pis-cofins',
        title: 'Insumos PIS/COFINS',
        category: 'Tese tributaria',
        stage: 'Revisao documental',
        progress: 57,
        recovered: 138400,
        estimate: 242000,
        deadline: '12/08/2026',
        owner: 'Juridico fiscal',
        nextAction: 'Classificar despesas elegiveis como insumo',
        status: 'Em andamento',
        steps: [
          { label: 'Diagnostico', done: true },
          { label: 'Revisao documental', done: true, current: true },
          { label: 'Parecer fiscal', done: false },
          { label: 'Entrega final', done: false }
        ]
      }
    ]
  },
  {
    id: 'job-cadastro-obrigacoes',
    title: 'Cadastro e obrigacoes fiscais',
    description: 'Regularizacao cadastral e apoio em obrigacoes fiscais operacionais.',
    status: 'Pendente cliente',
    owner: 'Onboarding',
    progress: 49,
    updatedAt: 'Atualizado hoje',
    opportunities: [
      {
        id: 'regularizacao-cadastral',
        title: 'Regularizacao cadastral',
        category: 'Cadastro',
        stage: 'Aguardando cliente',
        progress: 42,
        recovered: 0,
        estimate: 0,
        deadline: '30/06/2026',
        owner: 'Onboarding',
        nextAction: 'Enviar contrato social atualizado',
        status: 'Pendente cliente',
        steps: [
          { label: 'Solicitacao aberta', done: true },
          { label: 'Conferencia de dados', done: true },
          { label: 'Aguardando cliente', done: false, current: true },
          { label: 'Atualizacao concluida', done: false }
        ]
      },
      {
        id: 'darf-retificacao',
        title: 'Retificacao de DARFs',
        category: 'Obrigacoes fiscais',
        stage: 'Processamento',
        progress: 55,
        recovered: 32640,
        estimate: 64000,
        deadline: '09/07/2026',
        owner: 'Operacoes',
        nextAction: 'Aguardar processamento dos arquivos enviados',
        status: 'Em andamento',
        steps: [
          { label: 'DARFs recebidos', done: true },
          { label: 'Triagem', done: true },
          { label: 'Processamento', done: false, current: true },
          { label: 'Validacao final', done: false }
        ]
      }
    ]
  }
];
