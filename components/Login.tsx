import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  error?: string | null;
}

const Login = ({ onLogin, error }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    onLogin(username, password);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8 bg-brand-dark shadow-2xl rounded-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">Visita Residencial Briceño</h1>
        <p className="text-brand-text/80 mt-2">Please sign in to continue</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-brand-text mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition"
            placeholder="e.g., resident1"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-brand-text mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition"
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-brand-secondary hover:bg-brand-light text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;