import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ShieldCheck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialIsLogin }) {
  if (!isOpen) return null;

  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [success, setSuccess] = useState(false);

  // Sync state whenever the prop updates upon direct alternate button clicks
  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in text-left font-sans">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-sm p-6 relative border border-zinc-100 dark:border-zinc-800 shadow-2xl space-y-4 transition-colors">
        <button onClick={onClose} type="button" className="absolute right-4 top-4 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg cursor-pointer">
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-3">
            <div className="mx-auto h-12 w-12 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white">
                {isLogin ? 'Welcome Back!' : 'Account Created'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">Secure authentication session token sync completed.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="font-black text-base text-zinc-950 dark:text-white tracking-tight">
                {isLogin ? 'Account Portal Sign In' : 'Create Patient Account'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">Sync diagnostics data across your personal devices.</p>
            </div>

            <div className="space-y-3">
              {!isLogin && (
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">Full Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input type="text" required className="w-full pl-9 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-violet-500/20" placeholder="Enter name" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                  <input type="email" required className="w-full pl-9 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-violet-500/20" placeholder="name@domain.com" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                  <input type="password" required className="w-full pl-9 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-violet-500/20" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-md transition-colors">
              {isLogin ? 'Sign In to Account' : 'Register Secure Account'}
            </button>

            <p className="text-center text-[11px] text-zinc-500">
              {isLogin ? "Don't have an account? " : "Already have a patient card? "}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-violet-600 dark:text-violet-400 font-bold hover:underline cursor-pointer">
                {isLogin ? 'Register' : 'Sign In'}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}