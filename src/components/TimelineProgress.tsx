import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Target, TrendingUp, Award, Zap, DollarSign } from 'lucide-react';

const milestones = [
  {
    id: 1,
    title: 'Meta Atingida!',
    description: 'Meta "Viagem Europa" conquistada com sucesso',
    date: '15 Out',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    xp: '+200 XP',
  },
  {
    id: 2,
    title: 'Conquista Desbloqueada!',
    description: 'Troféu "Mestre da Consistência" conquistado',
    date: '12 Out',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    xp: '+500 XP',
  },
  {
    id: 3,
    title: 'Rendimento Excepcional!',
    description: 'Retorno de +22.8% em Cripto - Continue assim!',
    date: '10 Out',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    xp: '+150 XP',
  },
  {
    id: 4,
    title: 'Evolução de Nível!',
    description: 'Você alcançou o Nível 12 - Parabéns!',
    date: '08 Out',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    xp: '+1000 XP',
  },
];

export function TimelineProgress() {
  return (
    <Card className="bg-slate-900/50 border-blue-500/20 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white text-lg">Linha do Tempo de Conquistas</h3>
          <p className="text-gray-400 text-sm">Seus marcos de evolução</p>
        </div>
        <Award className="w-6 h-6 text-blue-400" />
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const IconComponent = milestone.icon;
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline line */}
              {index !== milestones.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent" />
              )}

              <div className="flex gap-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  className={`w-12 h-12 bg-gradient-to-br ${milestone.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg relative z-10`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-white">{milestone.title}</h4>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                      {milestone.xp}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{milestone.description}</p>
                  <span className="text-gray-500 text-xs">{milestone.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl text-blue-400 text-sm hover:from-blue-600/30 hover:to-cyan-600/30 transition-all"
      >
        Ver Histórico Completo
      </motion.button>
    </Card>
  );
}
