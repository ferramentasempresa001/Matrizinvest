import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, TrendingUp, AlertTriangle, Target, DollarSign, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface Alert {
  id: number;
  type: 'opportunity' | 'warning' | 'goal' | 'info';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

const defaultAlerts: Alert[] = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Nova Oportunidade de Investimento',
    description: 'CDB Premium 115% CDI disponível com taxa especial até amanhã',
    action: 'Ver Detalhes',
    priority: 'high'
  },
  {
    id: 2,
    type: 'goal',
    title: 'Meta Próxima do Objetivo',
    description: 'Faltam apenas R$ 1.200 para completar sua meta "Fundo de Emergência"',
    action: 'Ver Meta',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Volatilidade Detectada',
    description: 'Seu portfólio de Cripto apresentou variação de -8% nas últimas 24h',
    action: 'Analisar',
    priority: 'high'
  },
  {
    id: 4,
    type: 'info',
    title: 'Aporte Mensal Disponível',
    description: 'Seu aporte programado de R$ 1.000 está pronto para ser investido',
    action: 'Investir',
    priority: 'medium'
  }
];

export function SmartAlertsWidget() {
  const [alerts, setAlerts] = useState<Alert[]>(defaultAlerts);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'opportunity':
        return TrendingUp;
      case 'warning':
        return AlertTriangle;
      case 'goal':
        return Target;
      case 'info':
        return DollarSign;
      default:
        return Bell;
    }
  };

  const getColor = (type: Alert['type']) => {
    switch (type) {
      case 'opportunity':
        return 'text-[#2D7A75]';
      case 'warning':
        return 'text-[#EF4444]';
      case 'goal':
        return 'text-[#D4AF37]';
      case 'info':
        return 'text-[#3B82F6]';
      default:
        return 'text-[#94A3B8]';
    }
  };

  const getPriorityBadge = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30 text-xs">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 text-xs">Média</Badge>;
      case 'low':
        return <Badge className="bg-[#64748B]/20 text-[#94A3B8] border-[#64748B]/30 text-xs">Baixa</Badge>;
    }
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-[#2D7A75]" />
        <h3 className="text-[#E8EBF0]">Alertas Inteligentes</h3>
        <Badge className="bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30 text-xs ml-auto">
          {alerts.length}
        </Badge>
      </div>

      <AnimatePresence>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = getIcon(alert.type);
            const color = getColor(alert.type);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-[#252B3A] rounded-lg p-4 relative group">
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="absolute top-2 right-2 text-[#64748B] hover:text-[#E8EBF0] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-[#1A1F2E] flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[#E8EBF0] text-sm">{alert.title}</p>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      <p className="text-[#94A3B8] text-xs leading-relaxed">
                        {alert.description}
                      </p>
                    </div>
                  </div>

                  {alert.action && (
                    <Button
                      size="sm"
                      onClick={() => {
                        const messages = {
                          opportunity: '📈 Abrindo detalhes da oportunidade...',
                          warning: '⚠️ Analisando volatilidade do portfólio...',
                          goal: '🎯 Carregando detalhes da meta...',
                          info: '💰 Preparando opções de investimento...'
                        };
                        toast.success(messages[alert.type] || 'Processando ação...');
                      }}
                      className="w-full mt-3 bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
                    >
                      {alert.action}
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      <Button
        variant="outline"
        onClick={() => toast.success('📋 Carregando todos os alertas...')}
        className="w-full mt-4 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F] h-9 sm:h-10 md:h-11 text-sm sm:text-base"
      >
        Ver Todos os Alertas
      </Button>
    </Card>
  );
}
