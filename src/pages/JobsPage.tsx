import { Bell, CalendarClock, CircleDollarSign, FileText, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AppSidebar } from '../components/AppSidebar';
import { clientJobs } from '../data/jobs';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});

export function JobsPage() {
  const totals = clientJobs.reduce(
    (acc, job) => ({
      recovered: acc.recovered + job.recovered,
      estimate: acc.estimate + job.estimate,
      active: acc.active + (job.progress < 100 ? 1 : 0)
    }),
    { recovered: 0, estimate: 0, active: 0 }
  );

  return (
    <main className="app-shell">
      <AppSidebar />

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p>Jobs</p>
            <h1>Acompanhamento de jobs</h1>
            <span>Veja etapa atual, valores recuperados, estimativas e proximas acoes.</span>
          </div>

          <div className="header-actions">
            <button className="icon-button" aria-label="Notificacoes">
              <Bell size={19} aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="summary-grid jobs-summary" aria-label="Resumo dos jobs">
          <MetricCard label="Jobs ativos" value={totals.active} detail="em acompanhamento" />
          <MetricCard label="R$ recuperado" value={currencyFormatter.format(totals.recovered)} detail="valor apurado" />
          <MetricCard label="Estimativa" value={currencyFormatter.format(totals.estimate)} detail="potencial total" />
          <MetricCard label="Conversao" value="74%" detail="recuperado / estimado" highlight />
        </section>

        <section className="jobs-board" aria-label="Lista detalhada de jobs">
          {clientJobs.map((job) => (
            <article className="job-detail-card" key={job.id}>
              <div className="job-detail-main">
                <div className="job-title-row">
                  <div>
                    <span>{job.category}</span>
                    <h2>{job.title}</h2>
                  </div>
                  <strong>{job.status}</strong>
                </div>

                <div className="stage-bar">
                  <span style={{ width: `${job.progress}%` }} />
                </div>

                <div className="job-stepper" aria-label={`Etapas de ${job.title}`}>
                  {job.steps.map((step) => (
                    <div className={step.current ? 'step-item current' : step.done ? 'step-item done' : 'step-item'} key={step.label}>
                      <span aria-hidden="true" />
                      <p>{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="job-detail-side">
                <InfoTile icon={FileText} label="Etapa atual" value={job.stage} />
                <InfoTile icon={CircleDollarSign} label="R$ recuperado" value={currencyFormatter.format(job.recovered)} success />
                <InfoTile icon={TrendingUp} label="Estimativa" value={currencyFormatter.format(job.estimate)} />
                <InfoTile icon={CalendarClock} label="Prazo estimado" value={job.deadline} />
              </div>

              <footer className="job-next-action">
                <div>
                  <span>Responsavel</span>
                  <strong>{job.owner}</strong>
                </div>
                <div>
                  <span>Proxima acao</span>
                  <strong>{job.nextAction}</strong>
                </div>
              </footer>
            </article>
          ))}
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
