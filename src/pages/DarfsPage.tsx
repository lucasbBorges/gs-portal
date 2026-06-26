import { Bell, CalendarDays, CircleDollarSign, FileArchive, FileCheck2, FileUp, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { darfTimeline, darfUploads } from '../data/darfs';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});

export function DarfsPage() {
  const [selectedFile, setSelectedFile] = useState('');

  const totals = useMemo(
    () =>
      darfUploads.reduce(
        (acc, item) => ({
          amount: acc.amount + item.amount,
          validated: acc.validated + (item.status === 'Validado' ? 1 : 0),
          pending: acc.pending + (item.status === 'Pendencia' ? 1 : 0),
          processing: acc.processing + (item.status === 'Processando' ? 1 : 0)
        }),
        { amount: 0, validated: 0, pending: 0, processing: 0 }
      ),
    []
  );

  return (
    <main className="app-shell">
      <AppSidebar />

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p>DARFs</p>
            <h1>Arquivos DARF</h1>
            <span>Envie arquivos, acompanhe o processamento e consulte DARFs enviadas anteriormente.</span>
          </div>

          <div className="header-actions">
            <button className="icon-button" aria-label="Notificacoes">
              <Bell size={19} aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="summary-grid darfs-summary" aria-label="Resumo das DARFs">
          <MetricCard label="DARFs enviadas" value={darfUploads.length} detail="historico recente" />
          <MetricCard label="Valor total" value={currencyFormatter.format(totals.amount)} detail="arquivos enviados" />
          <MetricCard label="Validadas" value={totals.validated} detail="sem pendencias" />
          <MetricCard label="Em acompanhamento" value={totals.processing + totals.pending} detail="processando ou pendente" highlight />
        </section>

        <section className="darfs-grid">
          <aside className="panel darf-upload-panel">
            <div className="panel-heading compact">
              <div>
                <p>Upload</p>
                <h2>Enviar nova DARF</h2>
              </div>
            </div>

            <label className="darf-upload-zone">
              <FileUp size={30} aria-hidden="true" />
              <strong>{selectedFile || 'Selecione ou arraste o arquivo'}</strong>
              <span>PDF, XML ou ZIP ate 20 MB</span>
              <input type="file" onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? '')} />
            </label>

            <div className="upload-requirements">
              <div>
                <FileCheck2 size={18} aria-hidden="true" />
                <span>Competencia e tributo conferidos automaticamente</span>
              </div>
              <div>
                <CalendarDays size={18} aria-hidden="true" />
                <span>Retorno estimado em ate 1 dia util</span>
              </div>
            </div>

            <button className="primary-action" type="button">
              <FileUp size={18} aria-hidden="true" />
              Enviar para analise
            </button>
          </aside>

          <section className="panel darf-tracking-panel">
            <div className="panel-heading">
              <div>
                <p>Acompanhamento</p>
                <h2>Processamento atual</h2>
              </div>
              <span className="status-pill">1 em processamento</span>
            </div>

            <article className="darf-featured">
              <div className="job-title-row">
                <div>
                  <span>{darfUploads[0].protocol}</span>
                  <h2>{darfUploads[0].fileName}</h2>
                </div>
                <strong>{darfUploads[0].status}</strong>
              </div>

              <div className="stage-bar">
                <span style={{ width: `${darfUploads[0].progress}%` }} />
              </div>

              <div className="darf-info-grid">
                <InfoTile icon={FileArchive} label="Tributo" value={darfUploads[0].tax} />
                <InfoTile icon={CalendarDays} label="Competencia" value={darfUploads[0].period} />
                <InfoTile icon={CircleDollarSign} label="Valor" value={currencyFormatter.format(darfUploads[0].amount)} success />
                <InfoTile icon={Search} label="Etapa" value={darfUploads[0].stage} />
              </div>

              <div className="darf-timeline">
                {darfTimeline.map((item) => (
                  <div className={item.current ? 'timeline-item current' : item.done ? 'timeline-item done' : 'timeline-item'} key={item.label}>
                    <span aria-hidden="true" />
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>

        <section className="panel darfs-history-panel">
          <div className="panel-heading">
            <div>
              <p>Historico</p>
              <h2>DARFs enviadas anteriormente</h2>
            </div>
          </div>

          <div className="darfs-table">
            {darfUploads.map((darf) => (
              <article className="darf-row" key={darf.id}>
                <div>
                  <FileArchive size={18} aria-hidden="true" />
                  <div>
                    <strong>{darf.fileName}</strong>
                    <span>{darf.protocol}</span>
                  </div>
                </div>
                <div>
                  <span>Competencia</span>
                  <strong>{darf.period}</strong>
                </div>
                <div>
                  <span>Tributo</span>
                  <strong>{darf.tax}</strong>
                </div>
                <div>
                  <span>Valor</span>
                  <strong>{currencyFormatter.format(darf.amount)}</strong>
                </div>
                <div>
                  <span>Envio</span>
                  <strong>{darf.sentAt}</strong>
                </div>
                <em className={darf.status === 'Pendencia' ? 'danger' : undefined}>{darf.status}</em>
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
