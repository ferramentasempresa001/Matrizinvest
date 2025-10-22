import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, Target, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Recommendation {
  id: number;
  icon: any;
  title: string;
  description: string;
  category: 'diversification' | 'risk' | 'opportunity' | 'goal';
  impact: 'high' | 'medium' | 'low';
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    icon: Shield,
    title: 'Diversifique seu Portfólio',
    description: 'Você está 65% exposto em Renda Variável. Considere balancear com Renda Fixa.',
    category: 'risk',
    impact: 'high'
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Oportunidade de Crescimento',
    description: 'Fundos Imobiliários estão em alta. Seu perfil combina com FIIs de papel.',
    category: 'opportunity',
    impact: 'medium'
  },
  {
    id: 3,
    icon: Target,
    title: 'Meta Próxima',
    description: 'Aumente seu aporte em R$ 500/mês para alcançar sua meta 6 meses antes.',
    category: 'goal',
    impact: 'high'
  }
];

export function RecommendationsWidget() {
  const getImpactColor = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30';
      case 'medium':
        return 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30';
      case 'low':
        return 'bg-[#64748B]/20 text-[#94A3B8] border-[#64748B]/30';
    }
  };

  return (
    <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#2D7A75]" />
        <h3 className="text-[#E8EBF0]">Recomendações Personalizadas</h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#252B3A] rounded-lg p-4 cursor-pointer hover:bg-[#2A3F5F] transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1A1F2E] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#2D7A75]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-[#E8EBF0] text-sm">{rec.title}</p>
                    <Badge className={`text-xs ${getImpactColor(rec.impact)}`}>
                      {rec.impact === 'high' ? 'Alto' : rec.impact === 'medium' ? 'Médio' : 'Baixo'} Impacto
                    </Badge>
                  </div>
                  <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">
                    {rec.description}
                  </p>
                  <Button
                    size="sm"
                    className="bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] h-8 text-xs gap-1 sm:gap-2 px-2 sm:px-3"
                  >
                    <span className="hidden xs:inline sm:inline">Ver Ação Sugerida</span>
                    <span className="inline xs:hidden sm:hidden">Ver Ação</span>
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-[#2D7A75]/10 border border-[#2D7A75]/30 rounded-lg">
        <p className="text-[#94A3B8] text-xs leading-relaxed">
          <strong className="text-[#E8EBF0]">IA Personalizada:</strong> Nossas recomendações são baseadas em seu perfil de investidor, objetivos financeiros e tendências de mercado.
        </p>
      </div>
    </Card>
  );
}
