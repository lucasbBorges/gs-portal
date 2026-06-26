import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  FileArchive,
  FileUp,
  UserRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppSidebar } from '../components/AppSidebar';
import { jobs, recentUploads } from '../data/dashboard';

export function HomePage() {
  const totals = jobs.reduce(
    (acc, job) => ({
      total: acc.total + job.total,
      completed: acc.completed + job.completed,
      pending: acc.pending + job.pending
    }),
    { total: 0, completed: 0, pending: 0 }
  );

  return (
    <main className="app-shell">
      <AppSidebar />

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p>Portal do Cliente</p>
            <h1>Visao geral</h1>
            <span>Acompanhe jobs, cadastros e envios de DARFs do Grupo Studio.</span>
          </div>

          <div className="header-actions">
            <button className="icon-button" aria-label="Notificacoes">
              <Bell size={19} aria-hidden="true" />
            </button>
            <button className="upload-button">
              <FileUp size={18} aria-hidden="true" />
              Enviar DARF
            </button>
          </div>
        </header>

        <section className="summary-grid" aria-label="Indicadores gerais">
          <MetricCard label="Jobs totais" value={totals.total} detail="ultimos 30 dias" />
          <MetricCard label="Concluidos" value={totals.completed} detail="sem pendencias abertas" />
          <MetricCard label="Em andamento" value={totals.pending} detail="aguardando evolucao" />
          <MetricCard label="Taxa de sucesso" value="84.5%" detail="jobs concluidos / total" highlight />
        </section>

        <section className="content-grid">
          <div className="panel jobs-panel">
            <div className="panel-heading">
              <div>
                <p>Jobs em acompanhamento</p>
                <h2>Status operacional</h2>
              </div>
              <Link className="text-button" to="/jobs">
                Ver todos
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="job-grid">
              {jobs.map((job) => (
                <article className="job-card" key={job.id}>
                  <div className="job-card-header">
                    <span className="status-dot" aria-hidden="true" />
                    <strong>{job.title}</strong>
                    <span>{job.updatedAt}</span>
                  </div>
                  <div className="job-stats">
                    <div>
                      <strong>{job.total}</strong>
                      <span>total</span>
                    </div>
                    <div>
                      <strong className="success">{job.completed}</strong>
                      <span>concluidos</span>
                    </div>
                    <div>
                      <strong className="warning">{job.pending}</strong>
                      <span>pendentes</span>
                    </div>
                  </div>
                  <div className="progress-line">
                    <span style={{ width: `${job.successRate}%` }} />
                  </div>
                  <footer>
                    <span>{job.successRate}% de sucesso</span>
                    <strong>{job.status}</strong>
                  </footer>
                </article>
              ))}
            </div>
          </div>

          <aside className="panel side-panel">
            <div className="panel-heading compact">
              <div>
                <p>DARFs</p>
                <h2>Uploads recentes</h2>
              </div>
            </div>

            <label className="dropzone">
              <FileUp size={24} aria-hidden="true" />
              <strong>Enviar arquivo DARF</strong>
              <span>PDF, XML ou ZIP ate 20 MB</span>
              <input type="file" />
            </label>

            <div className="upload-list">
              {recentUploads.map((upload) => (
                <div className="upload-row" key={upload.id}>
                  <FileArchive size={18} aria-hidden="true" />
                  <div>
                    <strong>{upload.fileName}</strong>
                    <span>{upload.date}</span>
                  </div>
                  <em>{upload.status}</em>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="panel profile-panel">
          <div className="panel-heading">
            <div>
              <p>Cadastro</p>
              <h2>Dados da empresa</h2>
            </div>
            <Link className="text-button" to="/cadastro">
              Alterar cadastro
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="profile-grid">
            <ProfileItem icon={Building2} label="Empresa" value="Grupo Cliente LTDA" />
            <ProfileItem icon={UserRound} label="Responsavel" value="Cristiano Azevedo" />
            <ProfileItem icon={BriefcaseBusiness} label="Plano" value="Fiscal recorrente" />
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

type ProfileItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
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

function ProfileItem({ icon: Icon, label, value }: ProfileItemProps) {
  return (
    <div className="profile-item">
      <Icon size={18} aria-hidden="true" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
