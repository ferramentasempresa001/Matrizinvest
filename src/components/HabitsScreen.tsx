import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { CheckCircle2, TrendingUp, Star, FileText, Newspaper, BarChart3, BookOpen, Plus, Target, Briefcase, Coffee, Lightbulb, Activity } from 'lucide-react';
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

const availableIcons = [
  { name: 'Newspaper', icon: Newspaper },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'FileText', icon: FileText },
  { name: 'BarChart3', icon: BarChart3 },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Target', icon: Target },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Coffee', icon: Coffee },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'Activity', icon: Activity },
];

export function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    points: 50,
    iconIndex: 0,
  });

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

  const handleAddHabit = () => {
    if (!newHabit.title.trim()) {
      toast.error('Erro', { description: 'Por favor, insira um título para o hábito' });
      return;
    }

    const habit: Habit = {
      id: habits.length > 0 ? Math.max(...habits.map(h => h.id)) + 1 : 1,
      title: newHabit.title,
      description: newHabit.description,
      completed: false,
      icon: availableIcons[newHabit.iconIndex].icon,
      points: newHabit.points,
    };

    setHabits([...habits, habit]);
    setNewHabit({ title: '', description: '', points: 50, iconIndex: 0 });
    setDialogOpen(false);
    toast.success('Hábito Adicionado', {
      description: 'Nova rotina criada com sucesso'
    });
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
          <div className="flex items-center justify-between">
            <h3 className="text-[#E8EBF0] text-sm">Rotina do Dia</h3>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0] h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] text-[#E8EBF0] max-w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-[#E8EBF0]">Adicionar Nova Rotina</DialogTitle>
                  <DialogDescription className="text-[#94A3B8]">
                    Crie um novo hábito para sua rotina diária de desenvolvimento financeiro
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#E8EBF0] text-sm">Título</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Revisar portfólio"
                      value={newHabit.title}
                      onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                      className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] placeholder:text-[#64748B]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#E8EBF0] text-sm">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva a atividade..."
                      value={newHabit.description}
                      onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                      className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] placeholder:text-[#64748B] min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E8EBF0] text-sm">Ícone</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {availableIcons.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => setNewHabit({ ...newHabit, iconIndex: idx })}
                            className={`h-10 rounded-lg flex items-center justify-center transition-colors ${
                              newHabit.iconIndex === idx
                                ? 'bg-[#2D7A75] text-[#E8EBF0]'
                                : 'bg-[#252B3A] text-[#64748B] hover:bg-[#2A3F5F]'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points" className="text-[#E8EBF0] text-sm">Pontos (XP)</Label>
                    <Input
                      id="points"
                      type="number"
                      min="10"
                      max="200"
                      step="5"
                      value={newHabit.points}
                      onChange={(e) => setNewHabit({ ...newHabit, points: parseInt(e.target.value) || 50 })}
                      className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0]"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F] h-10 sm:h-9 text-sm"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAddHabit}
                      className="flex-1 bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0] h-10 sm:h-9 text-sm"
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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
