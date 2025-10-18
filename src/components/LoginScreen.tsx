import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { Shield, Lock, User } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            {/* Minimalist geometric logo */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="5" width="22" height="22" fill="#1A3A5C" rx="3" opacity="0.9" />
                  <rect x="33" y="5" width="22" height="22" fill="#2D7A75" rx="3" opacity="0.9" />
                  <rect x="5" y="33" width="22" height="22" fill="#2D7A75" rx="3" opacity="0.9" />
                  <rect x="33" y="33" width="22" height="22" fill="#D4AF37" rx="3" opacity="0.8" />
                </svg>
              </div>
              <h1 className="text-[#E8EBF0] text-3xl tracking-[0.3em] mb-1">
                PRISMA
              </h1>
              <p className="text-[#94A3B8] text-xs tracking-[0.4em]">
                F I N A N C E
              </p>
            </div>
          </motion.div>
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-[#E8EBF0] text-lg mb-1">Acesso à Plataforma</h2>
            <p className="text-[#94A3B8] text-sm">Sua gestão financeira inteligente</p>
          </motion.div>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-5 bg-[#1A1F2E] p-6 rounded-lg border border-[#2A3F5F]"
        >
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#E8EBF0] text-sm">Usuário</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="username"
                type="text"
                placeholder="seu.usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] placeholder:text-[#64748B] pl-10 h-11 focus:border-[#2D7A75] focus:ring-1 focus:ring-[#2D7A75]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#E8EBF0] text-sm">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] placeholder:text-[#64748B] pl-10 h-11 focus:border-[#2D7A75] focus:ring-1 focus:ring-[#2D7A75]"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] h-12 rounded-md transition-colors"
          >
            Acessar Plataforma
          </Button>

          <div className="flex justify-between text-sm">
            <span className="text-[#64748B] hover:text-[#2D7A75] cursor-pointer transition-colors">Recuperar Acesso</span>
            <span className="text-[#2D7A75] hover:text-[#45A598] cursor-pointer transition-colors">Criar Nova Conta</span>
          </div>
        </motion.form>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-2 text-[#64748B] text-xs"
        >
          <Shield className="w-4 h-4" />
          <span>Prisma Finance: Excelência em gestão de investimentos</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
