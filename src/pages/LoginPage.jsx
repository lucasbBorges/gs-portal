import { ArrowRight, BriefcaseBusiness, FileCheck2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultUser = {
  email: 'cliente@grupostudio.com.br',
  password: 'Studio@2026'
};

export function LoginPage() {
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

        <div className="mock-user-card" aria-label="Usuario padrao mockado">
          <span>Usuario padrao</span>
          <strong>{defaultUser.email}</strong>
          <em>Senha: {defaultUser.password}</em>
        </div>

        <form className="login-form">
          <label>
            <span>E-mail</span>
            <div className="field">
              <Mail size={18} aria-hidden="true" />
              <input type="email" defaultValue={defaultUser.email} autoComplete="email" />
            </div>
          </label>

          <label>
            <span>Senha</span>
            <div className="field">
              <LockKeyhole size={18} aria-hidden="true" />
              <input type="password" defaultValue={defaultUser.password} autoComplete="current-password" />
            </div>
          </label>

          <div className="form-row">
            <label className="check-option">
              <input type="checkbox" />
              <span>Manter conectado</span>
            </label>
            <a href="#recuperar">Esqueci a senha</a>
          </div>

          <Link className="primary-action" to="/home">
            Entrar no portal
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </form>
      </section>
    </main>
  );
}
