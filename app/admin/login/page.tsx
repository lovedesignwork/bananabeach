'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft, Palmtree } from 'lucide-react';
import { signIn } from '@/lib/supabase/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('[Login] Starting sign in for:', email);

    try {
      console.log('[Login] Calling signIn...');
      const authData = await signIn(email, password);
      console.log('[Login] signIn returned:', { 
        hasSession: !!authData.session, 
        hasUser: !!authData.user,
        userId: authData.user?.id 
      });
      
      if (!authData.session) {
        console.log('[Login] No session returned');
        setError('Sign in failed. Please try again.');
        return;
      }

      console.log('[Login] Calling check-admin API...');
      const response = await fetch(`/api/auth/check-admin?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Bearer ${authData.session.access_token}`,
        },
      });
      console.log('[Login] check-admin response status:', response.status);
      const data = await response.json();
      console.log('[Login] check-admin data:', data);
      
      if (data.isAdmin) {
        console.log('[Login] User is admin, redirecting...');
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        window.location.href = '/admin';
      } else {
        console.log('[Login] User is NOT admin');
        setError('You do not have admin access.');
      }
    } catch (err: unknown) {
      console.error('[Login] Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';
      setError(errorMessage);
    } finally {
      console.log('[Login] Finally block, setting loading to false');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1920&q=90"
          alt="Banana Beach"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Palmtree className="w-32 h-32 text-emerald-400" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 rotate-12">
        <Palmtree className="w-40 h-40 text-emerald-400" />
      </div>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link 
          href="/"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-400/20 border-2 border-emerald-400/40 mb-6"
            >
              <span className="font-heading text-3xl font-bold text-emerald-400">BB</span>
            </motion.div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-white/60">
              Banana Beach Management System
            </p>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-200 text-sm"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bananabeach.com"
                    className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/60 focus:bg-white/15 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-14 pl-12 pr-14 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/60 focus:bg-white/15 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full h-14 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="w-8 h-8 rounded-full bg-slate-900/20 flex items-center justify-center group-hover:bg-slate-900/30 transition-colors">
                      <Lock className="w-4 h-4" />
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="px-8 pb-6 pt-2 border-t border-white/10">
              <p className="text-center text-xs text-white/40">
                Protected area • Authorized personnel only
              </p>
            </div>
          </motion.div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-white/40 text-xs mt-6"
          >
            © {new Date().getFullYear()} Banana Beach Koh Hey. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
