import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Target, Plus, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  progress: number;
  category: string;
}

const initialGoals: Goal[] = [
  { id: 1, title: 'Viagem Europa', target: 20000, current: 18500, progress: 92.5, category: 'Lazer' },
  { id: 2, title: 'Reserva de Emergência', target: 50000, current: 35000, progress: 70, category: 'Segurança' },
  { id: 3, title: 'Investimento Inicial', target: 10000, current: 7200, progress: 72, category: 'Crescimento' },
  { id: 4, title: 'Novo Veículo', target: 80000, current: 24000, progress: 30, category: 'Aquisição' },
];

export function GoalsScreen() {
  const [goals] = useState<Goal[]>(initialGoals);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  const activeGoals = goals.filter(g => g.progress < 100).length;
  const completedGoals = goals.filter(g => g.progress >= 100).length;
  const totalProgress = goals.reduce((sum, g) => sum + g.progress, 0) / goals.length;

  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 sticky top-0 z-10 border-b border-[#2A3F5F]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[#E8EBF0]">Gestão de Metas Financeiras</h2>
              <Target className="w-5 h-5 text-[#2D7A75]" />
            </div>
            <p className="text-[#94A3B8] text-sm">Planejamento de objetivos</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0]">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] text-[#E8EBF0]">
              <DialogHeader>
                <DialogTitle className="text-[#E8EBF0]">Criar Nova Meta</DialogTitle>
                <DialogDescription className="text-[#94A3B8]">
                  Defina uma meta financeira e acompanhe seu progresso
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title" className="text-[#E8EBF0]">Título da Meta</Label>
                  <Input
                    id="goal-title"
                    placeholder="Ex: Reserva de Emergência"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-target" className="text-[#E8EBF0]">Valor Alvo (R$)</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    placeholder="50000"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                    className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0]"
                  />
                </div>
                <Button className="w-full bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0]">
                  Criar Meta
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Resumo de Metas */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 text-center">
            <Target className="w-4 h-4 text-[#2D7A75] mx-auto mb-1" />
            <div className="text-xl text-[#E8EBF0]">{activeGoals}</div>
            <div className="text-xs text-[#64748B]">Em Andamento</div>
          </Card>
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 text-center">
            <CheckCircle className="w-4 h-4 text-[#2D7A75] mx-auto mb-1" />
            <div className="text-xl text-[#E8EBF0]">{completedGoals}</div>
            <div className="text-xs text-[#64748B]">Concluídas</div>
          </Card>
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 text-center">
            <TrendingUp className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
            <div className="text-xl text-[#D4AF37]">{totalProgress.toFixed(0)}%</div>
            <div className="text-xs text-[#64748B]">Média</div>
          </Card>
        </div>

        {/* Lista de Metas */}
        <div className="space-y-4">
          <h3 className="text-[#E8EBF0] text-sm">Metas Ativas</h3>
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[#E8EBF0]">{goal.title}</h4>
                      <Badge className="bg-[#2A3F5F] text-[#E8EBF0] text-xs">
                        {goal.category}
                      </Badge>
                    </div>
                    <p className="text-[#64748B] text-xs">
                      Status: {goal.progress >= 100 ? 'Concluída' : 'Em Andamento'}
                    </p>
                  </div>
                  <Badge className={`${
                    goal.progress >= 90 ? 'bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30' :
                    goal.progress >= 50 ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30' :
                    'bg-[#64748B]/20 text-[#94A3B8] border-[#64748B]/30'
                  }`}>
                    {goal.progress.toFixed(0)}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="h-2 bg-[#252B3A] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                      className={`h-full ${
                        goal.progress >= 75 ? 'bg-[#2D7A75]' :
                        goal.progress >= 50 ? 'bg-[#3B6EA5]' :
                        'bg-[#64748B]'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8]">
                      R$ {goal.current.toLocaleString('pt-BR')} de R$ {goal.target.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-[#64748B]">
                      Faltam R$ {(goal.target - goal.current).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
