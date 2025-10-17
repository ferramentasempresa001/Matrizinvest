import { motion } from 'motion/react';
import { Zap, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface XPProgressBarProps {
  currentXP: number;
  currentLevel: number;
  xpForNextLevel: number;
  totalXP?: number;
}

export function XPProgressBar({ currentXP, currentLevel, xpForNextLevel, totalXP = 0 }: XPProgressBarProps) {
  const progress = (currentXP / xpForNextLevel) * 100;
  const remainingXP = xpForNextLevel - currentXP;

  return (
    <Card className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-cyan-900/40 border-purple-500/30 p-6 relative overflow-hidden">
      {/* Background animated glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-pulse" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-2xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Zap className="w-7 h-7 text-white relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white text-xl">Nível {currentLevel}</h3>
                <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 border-purple-400/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Evoluindo
                </Badge>
              </div>
              <p className="text-purple-300 text-sm">Investidor Profissional</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {totalXP.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">XP Total</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-300">Progresso para Nível {currentLevel + 1}</span>
            <span className="text-cyan-300">{Math.round(progress)}%</span>
          </div>
          <div className="h-4 bg-slate-900/80 rounded-full overflow-hidden border border-purple-500/30 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 relative overflow-hidden"
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">{currentXP.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP</span>
            <span className="text-purple-400">Faltam {remainingXP.toLocaleString()} XP - Avance!</span>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-purple-500/20">
          <div className="text-center">
            <div className="text-lg text-cyan-400">+450</div>
            <div className="text-xs text-gray-400">XP Hoje</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-purple-400">7 dias</div>
            <div className="text-xs text-gray-400">Sequência</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-blue-400">92%</div>
            <div className="text-xs text-gray-400">Eficiência</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
