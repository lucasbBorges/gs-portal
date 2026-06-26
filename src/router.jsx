import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { JobsPage } from './pages/JobsPage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';
import { DarfsPage } from './pages/DarfsPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/jobs',
    element: <JobsPage />
  },
  {
    path: '/cadastro',
    element: <RegistrationPage />
  },
  {
    path: '/darfs',
    element: <DarfsPage />
  }
]);
