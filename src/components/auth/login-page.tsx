import { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'demo@casaschuck.com' && password === 'CasaSchuck2026!') {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-medium tracking-[0.04em] text-white">Casa Schuck</h1>
            <p className="text-xs text-dashboard-text-secondary mt-1 uppercase tracking-wider">Operations Dashboard</p>
          </div>

          <h2 className="text-sm font-serif font-medium tracking-[0.04em] text-white text-center mb-6">
            Sign in to your dashboard
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dashboard-text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-dashboard-bg border border-dashboard-border rounded-lg pl-10 pr-4 py-3 text-sm text-white
                           placeholder:text-dashboard-hover focus:outline-none focus:border-dashboard-hover"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dashboard-text-secondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-dashboard-bg border border-dashboard-border rounded-lg pl-10 pr-10 py-3 text-sm text-white
                           placeholder:text-dashboard-hover focus:outline-none focus:border-dashboard-hover"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dashboard-text-secondary hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-black hover:bg-dashboard-accent text-white font-bold text-[11px] tracking-[0.15em] uppercase py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-dashboard-hover mt-4">
          Powered by Untold.works
        </p>
      </div>
    </div>
  );
};
