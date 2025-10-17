import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { TrendingUp, DollarSign, Bitcoin, Building2, PieChart as PieChartIcon, Shield, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

const investmentOptions = {
  'renda-fixa': [
    { id: 1, name: 'CDB Premium 100% CDI', rate: 12.5, risk: 'Baixo', minAmount: 500, duration: '12 meses', icon: Shield },
    { id: 2, name: 'LCI Isento IR', rate: 10.8, risk: 'Baixo', minAmount: 1000, duration: '24 meses', icon: Building2 },
    { id: 3, name: 'Tesouro Selic 2027', rate: 11.2, risk: 'Muito Baixo', minAmount: 100, duration: '36 meses', icon: Shield },
  ],
  'acoes': [
    { id: 4, name: 'Portfolio Dividendos', rate: 18.5, risk: 'Médio', minAmount: 500, duration: 'Flexível', icon: TrendingUp },
    { id: 5, name: 'Tech Growth Brasil', rate: 25.3, risk: 'Alto', minAmount: 1000, duration: 'Flexível', icon: Zap },
    { id: 6, name: 'Blue Chips Estáveis', rate: 15.7, risk: 'Médio', minAmount: 500, duration: 'Flexível', icon: Building2 },
  ],
  'cripto': [
    { id: 7, name: 'Bitcoin (BTC)', rate: 45.2, risk: 'Muito Alto', minAmount: 100, duration: 'Flexível', icon: Bitcoin },
    { id: 8, name: 'Ethereum (ETH)', rate: 38.5, risk: 'Muito Alto', minAmount: 100, duration: 'Flexível', icon: Bitcoin },
    { id: 9, name: 'Crypto Index Fund', rate: 32.8, risk: 'Alto', minAmount: 250, duration: 'Flexível', icon: PieChartIcon },
  ],
  'fundos': [
    { id: 10, name: 'Fundo Multimercado Premium', rate: 14.2, risk: 'Médio', minAmount: 1000, duration: '12 meses', icon: PieChartIcon },
    { id: 11, name: 'Fundo Imobiliário FII', rate: 9.8, risk: 'Baixo', minAmount: 500, duration: 'Flexível', icon: Building2 },
    { id: 12, name: 'Fundo de Ações Agressivo', rate: 22.5, risk: 'Alto', minAmount: 2000, duration: '24 meses', icon: TrendingUp },
  ],
};

export function FinanceScreen() {
  const [investmentAmount, setInvestmentAmount] = useState('1000');
  const [selectedCategory, setSelectedCategory] = useState('renda-fixa');
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [showSimulation, setShowSimulation] = useState(false);

  const handleSimulate = (option: any) => {
    if (!investmentAmount || Number(investmentAmount) < option.minAmount) {
      toast.error(`Valor mínimo: R$ ${option.minAmount}`);
      return;
    }

    setSelectedOption(option);
    setShowSimulation(true);
    toast.success('Projeção calculada com sucesso');
  };

  const calculateProjection = () => {
    if (!selectedOption) return [
      { month: 'Hoje', value: 0 },
      { month: '3m', value: 0 },
      { month: '6m', value: 0 },
      { month: '9m', value: 0 },
      { month: '12m', value: 0 },
    ];
    
    const amount = Number(investmentAmount);
    const monthlyRate = selectedOption.rate / 100 / 12;
    
    return [
      { month: 'Hoje', value: amount },
      { month: '3m', value: amount * Math.pow(1 + monthlyRate, 3) },
      { month: '6m', value: amount * Math.pow(1 + monthlyRate, 6) },
      { month: '9m', value: amount * Math.pow(1 + monthlyRate, 9) },
      { month: '12m', value: amount * Math.pow(1 + monthlyRate, 12) },
    ];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Muito Baixo':
      case 'Baixo':
        return 'bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30';
      case 'Médio':
        return 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30';
      case 'Alto':
      case 'Muito Alto':
        return 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30';
      default:
        return 'bg-[#64748B]/20 text-[#94A3B8] border-[#64748B]/30';
    }
  };

  const projectionData = calculateProjection();
  const finalValue = projectionData[projectionData.length - 1].value;
  const profit = finalValue - Number(investmentAmount);

  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 sticky top-0 z-10 border-b border-[#2A3F5F]">
        <div className="flex items-center gap-2">
          <h2 className="text-[#E8EBF0]">Simulador de Projeção de Investimentos</h2>
          <TrendingUp className="w-5 h-5 text-[#2D7A75]" />
        </div>
        <p className="text-[#94A3B8] text-sm">Calcule o potencial de crescimento dos seus aportes</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input de Valor */}
        <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
          <Label className="text-[#E8EBF0] mb-3 block flex items-center gap-2">
            Valor Inicial (R$)
            <DollarSign className="w-4 h-4 text-[#2D7A75]" />
          </Label>
          <Input
            type="number"
            placeholder="1000"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] text-lg h-12"
          />
        </Card>

        {/* Categorias de Investimento */}
        <Tabs defaultValue="renda-fixa" className="w-full" onValueChange={(v) => setSelectedCategory(v)}>
          <TabsList className="grid w-full grid-cols-4 bg-[#1A1F2E] border border-[#2A3F5F]">
            <TabsTrigger value="renda-fixa" className="data-[state=active]:bg-[#2D7A75] data-[state=active]:text-[#E8EBF0]">
              Renda Fixa
            </TabsTrigger>
            <TabsTrigger value="acoes" className="data-[state=active]:bg-[#2D7A75] data-[state=active]:text-[#E8EBF0]">
              Ações
            </TabsTrigger>
            <TabsTrigger value="cripto" className="data-[state=active]:bg-[#2D7A75] data-[state=active]:text-[#E8EBF0]">
              Cripto
            </TabsTrigger>
            <TabsTrigger value="fundos" className="data-[state=active]:bg-[#2D7A75] data-[state=active]:text-[#E8EBF0]">
              Fundos
            </TabsTrigger>
          </TabsList>

          {Object.entries(investmentOptions).map(([key, options]) => (
            <TabsContent key={key} value={key} className="space-y-3 mt-4">
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <Card key={option.id} className="bg-[#1A1F2E] border-[#2A3F5F] p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-[#2A3F5F] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#2D7A75]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[#E8EBF0] mb-1">{option.name}</h4>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge className="bg-[#2A3F5F] text-[#E8EBF0] text-xs">
                              {option.rate}% a.a.
                            </Badge>
                            <Badge className={`text-xs ${getRiskColor(option.risk)}`}>
                              Risco: {option.risk}
                            </Badge>
                          </div>
                          <p className="text-[#64748B] text-xs">
                            Mín: R$ {option.minAmount} • Prazo: {option.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSimulate(option)}
                      className="w-full bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0]"
                    >
                      Gerar Projeção
                    </Button>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>

        {/* Resultado da Simulação */}
        <AnimatePresence>
          {showSimulation && selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-[#1A1F2E] border-[#2D7A75]/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#2D7A75]" />
                  <h3 className="text-[#E8EBF0]">Projeção de Retorno</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-[#64748B] text-xs mb-1">Investimento</p>
                    <p className="text-[#E8EBF0]">R$ {Number(investmentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] text-xs mb-1">Retorno em 12 meses</p>
                    <p className="text-[#2D7A75]">+R$ {profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] text-xs mb-1">Total Acumulado</p>
                    <p className="text-[#E8EBF0]">R$ {finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] text-xs mb-1">Rentabilidade</p>
                    <p className="text-[#2D7A75]">{selectedOption.rate}% a.a.</p>
                  </div>
                </div>

                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData}>
                      <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2D7A75" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2D7A75" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2A3F5F" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1A1F2E',
                          border: '1px solid #2A3F5F',
                          borderRadius: '8px',
                          color: '#E8EBF0'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#2D7A75"
                        strokeWidth={2}
                        fill="url(#colorProfit)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0]">
                    Confirmar Investimento
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSimulation(false)}
                    className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
                  >
                    Nova Simulação
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
