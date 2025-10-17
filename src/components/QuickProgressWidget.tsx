import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LucideIcon } from 'lucide-react';

interface QuickProgressWidgetProps {
  title: string;
  current: number;
  target: number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'cyan';
  unit?: string;
  delay?: number;
}

const colorSchemes = {
  blue: {
    gradient: 'from-blue-600 to-cyan-600',
    border: 'border-blue-500/30',
    bg: 'from-blue-900/40 to-blue-900/20',
    progressBar: 'from-blue-500 to-cyan-500',
    text: 'text-blue-400',
    shadow: 'shadow-blue-500/50',
  },
  green: {
    gradient: 'from-green-600 to-emerald-600',
    border: 'border-green-500/30',
    bg: 'from-green-900/40 to-green-900/20',
    progressBar: 'from-green-500 to-emerald-500',
    text: 'text-green-400',
    shadow: 'shadow-green-500/50',
  },
  purple: {
    gradient: 'from-purple-600 to-pink-600',
    border: 'border-purple-500/30',
    bg: 'from-purple-900/40 to-purple-900/20',
    progressBar: 'from-purple-500 to-pink-500',
    text: 'text-purple-400',
    shadow: 'shadow-purple-500/50',
  },
  orange: {
    gradient: 'from-orange-600 to-yellow-600',
    border: 'border-orange-500/30',
    bg: 'from-orange-900/40 to-orange-900/20',
    progressBar: 'from-orange-500 to-yellow-500',
    text: 'text-orange-400',
    shadow: 'shadow-orange-500/50',
  },
  cyan: {
    gradient: 'from-cyan-600 to-teal-600',
    border: 'border-cyan-500/30',
    bg: 'from-cyan-900/40 to-cyan-900/20',
    progressBar: 'from-cyan-500 to-teal-500',
    text: 'text-cyan-400',
    shadow: 'shadow-cyan-500/50',
  },
};

export function QuickProgressWidget({
  title,
  current,
  target,
  icon: Icon,
  color = 'blue',
  unit = '',
  delay = 0,
}: QuickProgressWidgetProps) {
  const progress = Math.min((current / target) * 100, 100);
  const scheme = colorSchemes[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.97 }}
    >
      <Card className={`bg-gradient-to-br ${scheme.bg} ${scheme.border} p-4 cursor-pointer`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-white text-sm mb-1">{title}</h4>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl ${scheme.text}`}>
                {current.toLocaleString()}
              </span>
              <span className="text-gray-500 text-xs">
                / {target.toLocaleString()} {unit}
              </span>
            </div>
          </div>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className={`w-10 h-10 bg-gradient-to-br ${scheme.gradient} rounded-xl flex items-center justify-center shadow-lg ${scheme.shadow}`}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Progresso</span>
            <span className={scheme.text}>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-900/80 rounded-full overflow-hidden border border-opacity-30" style={{ borderColor: scheme.text }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: delay + 0.3 }}
              className={`h-full bg-gradient-to-r ${scheme.progressBar} relative`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-3">
          <Badge
            className={`${
              progress >= 100
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : progress >= 75
                ? `bg-${color}-500/20 text-${color}-400 border-${color}-500/30`
                : progress >= 50
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
            } text-xs`}
          >
            {progress >= 100
              ? '✓ Completo'
              : progress >= 75
              ? 'Quase lá!'
              : progress >= 50
              ? 'No caminho certo'
              : 'Comece agora'}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}
