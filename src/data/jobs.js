export const clientJobs = [
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
];
