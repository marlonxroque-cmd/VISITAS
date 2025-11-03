// Fix: Create the main App component to handle application logic and resolve module errors.
// Fix: Import useState and useEffect from React to resolve 'Cannot find name' errors and fix import syntax.
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import QrValidator from './components/QrValidator';
import AdminPanel from './components/AdminPanel';
import type { User, ResidentUser } from './types';

// Mock user data for demonstration
const INITIAL_USERS: { [key: string]: User } = {
  'resident1': { 
    role: 'resident', 
    username: 'resident1', 
    password: 'password',
    name: 'Juan',
    lastName: 'Pérez',
    block: 'A',
    house: '101',
    phone: '555-1234',
    email: 'juan.perez@email.com',
    paymentStatus: 'Al día',
  },
   'resident2': { 
    role: 'resident', 
    username: 'resident2', 
    password: 'password',
    name: 'Maria',
    lastName: 'Gonzalez',
    block: 'B',
    house: '205',
    phone: '555-5678',
    email: 'maria.gonzalez@email.com',
    paymentStatus: 'Pendiente de pago',
  },
  'security1': { role: 'security', username: 'security1', password: 'password' },
  'admin1': { role: 'admin', username: 'admin1', password: 'password' },
};

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<{ [key: string]: User }>(INITIAL_USERS);
  const [authError, setAuthError] = useState<string | null>(null);
  const [view, setView] = useState<'default' | 'validator'>('default');

  useEffect(() => {
    // Attempt to load user from localStorage on initial load
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        // Fix: Cast the parsed user from localStorage to the User type to resolve type error.
        setCurrentUser(JSON.parse(storedUser) as User);
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('currentUser');
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = users[username];
    if (user && user.password === password) {
      const { password: _, ...userToStore } = user;
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      setAuthError(null);
      setView('default');
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setAuthError(null);
    setView('default');
  };

  const handleAddResident = (newResident: ResidentUser) => {
    setUsers(prevUsers => ({
      ...prevUsers,
      [newResident.username]: { ...newResident, role: 'resident' }
    }));
  };

  const handleEditResident = (username: string, updatedResident: Omit<ResidentUser, 'role' | 'username'>) => {
    setUsers(prevUsers => {
      const userToUpdate = prevUsers[username];
      if (userToUpdate && userToUpdate.role === 'resident') {
        // If the password in the update data is empty, keep the old one.
        if (!updatedResident.password) {
          updatedResident.password = userToUpdate.password;
        }
        return {
          ...prevUsers,
          [username]: { ...userToUpdate, ...updatedResident }
        };
      }
      return prevUsers;
    });
  };

  const handleDeleteResident = (username: string) => {
    setUsers(prevUsers => {
      const { [username]: _, ...remainingUsers } = prevUsers;
      return remainingUsers;
    });
  };
  
  const handleTogglePaymentStatus = (username: string) => {
    setUsers(prevUsers => {
      const userToUpdate = prevUsers[username];
      if (userToUpdate && userToUpdate.role === 'resident') {
        const resident = userToUpdate as ResidentUser;
        const newStatus = resident.paymentStatus === 'Al día' ? 'Pendiente de pago' : 'Al día';
        return {
          ...prevUsers,
          [username]: { ...resident, paymentStatus: newStatus }
        };
      }
      return prevUsers;
    });
  };

  const renderContent = () => {
    if (!currentUser) {
      return <Login onLogin={handleLogin} error={authError} />;
    }

    switch (currentUser.role) {
      case 'resident':
        return <RegistrationForm onLogout={handleLogout} residentInfo={currentUser as ResidentUser} />;
      case 'security':
        // For security, they might have a main panel and then go to the validator
        if (view === 'validator') {
            return <QrValidator onBack={() => setView('default')} />;
        }
        return (
            <div className="w-full max-w-sm mx-auto p-8 bg-brand-dark shadow-2xl rounded-2xl text-center">
                <h1 className="text-3xl font-extrabold text-white mb-4">Panel de Seguridad</h1>
                <p className="text-brand-text/80 mb-8">Bienvenido, {currentUser.username}.</p>
                <button 
                    onClick={() => setView('validator')} 
                    className="w-full py-3 px-4 bg-brand-secondary hover:bg-brand-light text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                    Escanear QR
                </button>
                <button 
                    onClick={handleLogout} 
                    className="w-full mt-4 py-3 px-4 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                    Cerrar Sesión
                </button>
            </div>
        );
      case 'admin':
        const residents = Object.values(users).filter(u => u.role === 'resident') as ResidentUser[];
        return (
          <AdminPanel 
            onLogout={handleLogout} 
            residents={residents}
            onAddResident={handleAddResident}
            onEditResident={handleEditResident}
            onDeleteResident={handleDeleteResident}
            onTogglePaymentStatus={handleTogglePaymentStatus}
          />
        );
      default:
        // This case handles if currentUser is not null but has an invalid role.
        // It's good practice for type safety.
        return <p>Role not recognized.</p>;
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg text-white flex items-center justify-center p-4 font-sans">
      {renderContent()}
    </main>
  );
};

export default App;