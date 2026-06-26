import { Bell, CalendarClock, CircleDollarSign, FileText, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { clientJobs } from '../data/jobs';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});

export function JobsPage() {
  const [selectedJobId, setSelectedJobId] = useState(clientJobs[0].id);
  const selectedJob = clientJobs.find((job) => job.id === selectedJobId) ?? clientJobs[0];
  const allOpportunities = clientJobs.flatMap((job) => job.opportunities);
  const selectedJobTotals = useMemo(
    () =>
      selectedJob.opportunities.reduce(
        (acc, opportunity) => ({
          recovered: acc.recovered + opportunity.recovered,
          estimate: acc.estimate + opportunity.estimate,
          active: acc.active + (opportunity.progress < 100 ? 1 : 0)
        }),
        { recovered: 0, estimate: 0, active: 0 }
      ),
    [selectedJob]
  );

  return (
    <main className="app-shell">
      <AppSidebar />

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p>Jobs</p>
            <h1>Acompanhamento de jobs</h1>
            <span>Selecione um job para visualizar as oportunidades vinculadas a ele.</span>
          </div>

          <div className="header-actions">
            <button className="icon-button" aria-label="Notificacoes">
              <Bell size={19} aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="summary-grid jobs-summary" aria-label="Resumo dos jobs">
          <MetricCard label="Jobs ativos" value={clientJobs.length} detail="em acompanhamento" />
          <MetricCard label="Oportunidades" value={allOpportunities.length} detail="mapeadas no portal" />
          <MetricCard label="R$ recuperado" value={currencyFormatter.format(selectedJobTotals.recovered)} detail="job selecionado" />
          <MetricCard label="Estimativa" value={currencyFormatter.format(selectedJobTotals.estimate)} detail="potencial do job" highlight />
        </section>

        <section className="jobs-section panel" aria-label="Selecao de job">
          <div className="panel-heading">
            <div>
              <p>Jobs</p>
              <h2>Jobs do cliente</h2>
            </div>
            <span className="status-pill">Escolha um job</span>
          </div>

          <div className="jobs-selector">
            {clientJobs.map((job) => (
              <button
                className={selectedJob.id === job.id ? 'job-selector-card active' : 'job-selector-card'}
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                type="button"
              >
                <div className="job-title-row">
                  <div>
                    <span>{job.owner}</span>
                    <h2>{job.title}</h2>
                  </div>
                  <strong>{job.status}</strong>
                </div>
                <p>{job.description}</p>
                <div className="stage-bar">
                  <span style={{ width: `${job.progress}%` }} />
                </div>
                <footer>
                  <span>{job.opportunities.length} oportunidades vinculadas</span>
                  <strong>{job.updatedAt}</strong>
                </footer>
              </button>
            ))}
          </div>
        </section>

        <section className="panel selected-job-panel">
          <div className="panel-heading">
            <div>
              <p>Oportunidades</p>
              <h2>Oportunidades de {selectedJob.title}</h2>
            </div>
            <span className="status-pill">{selectedJob.opportunities.length} oportunidades</span>
          </div>

          <div className="selected-job-context">
            <div>
              <span>Job selecionado</span>
              <strong>{selectedJob.title}</strong>
            </div>
            <p>{selectedJob.description}</p>
          </div>

          <div className="jobs-board" aria-label={`Oportunidades do job ${selectedJob.title}`}>
            {selectedJob.opportunities.map((opportunity) => (
              <article className="job-detail-card" key={opportunity.id}>
                <div className="job-detail-main">
                  <div className="job-title-row">
                    <div>
                      <span>{opportunity.category}</span>
                      <h2>{opportunity.title}</h2>
                    </div>
                    <strong>{opportunity.status}</strong>
                  </div>

                  <div className="stage-bar">
                    <span style={{ width: `${opportunity.progress}%` }} />
                  </div>

                  <div className="job-stepper" aria-label={`Etapas de ${opportunity.title}`}>
                    {opportunity.steps.map((step) => (
                      <div className={step.current ? 'step-item current' : step.done ? 'step-item done' : 'step-item'} key={step.label}>
                        <span aria-hidden="true" />
                        <p>{step.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="job-detail-side">
                  <InfoTile icon={FileText} label="Etapa atual" value={opportunity.stage} />
                  <InfoTile icon={CircleDollarSign} label="R$ recuperado" value={currencyFormatter.format(opportunity.recovered)} success />
                  <InfoTile icon={TrendingUp} label="Estimativa" value={currencyFormatter.format(opportunity.estimate)} />
                  <InfoTile icon={CalendarClock} label="Prazo estimado" value={opportunity.deadline} />
                </div>

                <footer className="job-next-action">
                  <div>
                    <span>Responsavel</span>
                    <strong>{opportunity.owner}</strong>
                  </div>
                  <div>
                    <span>Proxima acao</span>
                    <strong>{opportunity.nextAction}</strong>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

type MetricCardProps = {
  label: string;
  value: string | number;
  detail: string;
  highlight?: boolean;
};

type InfoTileProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  success?: boolean;
};

function MetricCard({ label, value, detail, highlight = false }: MetricCardProps) {
  return (
    <article className={highlight ? 'metric-card highlight' : 'metric-card'}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function InfoTile({ icon: Icon, label, value, success = false }: InfoTileProps) {
  return (
    <div className="info-tile">
      <Icon size={18} aria-hidden="true" />
      <div>
        <span>{label}</span>
        <strong className={success ? 'success' : undefined}>{value}</strong>
      </div>
    </div>
  );
}
