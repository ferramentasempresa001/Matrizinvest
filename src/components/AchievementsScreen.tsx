import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Award, Lock, TrendingUp, Target, CheckCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  icon: typeof Award;
  category: string;
  points: number;
}

const achievements: Achievement[] = [
  { id: 1, title: 'Primeiro Investimento', description: 'Realizou sua primeira aplicação financeira', unlocked: true, icon: Star, category: 'Iniciante', points: 100 },
  { id: 2, title: 'Diversificação Básica', description: 'Investiu em 3 categorias diferentes', unlocked: true, icon: Target, category: 'Estratégia', points: 250 },
  { id: 3, title: 'Meta Alcançada', description: 'Completou sua primeira meta financeira', unlocked: true, icon: CheckCircle, category: 'Conquista', points: 300 },
  { id: 4, title: 'Investidor Consistente', description: 'Manteve investimentos por 6 meses', unlocked: true, icon: TrendingUp, category: 'Persistência', points: 500 },
  { id: 5, title: 'Portfolio Avançado', description: 'Alcançou R$ 100.000 investidos', unlocked: false, icon: Award, category: 'Evolução', points: 1000 },
  { id: 6, title: 'Especialista em Renda Fixa', description: 'Invista R$ 50.000 em renda fixa', unlocked: false, icon: Award, category: 'Especialização', points: 750 },
];

export function AchievementsScreen() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const currentLevel = Math.floor(totalPoints / 500) + 1;
  const pointsForNext = (currentLevel * 500) - totalPoints;

  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 sticky top-0 z-10 border-b border-[#2A3F5F]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[#E8EBF0]">Certificações e Reconhecimentos</h2>
              <Award className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-[#94A3B8] text-sm">Histórico de conquistas</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Nível Atual */}
        <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-[#E8EBF0]">Nível {currentLevel}</h3>
                  <p className="text-[#64748B] text-sm">Investidor em Evolução</p>
                </div>
              </div>
            </div>
            <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
              {totalPoints} XP
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[#E8EBF0]">
              <span>Progresso para Nível {currentLevel + 1}</span>
              <span className="text-[#D4AF37]">{((totalPoints % 500) / 500 * 100).toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-[#252B3A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(totalPoints % 500) / 500 * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-[#D4AF37]"
              />
            </div>
            <div className="text-xs text-[#64748B] text-right">
              Faltam {pointsForNext} pontos para o próximo nível
            </div>
          </div>
        </Card>

        {/* Resumo */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 text-center">
            <Award className="w-4 h-4 text-[#2D7A75] mx-auto mb-1" />
            <div className="text-xl text-[#E8EBF0]">{unlockedCount}</div>
            <div className="text-xs text-[#64748B]">Desbloqueadas</div>
          </Card>
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 text-center">
            <Lock className="w-4 h-4 text-[#64748B] mx-auto mb-1" />
            <div className="text-xl text-[#E8EBF0]">{achievements.length - unlockedCount}</div>
            <div className="text-xs text-[#64748B]">Bloqueadas</div>
          </Card>
        </div>

        {/* Conquistas Desbloqueadas */}
        <div>
          <h3 className="text-[#E8EBF0] mb-3 text-sm">Certificações Conquistadas</h3>
          <div className="space-y-3">
            {achievements.filter(a => a.unlocked).map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-[#1A1F2E] border-[#2D7A75]/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-[#2D7A75]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#2D7A75]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="text-[#E8EBF0] mb-1">{achievement.title}</h4>
                            <Badge className="bg-[#2A3F5F] text-[#94A3B8] text-xs">
                              {achievement.category}
                            </Badge>
                          </div>
                          <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
                            +{achievement.points}
                          </Badge>
                        </div>
                        <p className="text-[#64748B] text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Conquistas Bloqueadas */}
        <div>
          <h3 className="text-[#94A3B8] mb-3 text-sm">Próximas Certificações</h3>
          <div className="space-y-3">
            {achievements.filter(a => !a.unlocked).map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 opacity-60">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-[#252B3A] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-[#64748B]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="text-[#94A3B8] mb-1">{achievement.title}</h4>
                            <Badge className="bg-[#252B3A] text-[#64748B] text-xs">
                              {achievement.category}
                            </Badge>
                          </div>
                          <Badge className="bg-[#252B3A] text-[#64748B] border-[#2A3F5F]">
                            +{achievement.points}
                          </Badge>
                        </div>
                        <p className="text-[#64748B] text-sm">Requisito: {achievement.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
