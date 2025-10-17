import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { CheckCircle2, TrendingUp, Star, FileText, Newspaper, BarChart3, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface Habit {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  icon: typeof Newspaper;
  points: number;
}

const initialHabits: Habit[] = [
  { id: 1, title: 'Revisar Notícias de Mercado', description: 'Acompanhar principais eventos econômicos', completed: false, icon: Newspaper, points: 50 },
  { id: 2, title: 'Acompanhar Cotações de Ativos', description: 'Monitorar performance dos investimentos', completed: false, icon: TrendingUp, points: 50 },
  { id: 3, title: 'Estudar Relatório de Análise', description: 'Revisar relatórios mensais do setor', completed: false, icon: FileText, points: 75 },
  { id: 4, title: 'Analisar Balanço de Empresa', description: 'Análise trimestral de demonstrações', completed: false, icon: BarChart3, points: 100 },
  { id: 5, title: 'Participar de Webinar sobre Investimentos', description: 'Educação continuada em finanças', completed: false, icon: BookOpen, points: 80 },
];

export function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const handleToggle = (id: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        if (newCompleted) {
          toast.success('Hábito Concluído', {
            description: `+${habit.points} Pontos de Desenvolvimento Adquiridos`
          });
        }
        return { ...habit, completed: newCompleted };
      }
      return habit;
    }));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = ((completedToday / totalHabits) * 100).toFixed(0);
  const streak = 156;
  const successRate = 92;

  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 sticky top-0 z-10 border-b border-[#2A3F5F]">
        <div>
          <h2 className="text-[#E8EBF0] mb-1">Hábitos de Sucesso Financeiro</h2>
          <p className="text-[#94A3B8] text-sm">Rotina de aprimoramento contínuo</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Resumo do Dia */}
        <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[#E8EBF0]">Progresso de Hoje</h3>
                <Star className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-[#94A3B8] text-sm">Sexta, 17 Out 2025</p>
            </div>
            <Badge className="bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30">
              {completedToday}/{totalHabits}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-[#252B3A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-[#2D7A75]"
              />
            </div>
            <p className="text-[#64748B] text-xs text-right">{completionRate}% Concluído</p>
          </div>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 text-center">
            <TrendingUp className="w-4 h-4 text-[#2D7A75] mx-auto mb-2" />
            <div className="text-xl text-[#E8EBF0]">{streak}</div>
            <div className="text-xs text-[#64748B]">Dias Consecutivos</div>
          </Card>
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 text-center">
            <CheckCircle2 className="w-4 h-4 text-[#2D7A75] mx-auto mb-2" />
            <div className="text-xl text-[#2D7A75]">{successRate}%</div>
            <div className="text-xs text-[#64748B]">Taxa de Sucesso</div>
          </Card>
        </div>

        {/* Lista de Hábitos */}
        <div className="space-y-3">
          <h3 className="text-[#E8EBF0] text-sm">Rotina do Dia</h3>
          {habits.map((habit, index) => {
            const Icon = habit.icon;
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 transition-all cursor-pointer ${
                    habit.completed
                      ? 'bg-[#2D7A75]/10 border-[#2D7A75]/30'
                      : 'bg-[#1A1F2E] border-[#2A3F5F]'
                  }`}
                  onClick={() => handleToggle(habit.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Checkbox
                        checked={habit.completed}
                        onCheckedChange={() => handleToggle(habit.id)}
                        className="data-[state=checked]:bg-[#2D7A75] data-[state=checked]:border-[#2D7A75]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#2D7A75] flex-shrink-0" />
                        <h4 className={`text-sm ${
                          habit.completed ? 'text-[#94A3B8] line-through' : 'text-[#E8EBF0]'
                        }`}>
                          {habit.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#64748B]">{habit.description}</p>
                    </div>
                    <Badge className="bg-[#2A3F5F] text-[#D4AF37] text-xs flex-shrink-0">
                      +{habit.points} XP
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
