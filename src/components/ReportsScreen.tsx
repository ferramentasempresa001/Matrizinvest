import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart3, TrendingUp, Calendar, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { useState } from 'react';

const performanceData = {
  today: { profit: 245.80, percentage: 2.1, comparison: '85% dos investidores' },
  yesterday: { profit: 189.50, percentage: 1.6, comparison: '78% dos investidores' },
  week: { profit: 1250.00, percentage: 8.5, comparison: '92% dos investidores' },
};

const chartData = [
  { date: '10/10', value: 48200 },
  { date: '11/10', value: 51500 },
  { date: '12/10', value: 53800 },
  { date: '13/10', value: 55100 },
  { date: '14/10', value: 56700 },
  { date: '15/10', value: 57850 },
  { date: '16/10', value: 58920 },
  { date: '17/10', value: 59950 },
];

const transactions = [
  { id: 1, type: 'Investimento', asset: 'CDB Premium', amount: 5000, date: '17/10/2025', status: 'Concluído', isProfit: false },
  { id: 2, type: 'Rendimento', asset: 'Portfolio Dividendos', amount: 245.80, date: '17/10/2025', status: 'Creditado', isProfit: true },
  { id: 3, type: 'Investimento', asset: 'Bitcoin', amount: 1500, date: '16/10/2025', status: 'Concluído', isProfit: false },
  { id: 4, type: 'Rendimento', asset: 'Fundo Multimercado', amount: 82.50, date: '15/10/2025', status: 'Creditado', isProfit: true },
  { id: 5, type: 'Saque', asset: 'Conta Corrente', amount: 2000, date: '14/10/2025', status: 'Processado', isProfit: false },
];

type TimeFilter = 'today' | 'yesterday' | 'week';

export function ReportsScreen() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');

  const currentData = performanceData[timeFilter];

  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 sticky top-0 z-10 border-b border-[#2A3F5F]">
        <div className="flex items-center gap-2">
          <h2 className="text-[#E8EBF0]">Relatórios de Performance</h2>
          <BarChart3 className="w-5 h-5 text-[#2D7A75]" />
        </div>
        <p className="text-[#94A3B8] text-sm">Análise detalhada de investimentos</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Filtro de Período */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={timeFilter === 'today' ? 'default' : 'outline'}
            onClick={() => setTimeFilter('today')}
            className={timeFilter === 'today' ? 'bg-[#2D7A75] text-[#E8EBF0]' : 'bg-[#1A1F2E] border-[#2A3F5F] text-[#94A3B8]'}
          >
            Hoje
          </Button>
          <Button
            size="sm"
            variant={timeFilter === 'yesterday' ? 'default' : 'outline'}
            onClick={() => setTimeFilter('yesterday')}
            className={timeFilter === 'yesterday' ? 'bg-[#2D7A75] text-[#E8EBF0]' : 'bg-[#1A1F2E] border-[#2A3F5F] text-[#94A3B8]'}
          >
            Ontem
          </Button>
          <Button
            size="sm"
            variant={timeFilter === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeFilter('week')}
            className={timeFilter === 'week' ? 'bg-[#2D7A75] text-[#E8EBF0]' : 'bg-[#1A1F2E] border-[#2A3F5F] text-[#94A3B8]'}
          >
            7 Dias
          </Button>
        </div>

        {/* Card de Performance */}
        <motion.div
          key={timeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[#E8EBF0]">
                <Calendar className="w-4 h-4 text-[#2D7A75]" />
                <span className="text-sm">
                  {timeFilter === 'today' ? 'Desempenho de Hoje' : timeFilter === 'yesterday' ? 'Desempenho de Ontem' : 'Últimos 7 Dias'}
                </span>
              </div>
              <Badge className="bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +{currentData.percentage}%
              </Badge>
            </div>
            
            <h3 className="text-[#E8EBF0] text-2xl mb-2">
              +R$ {currentData.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <TrendingUp className="w-4 h-4 text-[#2D7A75]" />
              <span>Rendimento superior a {currentData.comparison}</span>
            </div>
          </Card>
        </motion.div>

        {/* Gráfico de Performance */}
        <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
          <h3 className="text-[#E8EBF0] mb-4">Evolução Patrimonial</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3F5F" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1F2E',
                    border: '1px solid #2A3F5F',
                    borderRadius: '8px',
                    color: '#E8EBF0'
                  }}
                />
                <Bar dataKey="value" fill="#2D7A75" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Histórico de Movimentações */}
        <div>
          <h3 className="text-[#E8EBF0] mb-3 text-sm">Histórico de Movimentações</h3>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="bg-[#1A1F2E] border-[#2A3F5F] p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      transaction.isProfit ? 'bg-[#2D7A75]/20' : 'bg-[#2A3F5F]'
                    }`}>
                      {transaction.isProfit ? (
                        <ArrowUpRight className="w-5 h-5 text-[#2D7A75]" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-[#64748B]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[#E8EBF0] text-sm">{transaction.type}</h4>
                        <Badge className="bg-[#2A3F5F] text-[#94A3B8] text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-[#64748B] text-xs mb-1">{transaction.asset}</p>
                      <p className="text-[#64748B] text-xs">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      transaction.isProfit ? 'text-[#2D7A75]' : 'text-[#E8EBF0]'
                    }`}>
                      {transaction.isProfit ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Ações */}
        <Button className="w-full bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] h-12">
          <DollarSign className="w-4 h-4 mr-2" />
          Exportar Relatório Completo
        </Button>
      </div>
    </div>
  );
}
