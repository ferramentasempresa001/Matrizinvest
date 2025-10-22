import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { BarChart3, TrendingUp, Calendar, DollarSign, ArrowUpRight, ArrowDownRight, Loader2, Save, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { useState } from 'react';

const performanceData = {
  today: { profit: 1850.00, percentage: 3.2, comparison: '85% dos investidores' },
  yesterday: { profit: 2150.00, percentage: 3.7, comparison: '78% dos investidores' },
  week: { profit: 11750.00, percentage: 24.5, comparison: '92% dos investidores' },
};

const chartData = [
  { date: '10/10', value: 15000 },
  { date: '11/10', value: 22800 },
  { date: '12/10', value: 31500 },
  { date: '13/10', value: 38200 },
  { date: '14/10', value: 44300 },
  { date: '15/10', value: 49600 },
  { date: '16/10', value: 54100 },
  { date: '17/10', value: 59950 },
];

const transactions = [
  { id: 1, type: 'Saque', asset: 'Conta Corrente', amount: 3500, date: '18/10/2025', status: 'Concluído', isProfit: false },
  { id: 2, type: 'Investimento', asset: 'CDB Premium', amount: 5000, date: '17/10/2025', status: 'Concluído', isProfit: false },
  { id: 3, type: 'Rendimento', asset: 'Portfolio Dividendos', amount: 245.80, date: '17/10/2025', status: 'Creditado', isProfit: true },
  { id: 4, type: 'Investimento', asset: 'Bitcoin', amount: 1500, date: '16/10/2025', status: 'Concluído', isProfit: false },
  { id: 5, type: 'Rendimento', asset: 'Fundo Multimercado', amount: 82.50, date: '15/10/2025', status: 'Creditado', isProfit: true },
  { id: 6, type: 'Saque', asset: 'Conta Corrente', amount: 2000, date: '14/10/2025', status: 'Processado', isProfit: false },
];

type TimeFilter = 'today' | 'yesterday' | 'week';

export function ReportsScreen() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Editable performance data
  const [editPerformanceData, setEditPerformanceData] = useState(performanceData);

  const currentData = editPerformanceData[timeFilter];

  // Handle icon click to activate edit mode
  const handleIconClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditPerformanceData(performanceData);
    setIsEditMode(false);
  };

  const updatePeriodData = (period: TimeFilter, field: 'profit' | 'percentage' | 'comparison', value: string) => {
    setEditPerformanceData(prev => ({
      ...prev,
      [period]: {
        ...prev[period],
        [field]: field === 'comparison' ? value : parseFloat(value) || 0
      }
    }));
  };

  const handleExportReport = async () => {
    setIsDownloading(true);
    // Simula o processo de download/geração do relatório
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsDownloading(false);
  };

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
        {/* Edit Mode Controls */}
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2D7A75]/10 border border-[#2D7A75]/30 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#E8EBF0]">Modo de Edição Ativo</p>
                <p className="text-[#94A3B8] text-xs mt-1">Edite os valores de desempenho para cada período</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-[#1A1F2E] hover:bg-[#252B3A] text-[#E8EBF0] border-[#2A3F5F] gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-[#2D7A75] hover:bg-[#2D7A75]/80 text-[#E8EBF0] gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filtro de Período */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <Button
            size="sm"
            variant={timeFilter === 'today' ? 'default' : 'outline'}
            onClick={() => setTimeFilter('today')}
            className={`flex-shrink-0 h-8 sm:h-9 px-3 sm:px-4 ${timeFilter === 'today' ? 'bg-[#2D7A75] text-[#E8EBF0]' : 'bg-[#1A1F2E] border-[#2A3F5F] text-[#94A3B8]'}`}
          >
            Hoje
          </Button>
          <Button
            size="sm"
            variant={timeFilter === 'yesterday' ? 'default' : 'outline'}
            onClick={() => setTimeFilter('yesterday')}
            className={`flex-shrink-0 h-8 sm:h-9 px-3 sm:px-4 ${timeFilter === 'yesterday' ? 'bg-[#2D7A75] text-[#E8EBF0]' : 'bg-[#1A1F2E] border-[#2A3F5F] text-[#94A3B8]'}`}
          >
            Ontem
          </Button>
          <Button
            size="sm"
            variant={timeFilter === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeFilter('week')}
            className={`flex-shrink-0 h-8 sm:h-9 px-3 sm:px-4 ${timeFilter === 'week' ? 'bg-[#2D7A75] text-[#E8EBF0]' : 'bg-[#1A1F2E] border-[#2A3F5F] text-[#94A3B8]'}`}
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
                <button
                  onClick={handleIconClick}
                  className="text-[#2D7A75] hover:text-[#2D7A75]/80 transition-colors cursor-pointer"
                  title="Clique para editar valores"
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <span className="text-sm">
                  {timeFilter === 'today' ? 'Desempenho de Hoje' : timeFilter === 'yesterday' ? 'Desempenho de Ontem' : 'Últimos 7 Dias'}
                </span>
              </div>
              {isEditMode ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#94A3B8] text-xs">%</span>
                  <Input
                    type="number"
                    step="0.1"
                    value={currentData.percentage}
                    onChange={(e) => updatePeriodData(timeFilter, 'percentage', e.target.value)}
                    className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] w-20 h-8 text-sm"
                  />
                </div>
              ) : (
                <Badge className="bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +{currentData.percentage}%
                </Badge>
              )}
            </div>
            
            {isEditMode ? (
              <div className="mb-2">
                <label className="text-[#64748B] text-xs mb-1 block">Lucro no Período (R$)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={currentData.profit}
                  onChange={(e) => updatePeriodData(timeFilter, 'profit', e.target.value)}
                  className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] text-xl h-12"
                />
              </div>
            ) : (
              <h3 className="text-[#E8EBF0] text-2xl mb-2">
                +R$ {currentData.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            )}
            
            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <TrendingUp className="w-4 h-4 text-[#2D7A75]" />
              {isEditMode ? (
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs">Superior a</span>
                  <Input
                    type="text"
                    value={currentData.comparison}
                    onChange={(e) => updatePeriodData(timeFilter, 'comparison', e.target.value)}
                    className="bg-[#252B3A] border-[#2A3F5F] text-[#94A3B8] flex-1 h-8 text-sm"
                    placeholder="ex: 85% dos investidores"
                  />
                </div>
              ) : (
                <span>Rendimento superior a {currentData.comparison}</span>
              )}
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
                        <Badge className={`text-xs ${
                          transaction.status === 'Concluído' 
                            ? 'bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30' 
                            : 'bg-[#2A3F5F] text-[#94A3B8]'
                        }`}>
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
        <Button 
          onClick={handleExportReport}
          disabled={isDownloading}
          className="w-full bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] h-11 sm:h-12 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span className="text-sm sm:text-base">Baixando...</span>
            </>
          ) : (
            <>
              <DollarSign className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Exportar Relatório Completo</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}