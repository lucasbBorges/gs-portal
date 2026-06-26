import { BriefcaseBusiness, Building2, FileArchive, Home, LogOut, ReceiptText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', icon: Home, to: '/home' },
  { label: 'Jobs', icon: BriefcaseBusiness, to: '/jobs' },
  { label: 'Cadastros', icon: Building2, to: '/cadastro' },
  { label: 'DARFs', icon: FileArchive, to: '/darfs' },
  { label: 'Supply Tax', icon: ReceiptText, to: '/home' }
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="brand-lockup sidebar-brand">
        <span className="brand-mark" aria-hidden="true">
          gs
        </span>
        <div>
          <strong>studio fiscal</strong>
          <span>Portal do Cliente</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Menu principal">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.to === location.pathname && ['Inicio', 'Jobs', 'Cadastros', 'DARFs'].includes(item.label);

          return (
            <Link className={isActive ? 'nav-item active' : 'nav-item'} key={item.label} to={item.to}>
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <span className="avatar">CA</span>
        <div>
          <strong>Cristiano A.</strong>
          <span>cliente@grupostudio.com.br</span>
        </div>
      </div>

      <Link className="logout-link" to="/login">
        <LogOut size={17} aria-hidden="true" />
        Sair da conta
      </Link>
    </aside>
  );
}
