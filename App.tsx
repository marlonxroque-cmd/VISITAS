import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import QrValidator from './components/QrValidator';
import AdminPanel from './components/AdminPanel';
import type { User, ResidentUser, BaseUser } from './types';
import * as api from './services/api'; // Import the API service
import { SpinnerIcon } from './components/icons';

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [view, setView] = useState<'default' | 'validator'>('default');

  // Load initial data from the remote "database"
  useEffect(() => {
    try {
      const fetchedUsers = api.fetchUsers();
      setUsers(fetchedUsers);

      // Attempt to load logged-in user from localStorage (session persistence)
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        // Verify user still exists in the fetched data
        if (fetchedUsers[parsedUser.username]) {
           setCurrentUser(parsedUser);
        } else {
           localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error("Failed to load users from API", error);
      setAuthError("Could not connect to the database.");
    } finally {
      setLoading(false);
    }
  }, []);

  const persistUsers = (updatedUsers: { [key: string]: User }) => {
      try {
        api.saveUsers(updatedUsers);
      } catch (error) {
        console.error("Failed to save users to API", error);
        // Here you could implement a rollback or notify the user
      }
  };

  const handleLogin = (username: string, password: string) => {
    const user = users[username];
    if (user && user.password === password) {
      const { password: _, ...userToStore } = user;
      localStorage.setItem('currentUser', JSON.stringify(userToStore)); // Session management still local
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
    // Fix: Directly assign the newResident object to avoid type widening issues with the 'role' property.
    const updatedUsers = {
      ...users,
      [newResident.username]: newResident,
    };
    setUsers(updatedUsers);
    persistUsers(updatedUsers);
  };

  const handleEditResident = (username: string, updatedResident: Omit<ResidentUser, 'role' | 'username'>) => {
    const userToUpdate = users[username];
    if (userToUpdate && userToUpdate.role === 'resident') {
      if (!updatedResident.password) {
        updatedResident.password = userToUpdate.password;
      }
      const updatedUsers = {
        ...users,
        [username]: { ...userToUpdate, ...updatedResident }
      };
      setUsers(updatedUsers);
      persistUsers(updatedUsers);
    }
  };

  const handleDeleteResident = (username: string) => {
    const { [username]: _, ...remainingUsers } = users;
    setUsers(remainingUsers);
    persistUsers(remainingUsers);
  };

  const handleTogglePaymentStatus = (username: string) => {
    const userToUpdate = users[username];
    if (userToUpdate && userToUpdate.role === 'resident') {
      const resident = userToUpdate as ResidentUser;
      const newStatus = resident.paymentStatus === 'Al día' ? 'Pendiente de pago' : 'Al día';
      const updatedUsers = {
        ...users,
        [username]: { ...resident, paymentStatus: newStatus }
      };
      setUsers(updatedUsers);
      persistUsers(updatedUsers);
    }
  };

  const handleAddSecurity = (newSecurity: BaseUser) => {
    // Fix: Directly assign the newSecurity object to avoid type widening issues with the 'role' property.
    const updatedUsers = {
      ...users,
      [newSecurity.username]: newSecurity,
    };
    setUsers(updatedUsers);
    persistUsers(updatedUsers);
  };

  const handleEditSecurity = (username: string, updatedSecurity: Omit<BaseUser, 'role' | 'username'>) => {
    const userToUpdate = users[username];
    if (userToUpdate && userToUpdate.role === 'security') {
      if (!updatedSecurity.password) {
        updatedSecurity.password = userToUpdate.password;
      }
      const updatedUsers = {
        ...users,
        [username]: { ...userToUpdate, ...updatedSecurity }
      };
      setUsers(updatedUsers);
      persistUsers(updatedUsers);
    }
  };

  const handleDeleteSecurity = (username: string) => {
    const { [username]: _, ...remainingUsers } = users;
    setUsers(remainingUsers);
    persistUsers(remainingUsers);
  };

  const renderContent = () => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <SpinnerIcon className="w-12 h-12 animate-spin text-brand-light" />
                <p className="text-xl text-brand-text/80">Cargando datos...</p>
            </div>
        )
    }

    if (!currentUser) {
      return <Login onLogin={handleLogin} error={authError} />;
    }

    switch (currentUser.role) {
      case 'resident':
        return <RegistrationForm onLogout={handleLogout} residentInfo={currentUser as ResidentUser} />;
      case 'security':
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
        const residents = Object.values(users).filter((u: User): u is ResidentUser => u.role === 'resident');
        const securityUsers = Object.values(users).filter((u: User): u is BaseUser => u.role === 'security');
        return (
          <AdminPanel 
            onLogout={handleLogout} 
            residents={residents}
            onAddResident={handleAddResident}
            onEditResident={handleEditResident}
            onDeleteResident={handleDeleteResident}
            onTogglePaymentStatus={handleTogglePaymentStatus}
            securityUsers={securityUsers}
            onAddSecurity={handleAddSecurity}
            onEditSecurity={handleEditSecurity}
            onDeleteSecurity={handleDeleteSecurity}
          />
        );
      default:
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
