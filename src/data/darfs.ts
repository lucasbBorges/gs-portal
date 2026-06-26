export const darfUploads = [
  {
    id: 1,
    fileName: 'darf-irpj-abril-2026.pdf',
    period: '04/2026',
    tax: 'IRPJ',
    amount: 48200,
    sentAt: '26/06/2026 10:24',
    status: 'Processando',
    protocol: 'DRF-2026-0048',
    stage: 'Leitura automatica',
    progress: 52,
    owner: 'RPA Fiscal'
  },
  {
    id: 2,
    fileName: 'darf-csll-marco-2026.pdf',
    period: '03/2026',
    tax: 'CSLL',
    amount: 31650,
    sentAt: '25/06/2026 16:08',
    status: 'Validado',
    protocol: 'DRF-2026-0047',
    stage: 'Concluido',
    progress: 100,
    owner: 'Time Fiscal'
  },
  {
    id: 3,
    fileName: 'darf-pis-fevereiro-2026.pdf',
    period: '02/2026',
    tax: 'PIS',
    amount: 12890,
    sentAt: '22/06/2026 09:41',
    status: 'Validado',
    protocol: 'DRF-2026-0041',
    stage: 'Concluido',
    progress: 100,
    owner: 'Time Fiscal'
  },
  {
    id: 4,
    fileName: 'darf-cofins-janeiro-2026.pdf',
    period: '01/2026',
    tax: 'COFINS',
    amount: 28540,
    sentAt: '20/06/2026 14:12',
    status: 'Pendencia',
    protocol: 'DRF-2026-0039',
    stage: 'Aguardando substituicao',
    progress: 34,
    owner: 'Cliente'
  }
];

export const darfTimeline = [
  {
    label: 'Arquivo enviado',
    description: 'Upload recebido no portal',
    done: true
  },
  {
    label: 'Leitura automatica',
    description: 'Validacao de formato e competencia',
    done: true,
    current: true
  },
  {
    label: 'Conferencia fiscal',
    description: 'Analise do time Grupo Studio',
    done: false
  },
  {
    label: 'Retorno ao cliente',
    description: 'DARF validada ou pendencia aberta',
    done: false
  }
];
