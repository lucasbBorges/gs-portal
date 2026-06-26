import { ArrowRight, BriefcaseBusiness, FileCheck2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MockUser = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  password: string;
  canViewSupplyTax: boolean;
};

const mockUsers: MockUser[] = [
  {
    id: 'admin',
    name: 'Cristiano A.',
    initials: 'CA',
    role: 'Cliente administrador',
    email: 'cliente@grupostudio.com.br',
    password: 'Studio@2026',
    canViewSupplyTax: true
  },
  {
    id: 'operational',
    name: 'Mariana C.',
    initials: 'MC',
    role: 'Cliente operacional',
    email: 'operacional@grupostudio.com.br',
    password: 'Portal@2026',
    canViewSupplyTax: false
  }
];

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem('grupoStudioUser', JSON.stringify(selectedUser));
    navigate('/home');
  }

  return (
    <main className="login-shell">
      <aside className="login-showcase" aria-label="Resumo do portal">
        <div className="showcase-card">
          <div className="showcase-topline">
            <ShieldCheck size={20} aria-hidden="true" />
            <span>Portal do Cliente</span>
          </div>
          <h2>Gestao fiscal clara para acompanhar jobs, cadastros e DARFs.</h2>

          <div className="showcase-highlights">
            <div>
              <BriefcaseBusiness size={20} aria-hidden="true" />
              <span>Jobs com status atualizado</span>
            </div>
            <div>
              <FileCheck2 size={20} aria-hidden="true" />
              <span>Envio e validacao de DARFs</span>
            </div>
          </div>

          <div className="showcase-metrics">
            <div>
              <strong>32</strong>
              <span>jobs ativos</span>
            </div>
            <div>
              <strong>91%</strong>
              <span>no prazo</span>
            </div>
            <div>
              <strong>8</strong>
              <span>DARFs enviados</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="login-panel" aria-label="Acesso ao portal">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            gs
          </span>
          <div>
            <strong>studio fiscal</strong>
            <span>Portal do Cliente</span>
          </div>
        </div>

        <div className="login-heading">
          <p>Acesso seguro</p>
          <h1>Entre no portal para acompanhar sua operacao fiscal.</h1>
        </div>

        <div className="mock-users" aria-label="Usuarios mockados">
          {mockUsers.map((user) => (
            <button
              className={selectedUser.id === user.id ? 'mock-user-card active' : 'mock-user-card'}
              key={user.id}
              onClick={() => setSelectedUser(user)}
              type="button"
            >
              <span>{user.role}</span>
              <strong>{user.email}</strong>
              <em>{user.canViewSupplyTax ? 'Com Supply Tax' : 'Sem Supply Tax'}</em>
            </button>
          ))}
        </div>

        <form className="login-form" onSubmit={login}>
          <label>
            <span>E-mail</span>
            <div className="field">
              <Mail size={18} aria-hidden="true" />
              <input type="email" key={selectedUser.email} defaultValue={selectedUser.email} autoComplete="email" />
            </div>
          </label>

          <label>
            <span>Senha</span>
            <div className="field">
              <LockKeyhole size={18} aria-hidden="true" />
              <input type="password" key={selectedUser.password} defaultValue={selectedUser.password} autoComplete="current-password" />
            </div>
          </label>

          <div className="form-row">
            <label className="check-option">
              <input type="checkbox" />
              <span>Manter conectado</span>
            </label>
            <a href="#recuperar">Esqueci a senha</a>
          </div>

          <button className="primary-action" type="submit">
            Entrar no portal
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  );
}
