import { BriefcaseBusiness, Building2, FileArchive, Home, LogOut, ReceiptText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type SidebarUser = {
  name: string;
  initials: string;
  email: string;
  canViewSupplyTax: boolean;
};

type NavItem = {
  label: string;
  icon: typeof Home;
  to: string;
  external?: boolean;
  permission?: keyof SidebarUser;
};

const navItems: NavItem[] = [
  { label: 'Inicio', icon: Home, to: '/home' },
  { label: 'Jobs', icon: BriefcaseBusiness, to: '/jobs' },
  { label: 'Cadastros', icon: Building2, to: '/cadastro' },
  { label: 'DARFs', icon: FileArchive, to: '/darfs' },
  { label: 'Supply Tax', icon: ReceiptText, to: 'http://localhost:5173', external: true, permission: 'canViewSupplyTax' }
];

export function AppSidebar() {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const visibleNavItems = navItems.filter((item) => !item.permission || currentUser?.[item.permission]);

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
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.to === location.pathname && ['Inicio', 'Jobs', 'Cadastros', 'DARFs'].includes(item.label);
          const className = isActive ? 'nav-item active' : 'nav-item';

          if (item.external) {
            return (
              <a className={className} href={item.to} key={item.label}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          }

          return (
            <Link className={className} key={item.label} to={item.to}>
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <span className="avatar">{currentUser.initials}</span>
        <div>
          <strong>{currentUser.name}</strong>
          <span>{currentUser.email}</span>
        </div>
      </div>

      <Link className="logout-link" to="/login">
        <LogOut size={17} aria-hidden="true" />
        Sair da conta
      </Link>
    </aside>
  );
}

function getCurrentUser(): SidebarUser {
  const fallbackUser = {
    name: 'Cristiano A.',
    initials: 'CA',
    email: 'cliente@grupostudio.com.br',
    canViewSupplyTax: true
  };

  try {
    const storedUser = window.localStorage.getItem('grupoStudioUser');
    return storedUser ? JSON.parse(storedUser) : fallbackUser;
  } catch {
    return fallbackUser;
  }
}
