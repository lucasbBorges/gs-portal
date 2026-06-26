import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { DarfsPage } from './pages/DarfsPage';

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
