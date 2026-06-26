import { Bell, Building2, Mail, MapPin, Phone, Plus, Save, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { companyRegistration, initialParticipants } from '../data/registration';

const emptyParticipant = {
  nome: '',
  tipo: 'Empresario',
  documento: '',
  email: '',
  telefone: '',
  status: 'Ativo'
};

type Participant = typeof emptyParticipant & {
  id: number;
};

type ParticipantField = keyof typeof emptyParticipant;

export function RegistrationPage() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [participantForm, setParticipantForm] = useState(emptyParticipant);

  const activeParticipants = useMemo(
    () => participants.filter((participant) => participant.status === 'Ativo').length,
    [participants]
  );

  function updateParticipantField(field: ParticipantField, value: string) {
    setParticipantForm((current) => ({ ...current, [field]: value }));
  }

  function addParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!participantForm.nome.trim() || !participantForm.email.trim()) {
      return;
    }

    setParticipants((current) => [
      {
        ...participantForm,
        id: Date.now()
      },
      ...current
    ]);
    setParticipantForm(emptyParticipant);
  }

  return (
    <main className="app-shell">
      <AppSidebar />

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p>Cadastro</p>
            <h1>Dados cadastrais</h1>
            <span>Atualize os dados da empresa e gerencie participantes vinculados ao Project.</span>
          </div>

          <div className="header-actions">
            <button className="icon-button" aria-label="Notificacoes">
              <Bell size={19} aria-hidden="true" />
            </button>
            <button className="upload-button">
              <Save size={18} aria-hidden="true" />
              Salvar alteracoes
            </button>
          </div>
        </header>

        <section className="summary-grid registration-summary" aria-label="Resumo cadastral">
          <MetricCard label="Empresa" value="1" detail="cadastro principal" />
          <MetricCard label="Participantes" value={participants.length} detail="vinculos cadastrados" />
          <MetricCard label="Ativos" value={activeParticipants} detail="aptos para contato" />
          <MetricCard label="Integracao" value="Project" detail="entidade Participante" highlight />
        </section>

        <section className="registration-grid">
          <form className="panel registration-form">
            <div className="panel-heading">
              <div>
                <p>Empresa</p>
                <h2>Dados da empresa</h2>
              </div>
            </div>

            <div className="form-grid">
              <Field label="Razao social" defaultValue={companyRegistration.razaoSocial} icon={Building2} />
              <Field label="Nome fantasia" defaultValue={companyRegistration.nomeFantasia} icon={Building2} />
              <Field label="CNPJ" defaultValue={companyRegistration.cnpj} />
              <Field label="Inscricao municipal" defaultValue={companyRegistration.inscricaoMunicipal} />
              <Field label="E-mail financeiro" defaultValue={companyRegistration.email} icon={Mail} />
              <Field label="Telefone" defaultValue={companyRegistration.telefone} icon={Phone} />
              <Field label="Endereco" defaultValue={companyRegistration.endereco} icon={MapPin} wide />
              <Field label="Cidade" defaultValue={companyRegistration.cidade} />
              <Field label="UF" defaultValue={companyRegistration.uf} />
              <Field label="CEP" defaultValue={companyRegistration.cep} />
            </div>
          </form>

          <aside className="panel participant-form-panel">
            <div className="panel-heading compact">
              <div>
                <p>Participante</p>
                <h2>Novo vinculo</h2>
              </div>
            </div>

            <form className="participant-form" onSubmit={addParticipant}>
              <TextInput label="Nome" value={participantForm.nome} onChange={(value) => updateParticipantField('nome', value)} />
              <label>
                <span>Tipo</span>
                <select value={participantForm.tipo} onChange={(event) => updateParticipantField('tipo', event.target.value)}>
                  <option>Empresario</option>
                  <option>Contador</option>
                  <option>Advogado</option>
                  <option>Financeiro</option>
                  <option>Procurador</option>
                  <option>Outro</option>
                </select>
              </label>
              <TextInput
                label="Documento"
                value={participantForm.documento}
                onChange={(value) => updateParticipantField('documento', value)}
              />
              <TextInput label="E-mail" value={participantForm.email} onChange={(value) => updateParticipantField('email', value)} />
              <TextInput
                label="Telefone"
                value={participantForm.telefone}
                onChange={(value) => updateParticipantField('telefone', value)}
              />

              <button className="primary-action" type="submit">
                <Plus size={18} aria-hidden="true" />
                Incluir participante
              </button>
            </form>
          </aside>
        </section>

        <section className="panel participants-panel">
          <div className="panel-heading">
            <div>
              <p>Project</p>
              <h2>Participantes vinculados</h2>
            </div>
          </div>

          <div className="participants-list">
            {participants.map((participant) => (
              <article className="participant-card" key={participant.id}>
                <div className="participant-avatar">
                  <UserRound size={19} aria-hidden="true" />
                </div>
                <div>
                  <strong>{participant.nome}</strong>
                  <span>{participant.tipo}</span>
                </div>
                <div>
                  <span>Documento</span>
                  <strong>{participant.documento || 'Nao informado'}</strong>
                </div>
                <div>
                  <span>Contato</span>
                  <strong>{participant.email}</strong>
                </div>
                <div>
                  <span>Telefone</span>
                  <strong>{participant.telefone || 'Nao informado'}</strong>
                </div>
                <em>{participant.status}</em>
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

type FieldProps = {
  label: string;
  defaultValue: string;
  icon?: LucideIcon;
  wide?: boolean;
};

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
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

function Field({ label, defaultValue, icon: Icon, wide = false }: FieldProps) {
  return (
    <label className={wide ? 'registration-field wide' : 'registration-field'}>
      <span>{label}</span>
      <div className="field">
        {Icon ? <Icon size={18} aria-hidden="true" /> : null}
        <input defaultValue={defaultValue} />
      </div>
    </label>
  );
}

function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <label>
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
