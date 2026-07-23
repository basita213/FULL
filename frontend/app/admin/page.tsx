'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    router.push('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-pale via-white to-pink-pale flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-4xl p-10 shadow-[0_8px_32px_rgba(26,10,20,0.08)]">
        <div className="text-center mb-8">
          <img src="/logo.jpg" alt="Candy Days" className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-pink-light" />
          <h1 className="font-display font-bold text-2xl">Admin Panel</h1>
          <p className="text-gray text-sm mt-1">Connectez-vous pour gérer votre site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink transition-colors"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink transition-colors"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-display font-semibold px-8 py-4 rounded-full bg-pink text-white shadow-[0_4px_16px_rgba(233,30,140,0.3)] hover:bg-pink-deep hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
