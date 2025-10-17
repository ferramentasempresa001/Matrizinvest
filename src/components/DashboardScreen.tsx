import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, DollarSign, Eye, EyeOff, Building2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { useState } from 'react';

const performanceData = [
  { day: '10/10', value: 48200 },
  { day: '11/10', value: 51500 },
  { day: '12/10', value: 53800 },
  { day: '13/10', value: 55100 },
  { day: '14/10', value: 56700 },
  { day: '15/10', value: 57850 },
  { day: '16/10', value: 58920 },
  { day: '17/10', value: 59950 },
];

const investments = [
  { id: 1, type: 'Renda Fixa', name: 'CDB Banco XYZ', amount: 15000, return: 8.5 },
  { id: 2, type: 'Ações', name: 'Portfolio Diversificado', amount: 22000, return: 15.2 },
  { id: 3, type: 'Cripto', name: 'Bitcoin & Ethereum', amount: 8500, return: 22.8 },
  { id: 4, type: 'Fundos', name: 'Fundo Multimercado', amount: 4500, return: 6.3 },
];

export function DashboardScreen() {
  const [showBalance, setShowBalance] = useState(true);
  
  const totalBalance = 59950.00;
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalProfit = totalBalance - totalInvested;
  const profitPercentage = ((totalProfit / totalInvested) * 100).toFixed(1);

  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 sticky top-0 z-10 border-b border-[#2A3F5F]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#94A3B8] text-sm">Bem-vindo(a), Usuário</p>
            <h2 className="text-[#E8EBF0]">Acompanhe sua Performance</h2>
          </div>
          <div className="w-10 h-10 bg-[#2A3F5F] rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#2D7A75]" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Patrimônio Consolidado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#2D7A75]" />
                <p className="text-[#94A3B8] text-sm">Patrimônio Consolidado</p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-[#64748B] hover:text-[#94A3B8] transition-colors"
              >
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <h3 className="text-[#E8EBF0] text-3xl mb-3">
              {showBalance ? `R$ ${totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ •••••••'}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <Badge className="bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +{profitPercentage}%
              </Badge>
              <span className="text-[#94A3B8]">Performance Mensal</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#2A3F5F]">
              <div>
                <p className="text-[#64748B] text-xs mb-1">Total Investido</p>
                <p className="text-[#E8EBF0]">R$ {totalInvested.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-[#64748B] text-xs mb-1">Retorno no Período</p>
                <p className="text-[#2D7A75]">+R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Status de Desenvolvimento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-[#E8EBF0]">Evolução do Investidor</h3>
                <p className="text-[#64748B] text-sm">Nível de Expertise: 12</p>
              </div>
              <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
                2.450 / 3.500 XP
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-[#252B3A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2D7A75] rounded-full"
                  style={{ width: `${(2450 / 3500) * 100}%` }}
                />
              </div>
              <p className="text-[#64748B] text-xs text-right">
                Faltam 1.050 pontos para o próximo nível
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Desempenho Detalhado do Portfólio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
            <div className="mb-4">
              <h3 className="text-[#E8EBF0] mb-1">Desempenho Detalhado do Portfólio</h3>
              <p className="text-[#64748B] text-sm">Visualização da performance histórica</p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D7A75" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2D7A75" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A3F5F" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
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
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Investimentos Ativos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4">
            <h3 className="text-[#E8EBF0] mb-1">Investimentos Ativos</h3>
            <p className="text-[#64748B] text-sm">Distribuição por categoria</p>
          </div>
          <div className="space-y-3">
            {investments.map((investment) => (
              <Card key={investment.id} className="bg-[#1A1F2E] border-[#2A3F5F] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-[#2A3F5F] text-[#E8EBF0] text-xs">
                        {investment.type}
                      </Badge>
                    </div>
                    <p className="text-[#E8EBF0] text-sm">{investment.name}</p>
                    <p className="text-[#64748B] text-xs mt-1">
                      R$ {investment.amount.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${investment.return > 0 ? 'text-[#2D7A75]' : 'text-[#EF4444]'}`}>
                      {investment.return > 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {investment.return > 0 ? '+' : ''}{investment.return}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-auto py-4 flex flex-col gap-2 bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] border-0">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Novo Investimento</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-[#1A1F2E] hover:bg-[#252B3A] text-[#E8EBF0] border-[#2A3F5F]">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm">Relatórios</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
