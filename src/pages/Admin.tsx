
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

/**
 * Página principal do painel administrativo
 * Redireciona para login se não autenticado ou mostra o dashboard
 */
const Admin = () => {
  // Simulando autenticação com localStorage por enquanto
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('admin-auth', false);
  const [currentUser, setCurrentUser] = useLocalStorage('admin-user', null);

  // Função para login
  const handleLogin = (email: string, password: string) => {
    // Simulação de autenticação (será substituída por Firebase Auth)
    if (email === 'admin@turum.com.br' && password === 'admin123') {
      setIsAuthenticated(true);
      setCurrentUser({
        id: '1',
        name: 'Administrador',
        email: email,
        role: 'admin'
      });
      return true;
    }
    return false;
  };

  // Função para logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Se estiver autenticado, mostrar dashboard
  return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
};

export default Admin;
