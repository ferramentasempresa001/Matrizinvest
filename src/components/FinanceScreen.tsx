import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, DollarSign, Bitcoin, Building2, PieChart as PieChartIcon, Shield, Zap, Calculator, Calendar, Percent, PiggyBank, ArrowDownToLine, ArrowLeftRight, Wallet, CreditCard, X, Check, Send, Plus, CircleDollarSign } from 'lucide-react@0.487.0';
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

const cryptoPrices = {
  'Bitcoin': { price: 285400.50, symbol: 'BTC', fee: 0.5 },
  'Ethereum': { price: 12850.30, symbol: 'ETH', fee: 0.3 },
  'USDT': { price: 5.45, symbol: 'USDT', fee: 0.1 },
};

export function FinanceScreen() {
  const [mainTab, setMainTab] = useState('portfolio');
  
  // Refs para scroll suave aos cards
  const saqueRef = useRef<HTMLDivElement>(null);
  const investirRef = useRef<HTMLDivElement>(null);
  const transferirRef = useRef<HTMLDivElement>(null);
  const adicionarRef = useRef<HTMLDivElement>(null);
  const comprarCriptoRef = useRef<HTMLDivElement>(null);
  const venderCriptoRef = useRef<HTMLDivElement>(null);
  const transferirCriptoRef = useRef<HTMLDivElement>(null);
  
  // Portfolio state
  const [investmentAmount, setInvestmentAmount] = useState('1000');
  const [selectedCategory, setSelectedCategory] = useState('renda-fixa');
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [showSimulation, setShowSimulation] = useState(false);

  // Simulator state
  const [valorInicial, setValorInicial] = useState<string>('10000');
  const [aporteMensal, setAporteMensal] = useState<string>('1000');
  const [taxaMensal, setTaxaMensal] = useState<string>('0.80');
  const [periodoMeses, setPeriodoMeses] = useState<string>('24');
  const [resultado, setResultado] = useState<{
    valorFinal: number;
    totalAportado: number;
    totalJuros: number;
    dados: Array<{ mes: number; valor: number; aportes: number }>;
  } | null>(null);

  // Quick Actions state
  const [saqueValue, setSaqueValue] = useState('');
  const [investirValue, setInvestirValue] = useState('');
  const [transferirValue, setTransferirValue] = useState('');
  const [adicionarValue, setAdicionarValue] = useState('');

  // Modal states
  const [showSaqueModal, setShowSaqueModal] = useState(false);
  const [showInvestirModal, setShowInvestirModal] = useState(false);
  const [showTransferirModal, setShowTransferirModal] = useState(false);
  const [showAdicionarModal, setShowAdicionarModal] = useState(false);
  const [showComprarCriptoModal, setShowComprarCriptoModal] = useState(false);
  const [showVenderCriptoModal, setShowVenderCriptoModal] = useState(false);
  const [showTransferirCriptoModal, setShowTransferirCriptoModal] = useState(false);

  // Transaction type states
  const [saqueType, setSaqueType] = useState('pix');
  const [investirType, setInvestirType] = useState('cdb');
  const [transferirType, setTransferirType] = useState('pix');
  const [adicionarType, setAdicionarType] = useState('pix');

  // Crypto states
  const [comprarCriptoValue, setComprarCriptoValue] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('Bitcoin');
  const [venderCriptoValue, setVenderCriptoValue] = useState('');
  const [venderCryptoType, setVenderCryptoType] = useState('Bitcoin');
  const [transferirCriptoValue, setTransferirCriptoValue] = useState('');
  const [transferirCriptoType, setTransferirCriptoType] = useState('Bitcoin');
  const [walletAddress, setWalletAddress] = useState('');

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

  const calcularProjecao = () => {
    const vi = parseFloat(valorInicial) || 0;
    const pmt = parseFloat(aporteMensal) || 0;
    const taxa = (parseFloat(taxaMensal) || 0) / 100;
    const n = parseInt(periodoMeses) || 0;

    if (n <= 0 || taxa < 0) {
      return;
    }

    const dados: Array<{ mes: number; valor: number; aportes: number }> = [];
    let valorAtual = vi;
    let totalAportes = vi;

    dados.push({ mes: 0, valor: vi, aportes: vi });

    for (let mes = 1; mes <= n; mes++) {
      valorAtual = valorAtual * (1 + taxa) + pmt;
      totalAportes += pmt;
      dados.push({ 
        mes, 
        valor: valorAtual,
        aportes: totalAportes
      });
    }

    const valorFinal = valorAtual;
    const totalJuros = valorFinal - totalAportes;

    setResultado({
      valorFinal,
      totalAportado: totalAportes,
      totalJuros,
      dados
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para scroll suave até um card específico
  const scrollToCard = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Quick Actions handlers
  const handleSaque = () => {
    const valor = parseFloat(saqueValue);
    if (!saqueValue || isNaN(valor) || valor <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }
    setShowSaqueModal(true);
  };

  const confirmSaque = () => {
    const valor = parseFloat(saqueValue);
    const typeText = saqueType === 'pix' ? 'Pix' : 'Transferência';
    toast.success(`Saque via ${typeText} confirmado com sucesso!`, {
      description: `${formatCurrency(valor)} será processado em até ${saqueType === 'pix' ? '1 dia útil' : '2 dias úteis'}`
    });
    setSaqueValue('');
    setShowSaqueModal(false);
  };

  const handleInvestir = () => {
    const valor = parseFloat(investirValue);
    if (!investirValue || isNaN(valor) || valor <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }
    setShowInvestirModal(true);
  };

  const confirmInvestir = () => {
    const valor = parseFloat(investirValue);
    const typeNames = {
      cdb: 'CDB',
      fundos: 'Fundos',
      'renda-variavel': 'Renda Variável'
    };
    const rentabilidade = investirType === 'cdb' ? 12 : investirType === 'fundos' ? 10 : 15;
    toast.success('Investimento realizado com sucesso!', {
      description: `${formatCurrency(valor)} aplicado em ${typeNames[investirType as keyof typeof typeNames]}`
    });
    setInvestirValue('');
    setShowInvestirModal(false);
  };

  const handleTransferir = () => {
    const valor = parseFloat(transferirValue);
    if (!transferirValue || isNaN(valor) || valor <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }
    setShowTransferirModal(true);
  };

  const confirmTransferir = () => {
    const valor = parseFloat(transferirValue);
    const typeText = transferirType === 'pix' ? 'Pix' : transferirType === 'ted' ? 'TED' : 'Transferência Interna';
    const prazo = transferirType === 'pix' ? 'instantâneo' : transferirType === 'ted' ? 'até 1 dia útil' : 'imediato';
    toast.success('Transferência confirmada com sucesso!', {
      description: `${formatCurrency(valor)} via ${typeText} • Prazo: ${prazo}`
    });
    setTransferirValue('');
    setShowTransferirModal(false);
  };

  const handleAdicionar = () => {
    const valor = parseFloat(adicionarValue);
    if (!adicionarValue || isNaN(valor) || valor <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }
    setShowAdicionarModal(true);
  };

  const confirmAdicionar = () => {
    const valor = parseFloat(adicionarValue);
    const typeText = adicionarType === 'pix' ? 'Pix' : adicionarType === 'boleto' ? 'Boleto' : 'Transferência';
    toast.success('Depósito confirmado com sucesso!', {
      description: `${formatCurrency(valor)} via ${typeText} • Prazo: até 24h`
    });
    setAdicionarValue('');
    setShowAdicionarModal(false);
  };

  // Crypto handlers
  const handleComprarCripto = () => {
    const valor = parseFloat(comprarCriptoValue);
    if (!comprarCriptoValue || isNaN(valor) || valor <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }
    setShowComprarCriptoModal(true);
  };

  const confirmComprarCripto = () => {
    const valor = parseFloat(comprarCriptoValue);
    const crypto = cryptoPrices[selectedCrypto as keyof typeof cryptoPrices];
    const quantidade = valor / crypto.price;
    const taxa = valor * (crypto.fee / 100);
    
    toast.success(`Compra de ${selectedCrypto} realizada com sucesso!`, {
      description: `${quantidade.toFixed(8)} ${crypto.symbol} • Taxa: ${formatCurrency(taxa)}`
    });
    setComprarCriptoValue('');
    setShowComprarCriptoModal(false);
  };

  const handleVenderCripto = () => {
    const valor = parseFloat(venderCriptoValue);
    if (!venderCriptoValue || isNaN(valor) || valor <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }
    setShowVenderCriptoModal(true);
  };

  const confirmVenderCripto = () => {
    const valor = parseFloat(venderCriptoValue);
    const crypto = cryptoPrices[venderCryptoType as keyof typeof cryptoPrices];
    const valorReais = valor * crypto.price;
    const taxa = valorReais * (crypto.fee / 100);
    const valorLiquido = valorReais - taxa;
    
    toast.success('Venda concluída com sucesso!', {
      description: `Valor creditado: ${formatCurrency(valorLiquido)}`
    });
    setVenderCriptoValue('');
    setShowVenderCriptoModal(false);
  };

  const handleTransferirCripto = () => {
    const valor = parseFloat(transferirCriptoValue);
    if (!transferirCriptoValue || isNaN(valor) || valor <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }
    if (!walletAddress || walletAddress.length < 20) {
      toast.error('Por favor, insira um endereço de carteira válido');
      return;
    }
    setShowTransferirCriptoModal(true);
  };

  const confirmTransferirCripto = () => {
    const valor = parseFloat(transferirCriptoValue);
    const crypto = cryptoPrices[transferirCriptoType as keyof typeof cryptoPrices];
    
    toast.success(`Transferência de ${transferirCriptoType} enviada com sucesso!`, {
      description: `${valor} ${crypto.symbol} para ${walletAddress.slice(0, 10)}...`
    });
    setTransferirCriptoValue('');
    setWalletAddress('');
    setShowTransferirCriptoModal(false);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1F2E] border border-[#2A3F5F] p-3 rounded-lg shadow-lg">
          <p className="text-[#94A3B8] text-sm mb-1">Mês {payload[0].payload.mes}</p>
          <p className="text-[#2D7A75]">
            Valor: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-[#64748B] text-sm">
            Aportes: {formatCurrency(payload[0].payload.aportes)}
          </p>
        </div>
      );
    }
    return null;
  };

  const projectionData = calculateProjection();
  const finalValue = projectionData[projectionData.length - 1].value;
  const profit = finalValue - Number(investmentAmount);

  return (
    <div className="min-h-screen bg-[#0F1419]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1A1F2E] to-[#151A26] p-5 sticky top-0 z-10 border-b border-[#2A3F5F]/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D7A75] to-[#1E5F5B] flex items-center justify-center shadow-lg shadow-[#2D7A75]/20">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-[#E8EBF0] leading-tight">Área Financeira</h2>
            <p className="text-[#94A3B8]/90 text-sm leading-tight">Invista e planeje seu futuro</p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#0F1419]/80 backdrop-blur-sm border border-[#2A3F5F]/60 p-2 rounded-2xl shadow-inner gap-2 h-auto">
            <TabsTrigger 
              value="portfolio" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all duration-200 rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50 py-3 px-2 flex flex-col items-center justify-center gap-1.5"
            >
              <PieChartIcon className="w-6 h-6" />
              <span className="text-xs">Portfólio</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transacoes" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all duration-200 rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50 py-3 px-2 flex flex-col items-center justify-center gap-1.5"
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-xs">Transações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="criptos" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all duration-200 rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50 py-3 px-2 flex flex-col items-center justify-center gap-1.5"
            >
              <Bitcoin className="w-6 h-6" />
              <span className="text-xs">Criptos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="simulator" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all duration-200 rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50 py-3 px-2 flex flex-col items-center justify-center gap-1.5"
            >
              <Calculator className="w-6 h-6" />
              <span className="text-xs">Simulador</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="pb-24">
        {mainTab === 'transacoes' && (
          <div className="p-6 space-y-5 bg-gradient-to-b from-[#0F1419] to-[#1A1F2E]/30">
            <div className="mb-6">
              <h3 className="text-[#E8EBF0] mb-1">Ações Rápidas</h3>
              <p className="text-[#94A3B8] text-sm">Gerencie suas transações financeiras</p>
            </div>

            {/* Menu de Navegação Rápida */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToCard(saqueRef)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 border border-[#2A3F5F]/40 rounded-2xl px-5 py-3.5 transition-all hover:border-[#2D7A75]/50 hover:shadow-lg hover:shadow-[#2D7A75]/10 backdrop-blur-sm min-w-[80px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D7A75]/15 to-[#1E5F5B]/10 flex items-center justify-center shadow-inner border border-[#2D7A75]/20">
                  <ArrowDownToLine className="w-5 h-5 text-[#2D7A75]" />
                </div>
                <span className="text-[#E8EBF0] text-xs">Saque</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToCard(investirRef)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 border border-[#2A3F5F]/40 rounded-2xl px-5 py-3.5 transition-all hover:border-[#2D7A75]/50 hover:shadow-lg hover:shadow-[#2D7A75]/10 backdrop-blur-sm min-w-[80px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D7A75]/15 to-[#1E5F5B]/10 flex items-center justify-center shadow-inner border border-[#2D7A75]/20">
                  <TrendingUp className="w-5 h-5 text-[#2D7A75]" />
                </div>
                <span className="text-[#E8EBF0] text-xs">Investir</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToCard(transferirRef)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 border border-[#2A3F5F]/40 rounded-2xl px-5 py-3.5 transition-all hover:border-[#2D7A75]/50 hover:shadow-lg hover:shadow-[#2D7A75]/10 backdrop-blur-sm min-w-[80px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D7A75]/15 to-[#1E5F5B]/10 flex items-center justify-center shadow-inner border border-[#2D7A75]/20">
                  <ArrowLeftRight className="w-5 h-5 text-[#2D7A75]" />
                </div>
                <span className="text-[#E8EBF0] text-xs">Transferir</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToCard(adicionarRef)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 border border-[#2A3F5F]/40 rounded-2xl px-5 py-3.5 transition-all hover:border-[#2D7A75]/50 hover:shadow-lg hover:shadow-[#2D7A75]/10 backdrop-blur-sm min-w-[80px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D7A75]/15 to-[#1E5F5B]/10 flex items-center justify-center shadow-inner border border-[#2D7A75]/20">
                  <Wallet className="w-5 h-5 text-[#2D7A75]" />
                </div>
                <span className="text-[#E8EBF0] text-xs">Adicionar</span>
              </motion.button>
            </div>

            {/* Solicitar Saque */}
            <motion.div
              ref={saqueRef}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2A3F5F]/50 shadow-lg hover:border-[#2D7A75]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D7A75]/20 to-[#1E5F5B]/15 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#2D7A75]/30">
                  <ArrowDownToLine className="w-6 h-6 text-[#2D7A75]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#E8EBF0] mb-0.5">Saque</h4>
                  <p className="text-[#94A3B8]/80 text-xs">Retire valores da conta</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                    R$
                  </div>
                  <Input
                    id="saque"
                    type="number"
                    step="0.01"
                    value={saqueValue}
                    onChange={(e) => setSaqueValue(e.target.value)}
                    placeholder="Digite o valor"
                    className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#2D7A75] rounded-2xl h-14 pl-12 pr-4 placeholder:text-[#64748B] backdrop-blur-sm"
                  />
                </div>
                <Button
                  onClick={handleSaque}
                  className="w-full bg-gradient-to-r from-[#2D7A75] to-[#1E5F5B] hover:from-[#45A598] hover:to-[#2D7A75] text-white rounded-2xl h-12 shadow-lg shadow-[#2D7A75]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Confirmar Saque
                </Button>
              </div>
            </motion.div>

            {/* Investir */}
            <motion.div
              ref={investirRef}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2A3F5F]/50 shadow-lg hover:border-[#2D7A75]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D7A75]/20 to-[#1E5F5B]/15 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#2D7A75]/30">
                  <TrendingUp className="w-6 h-6 text-[#2D7A75]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#E8EBF0] mb-0.5">Investir</h4>
                  <p className="text-[#94A3B8]/80 text-xs">Aplique em produtos financeiros</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                    R$
                  </div>
                  <Input
                    id="investir"
                    type="number"
                    step="0.01"
                    value={investirValue}
                    onChange={(e) => setInvestirValue(e.target.value)}
                    placeholder="Digite o valor"
                    className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#2D7A75] rounded-2xl h-14 pl-12 pr-4 placeholder:text-[#64748B] backdrop-blur-sm"
                  />
                </div>
                <Button
                  onClick={handleInvestir}
                  className="w-full bg-gradient-to-r from-[#2D7A75] to-[#1E5F5B] hover:from-[#45A598] hover:to-[#2D7A75] text-white rounded-2xl h-12 shadow-lg shadow-[#2D7A75]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Confirmar Investimento
                </Button>
              </div>
            </motion.div>

            {/* Transferir */}
            <motion.div
              ref={transferirRef}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2A3F5F]/50 shadow-lg hover:border-[#2D7A75]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D7A75]/20 to-[#1E5F5B]/15 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#2D7A75]/30">
                  <ArrowLeftRight className="w-6 h-6 text-[#2D7A75]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#E8EBF0] mb-0.5">Transferir</h4>
                  <p className="text-[#94A3B8]/80 text-xs">Transfira para outras contas</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                    R$
                  </div>
                  <Input
                    id="transferir"
                    type="number"
                    step="0.01"
                    value={transferirValue}
                    onChange={(e) => setTransferirValue(e.target.value)}
                    placeholder="Digite o valor"
                    className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#2D7A75] rounded-2xl h-14 pl-12 pr-4 placeholder:text-[#64748B] backdrop-blur-sm"
                  />
                </div>
                <Button
                  onClick={handleTransferir}
                  className="w-full bg-gradient-to-r from-[#2D7A75] to-[#1E5F5B] hover:from-[#45A598] hover:to-[#2D7A75] text-white rounded-2xl h-12 shadow-lg shadow-[#2D7A75]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Confirmar Transferência
                </Button>
              </div>
            </motion.div>

            {/* Adicionar Saldo */}
            <motion.div
              ref={adicionarRef}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2A3F5F]/50 shadow-lg hover:border-[#2D7A75]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D7A75]/20 to-[#1E5F5B]/15 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#2D7A75]/30">
                  <Wallet className="w-6 h-6 text-[#2D7A75]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#E8EBF0] mb-0.5">Adicionar Saldo</h4>
                  <p className="text-[#94A3B8]/80 text-xs">Deposite fundos na conta</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                    R$
                  </div>
                  <Input
                    id="adicionar"
                    type="number"
                    step="0.01"
                    value={adicionarValue}
                    onChange={(e) => setAdicionarValue(e.target.value)}
                    placeholder="Digite o valor"
                    className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#2D7A75] rounded-2xl h-14 pl-12 pr-4 placeholder:text-[#64748B] backdrop-blur-sm"
                  />
                </div>
                <Button
                  onClick={handleAdicionar}
                  className="w-full bg-gradient-to-r from-[#2D7A75] to-[#1E5F5B] hover:from-[#45A598] hover:to-[#2D7A75] text-white rounded-2xl h-12 shadow-lg shadow-[#2D7A75]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Confirmar Depósito
                </Button>
              </div>
            </motion.div>

            {/* Informações Adicionais */}
            <div className="p-5 bg-gradient-to-br from-[#1A1F2E]/70 to-[#0F1419]/50 backdrop-blur-sm border border-[#2A3F5F]/40 rounded-2xl mt-6 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2D7A75]/15 to-[#1E5F5B]/10 flex items-center justify-center flex-shrink-0 border border-[#2D7A75]/20">
                  <Shield className="w-4 h-4 text-[#2D7A75]" />
                </div>
                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  <strong className="text-[#E8EBF0]">Informação:</strong> Todas as transações são processadas com segurança e 
                  criptografia de ponta a ponta. Para valores acima de R$ 10.000, pode ser necessária autenticação adicional.
                </p>
              </div>
            </div>
          </div>
        )}

        {mainTab === 'criptos' && (
          <div className="p-6 space-y-5 bg-gradient-to-b from-[#0F1419] to-[#1A1F2E]/30">
            <div className="mb-6">
              <h3 className="text-[#E8EBF0] mb-1">Criptos</h3>
              <p className="text-[#94A3B8] text-sm">Gerencie e invista em moedas digitais de forma segura</p>
            </div>

            {/* Menu de Navegação Rápida - Criptos */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToCard(comprarCriptoRef)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 border border-[#2A3F5F]/40 rounded-2xl px-5 py-3.5 transition-all hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/10 backdrop-blur-sm min-w-[80px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/15 to-[#B8941F]/10 flex items-center justify-center shadow-inner border border-[#D4AF37]/20">
                  <Plus className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-[#E8EBF0] text-xs">Comprar</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToCard(venderCriptoRef)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 border border-[#2A3F5F]/40 rounded-2xl px-5 py-3.5 transition-all hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/10 backdrop-blur-sm min-w-[80px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/15 to-[#B8941F]/10 flex items-center justify-center shadow-inner border border-[#D4AF37]/20">
                  <CircleDollarSign className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-[#E8EBF0] text-xs">Vender</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToCard(transferirCriptoRef)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 border border-[#2A3F5F]/40 rounded-2xl px-5 py-3.5 transition-all hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/10 backdrop-blur-sm min-w-[80px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/15 to-[#B8941F]/10 flex items-center justify-center shadow-inner border border-[#D4AF37]/20">
                  <Send className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-[#E8EBF0] text-xs">Transferir</span>
              </motion.button>
            </div>

            {/* Comprar Cripto */}
            <motion.div
              ref={comprarCriptoRef}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2A3F5F]/50 shadow-lg hover:border-[#D4AF37]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/15 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#D4AF37]/30">
                  <Plus className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#E8EBF0] mb-0.5">Comprar Cripto</h4>
                  <p className="text-[#94A3B8]/80 text-xs">Adquira moedas digitais</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="select-crypto" className="text-[#94A3B8] text-sm mb-2 block">
                    Selecionar Moeda
                  </Label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] rounded-2xl h-12 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1F2E] border-[#2A3F5F]">
                      <SelectItem value="Bitcoin" className="text-[#E8EBF0]">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="Ethereum" className="text-[#E8EBF0]">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDT" className="text-[#E8EBF0]">Tether (USDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                    R$
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    value={comprarCriptoValue}
                    onChange={(e) => setComprarCriptoValue(e.target.value)}
                    placeholder="Digite o valor"
                    className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#D4AF37] rounded-2xl h-14 pl-12 pr-4 placeholder:text-[#64748B] backdrop-blur-sm"
                  />
                </div>
                <Button
                  onClick={handleComprarCripto}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C158] hover:to-[#D4AF37] text-white rounded-2xl h-12 shadow-lg shadow-[#D4AF37]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Confirmar Compra
                </Button>
              </div>
            </motion.div>

            {/* Vender Cripto */}
            <motion.div
              ref={venderCriptoRef}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2A3F5F]/50 shadow-lg hover:border-[#D4AF37]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/15 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#D4AF37]/30">
                  <CircleDollarSign className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#E8EBF0] mb-0.5">Vender Cripto</h4>
                  <p className="text-[#94A3B8]/80 text-xs">Converta moedas em reais</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="vender-crypto" className="text-[#94A3B8] text-sm mb-2 block">
                    Selecionar Moeda
                  </Label>
                  <Select value={venderCryptoType} onValueChange={setVenderCryptoType}>
                    <SelectTrigger className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] rounded-2xl h-12 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1F2E] border-[#2A3F5F]">
                      <SelectItem value="Bitcoin" className="text-[#E8EBF0]">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="Ethereum" className="text-[#E8EBF0]">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDT" className="text-[#E8EBF0]">Tether (USDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.00000001"
                    value={venderCriptoValue}
                    onChange={(e) => setVenderCriptoValue(e.target.value)}
                    placeholder="Quantidade"
                    className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#D4AF37] rounded-2xl h-14 px-4 placeholder:text-[#64748B] backdrop-blur-sm"
                  />
                </div>
                <Button
                  onClick={handleVenderCripto}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C158] hover:to-[#D4AF37] text-white rounded-2xl h-12 shadow-lg shadow-[#D4AF37]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Confirmar Venda
                </Button>
              </div>
            </motion.div>

            {/* Transferir Cripto */}
            <motion.div
              ref={transferirCriptoRef}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2A3F5F]/50 shadow-lg hover:border-[#D4AF37]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/15 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#D4AF37]/30">
                  <Send className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#E8EBF0] mb-0.5">Transferir Cripto</h4>
                  <p className="text-[#94A3B8]/80 text-xs">Envie para outra carteira</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="transferir-crypto" className="text-[#94A3B8] text-sm mb-2 block">
                    Selecionar Moeda
                  </Label>
                  <Select value={transferirCriptoType} onValueChange={setTransferirCriptoType}>
                    <SelectTrigger className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] rounded-2xl h-12 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1F2E] border-[#2A3F5F]">
                      <SelectItem value="Bitcoin" className="text-[#E8EBF0]">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="Ethereum" className="text-[#E8EBF0]">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDT" className="text-[#E8EBF0]">Tether (USDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Endereço da carteira"
                  className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#D4AF37] rounded-2xl h-14 px-4 placeholder:text-[#64748B] backdrop-blur-sm"
                />
                <Input
                  type="number"
                  step="0.00000001"
                  value={transferirCriptoValue}
                  onChange={(e) => setTransferirCriptoValue(e.target.value)}
                  placeholder="Quantidade"
                  className="bg-[#0F1419]/60 border-[#2A3F5F]/40 text-[#E8EBF0] focus:border-[#D4AF37] rounded-2xl h-14 px-4 placeholder:text-[#64748B] backdrop-blur-sm"
                />
                <Button
                  onClick={handleTransferirCripto}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C158] hover:to-[#D4AF37] text-white rounded-2xl h-12 shadow-lg shadow-[#D4AF37]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Enviar Cripto
                </Button>
              </div>
            </motion.div>

            {/* Informações Adicionais - Criptos */}
            <div className="p-5 bg-gradient-to-br from-[#1A1F2E]/70 to-[#0F1419]/50 backdrop-blur-sm border border-[#2A3F5F]/40 rounded-2xl mt-6 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37]/15 to-[#B8941F]/10 flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/20">
                  <Bitcoin className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  <strong className="text-[#E8EBF0]">Atenção:</strong> Operações com criptomoedas envolvem riscos. 
                  Verifique sempre o endereço da carteira antes de realizar transferências. Taxas de rede podem ser aplicadas.
                </p>
              </div>
            </div>
          </div>
        )}

        {mainTab === 'portfolio' && (
          <div className="p-6 space-y-6 bg-[rgba(0,0,0,0)]">

            {/* Categorias de Investimento */}
            <div className="mb-5">
              <h3 className="text-[#E8EBF0] mb-1">Categorias de Investimento</h3>
              <p className="text-[#94A3B8] text-sm">Explore opções adequadas ao seu perfil</p>
            </div>

            <Tabs defaultValue="renda-fixa" className="w-full" onValueChange={(v) => setSelectedCategory(v)}>
              <TabsList className="grid w-full grid-cols-4 bg-[#0F1419]/80 backdrop-blur-sm border border-[#2A3F5F]/60 p-1 rounded-2xl shadow-inner">
                <TabsTrigger 
                  value="renda-fixa" 
                  className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50"
                >
                  Renda Fixa
                </TabsTrigger>
                <TabsTrigger 
                  value="acoes" 
                  className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50"
                >
                  Ações
                </TabsTrigger>
                <TabsTrigger 
                  value="cripto" 
                  className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50"
                >
                  Cripto
                </TabsTrigger>
                <TabsTrigger 
                  value="fundos" 
                  className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2D7A75] data-[state=active]:to-[#1E5F5B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#2D7A75]/30 text-[#94A3B8] hover:text-[#E8EBF0] transition-all rounded-xl data-[state=inactive]:hover:bg-[#1A1F2E]/50"
                >
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
                          className="w-full bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] h-9 sm:h-10 text-xs sm:text-sm"
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

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0] h-11 sm:h-10 text-sm sm:text-base">
                        Confirmar Investimento
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowSimulation(false)}
                        className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F] h-11 sm:h-10 text-sm sm:text-base"
                      >
                        Nova Simulação
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {mainTab === 'simulator' && (
          <div className="p-6 space-y-6">
            {/* Input Section */}
            <Card className="bg-[#1A1F2E] border-[#2A3F5F]">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <Calculator className="w-5 h-5 text-[#2D7A75]" />
                  <h3 className="text-[#E8EBF0]">Parâmetros da Simulação</h3>
                </div>

                <div className="space-y-4">
                  {/* Valor Inicial */}
                  <div>
                    <Label htmlFor="valorInicial" className="text-[#94A3B8] flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4" />
                      Valor Inicial (R$)
                    </Label>
                    <Input
                      id="valorInicial"
                      type="number"
                      value={valorInicial}
                      onChange={(e) => setValorInicial(e.target.value)}
                      className="bg-[#0F1419] border-[#2A3F5F] text-[#E8EBF0] focus:border-[#2D7A75]"
                      placeholder="0.00"
                    />
                  </div>

                  {/* Aporte Mensal */}
                  <div>
                    <Label htmlFor="aporteMensal" className="text-[#94A3B8] flex items-center gap-2 mb-2">
                      <PiggyBank className="w-4 h-4" />
                      Aporte Mensal (R$)
                    </Label>
                    <Input
                      id="aporteMensal"
                      type="number"
                      value={aporteMensal}
                      onChange={(e) => setAporteMensal(e.target.value)}
                      className="bg-[#0F1419] border-[#2A3F5F] text-[#E8EBF0] focus:border-[#2D7A75]"
                      placeholder="0.00"
                    />
                  </div>

                  {/* Taxa Mensal */}
                  <div>
                    <Label htmlFor="taxaMensal" className="text-[#94A3B8] flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4" />
                      Taxa de Retorno (% a.m.)
                    </Label>
                    <Input
                      id="taxaMensal"
                      type="number"
                      step="0.01"
                      value={taxaMensal}
                      onChange={(e) => setTaxaMensal(e.target.value)}
                      className="bg-[#0F1419] border-[#2A3F5F] text-[#E8EBF0] focus:border-[#2D7A75]"
                      placeholder="0.80"
                    />
                  </div>

                  {/* Período */}
                  <div>
                    <Label htmlFor="periodo" className="text-[#94A3B8] flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      Período (meses)
                    </Label>
                    <Input
                      id="periodo"
                      type="number"
                      value={periodoMeses}
                      onChange={(e) => setPeriodoMeses(e.target.value)}
                      className="bg-[#0F1419] border-[#2A3F5F] text-[#E8EBF0] focus:border-[#2D7A75]"
                      placeholder="24"
                    />
                  </div>

                  <Button
                    onClick={calcularProjecao}
                    className="w-full bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0]"
                  >
                    Calcular Projeção
                  </Button>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <AnimatePresence>
              {resultado && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-[#1A1F2E] border-[#2D7A75]/30">
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-5">
                        <TrendingUp className="w-5 h-5 text-[#2D7A75]" />
                        <h3 className="text-[#E8EBF0]">Resultados da Projeção</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                        <div className="p-5 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 rounded-2xl border border-[#2A3F5F]/50 backdrop-blur-sm shadow-lg hover:border-[#2A3F5F]/70 transition-all overflow-hidden">
                          <div className="space-y-3 text-center">
                            <p className="text-[#94A3B8] text-xs uppercase tracking-wide">Total Aportado</p>
                            <p className="text-[#E8EBF0] break-words font-[Saira_ExtraCondensed] text-[16px] font-bold">{formatCurrency(resultado.totalAportado)}</p>
                          </div>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-[#1A1F2E]/80 to-[#0F1419]/60 rounded-2xl border border-[#2D7A75]/50 backdrop-blur-sm shadow-lg shadow-[#2D7A75]/10 hover:border-[#2D7A75]/70 transition-all overflow-hidden">
                          <div className="space-y-3 text-center">
                            <p className="text-[#94A3B8] text-xs uppercase tracking-wide">Total em Juros</p>
                            <p className="text-[#2D7A75] break-words font-[Saira_ExtraCondensed] text-[16px] font-bold">{formatCurrency(resultado.totalJuros)}</p>
                          </div>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-[#1A1F2E]/90 to-[#0F1419]/70 rounded-2xl border border-[#D4AF37]/60 backdrop-blur-sm shadow-xl shadow-[#D4AF37]/20 hover:border-[#D4AF37]/80 transition-all overflow-hidden">
                          <div className="space-y-3 text-center">
                            <p className="text-[#94A3B8] text-xs uppercase tracking-wide">Valor Final</p>
                            <p className="text-[#D4AF37] break-words font-[Saira_ExtraCondensed] text-[16px] font-bold">{formatCurrency(resultado.valorFinal)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={resultado.dados}>
                            <defs>
                              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2D7A75" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2D7A75" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorAportes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A3F5F" />
                            <XAxis dataKey="mes" stroke="#64748B" fontSize={12} />
                            <YAxis stroke="#64748B" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="aportes"
                              stroke="#3B82F6"
                              strokeWidth={2}
                              fill="url(#colorAportes)"
                            />
                            <Area
                              type="monotone"
                              dataKey="valor"
                              stroke="#2D7A75"
                              strokeWidth={2}
                              fill="url(#colorValor)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modais */}
      
      {/* Modal Saque */}
      <Dialog open={showSaqueModal} onOpenChange={setShowSaqueModal}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0] flex items-center gap-2">
              <ArrowDownToLine className="w-5 h-5 text-[#D4AF37]" />
              Revisar Solicitação de Saque
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Confirme os detalhes da sua solicitação
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[#94A3B8] text-sm mb-2 block">Tipo de Saque</Label>
              <RadioGroup value={saqueType} onValueChange={setSaqueType} className="space-y-2">
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="pix" id="saque-pix" />
                  <Label htmlFor="saque-pix" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Pix (até 1 dia útil)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="transferencia" id="saque-ted" />
                  <Label htmlFor="saque-ted" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Transferência (até 2 dias úteis)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="p-4 bg-[#0F1419] rounded-xl border border-[#2A3F5F]">
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Valor solicitado:</span>
                <span className="text-[#E8EBF0]">{formatCurrency(parseFloat(saqueValue) || 0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Prazo:</span>
                <span className="text-[#E8EBF0]">
                  {saqueType === 'pix' ? 'até 1 dia útil' : 'até 2 dias úteis'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8] text-sm">Destino:</span>
                <span className="text-[#E8EBF0] text-sm">Conta vinculada</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSaqueModal(false)}
              className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={confirmSaque}
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Saque
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Investir */}
      <Dialog open={showInvestirModal} onOpenChange={setShowInvestirModal}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#2D7A75]" />
              Confirmar Investimento
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Revise os detalhes do seu investimento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[#94A3B8] text-sm mb-2 block">Tipo de Investimento</Label>
              <RadioGroup value={investirType} onValueChange={setInvestirType} className="space-y-2">
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="cdb" id="invest-cdb" />
                  <Label htmlFor="invest-cdb" className="text-[#E8EBF0] cursor-pointer flex-1">
                    CDB (12% a.a.)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="fundos" id="invest-fundos" />
                  <Label htmlFor="invest-fundos" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Fundos (10% a.a.)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="renda-variavel" id="invest-rv" />
                  <Label htmlFor="invest-rv" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Renda Variável (15% a.a.)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="p-4 bg-[#0F1419] rounded-xl border border-[#2A3F5F]">
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Valor aplicado:</span>
                <span className="text-[#E8EBF0]">{formatCurrency(parseFloat(investirValue) || 0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Rentabilidade estimada:</span>
                <span className="text-[#2D7A75]">
                  {investirType === 'cdb' ? '12%' : investirType === 'fundos' ? '10%' : '15%'} a.a.
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8] text-sm">Prazo mínimo:</span>
                <span className="text-[#E8EBF0]">30 dias</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowInvestirModal(false)}
              className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={confirmInvestir}
              className="flex-1 bg-gradient-to-r from-[#2D7A75] to-[#1E5F5B] hover:from-[#45A598] hover:to-[#2D7A75] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Investimento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Transferir */}
      <Dialog open={showTransferirModal} onOpenChange={setShowTransferirModal}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0] flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-[#3B82F6]" />
              Confirmar Transferência
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Revise os dados da transferência
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[#94A3B8] text-sm mb-2 block">Tipo de Envio</Label>
              <RadioGroup value={transferirType} onValueChange={setTransferirType} className="space-y-2">
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="pix" id="transfer-pix" />
                  <Label htmlFor="transfer-pix" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Pix (instantâneo)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="ted" id="transfer-ted" />
                  <Label htmlFor="transfer-ted" className="text-[#E8EBF0] cursor-pointer flex-1">
                    TED (até 1 dia útil)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="interno" id="transfer-interno" />
                  <Label htmlFor="transfer-interno" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Interno (imediato)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="p-4 bg-[#0F1419] rounded-xl border border-[#2A3F5F]">
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Valor:</span>
                <span className="text-[#E8EBF0]">{formatCurrency(parseFloat(transferirValue) || 0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Conta destino:</span>
                <span className="text-[#E8EBF0] text-sm">Conta simulada</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8] text-sm">Prazo:</span>
                <span className="text-[#E8EBF0]">
                  {transferirType === 'pix' ? 'instantâneo' : transferirType === 'ted' ? 'até 1 dia útil' : 'imediato'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowTransferirModal(false)}
              className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={confirmTransferir}
              className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Transferência
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Adicionar Saldo */}
      <Dialog open={showAdicionarModal} onOpenChange={setShowAdicionarModal}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0] flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#8B5CF6]" />
              Confirmar Depósito
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Revise os detalhes do depósito
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[#94A3B8] text-sm mb-2 block">Forma de Depósito</Label>
              <RadioGroup value={adicionarType} onValueChange={setAdicionarType} className="space-y-2">
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="pix" id="add-pix" />
                  <Label htmlFor="add-pix" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Pix (até 24h)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="boleto" id="add-boleto" />
                  <Label htmlFor="add-boleto" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Boleto (até 24h)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-[#0F1419] rounded-xl border border-[#2A3F5F] cursor-pointer hover:border-[#2D7A75]/50 transition-colors">
                  <RadioGroupItem value="transferencia" id="add-transfer" />
                  <Label htmlFor="add-transfer" className="text-[#E8EBF0] cursor-pointer flex-1">
                    Transferência (até 24h)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="p-4 bg-[#0F1419] rounded-xl border border-[#2A3F5F]">
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Valor:</span>
                <span className="text-[#E8EBF0]">{formatCurrency(parseFloat(adicionarValue) || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8] text-sm">Prazo:</span>
                <span className="text-[#E8EBF0]">até 24h</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAdicionarModal(false)}
              className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={confirmAdicionar}
              className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Depósito
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Comprar Cripto */}
      <Dialog open={showComprarCriptoModal} onOpenChange={setShowComprarCriptoModal}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#F7931A]" />
              Confirmar Compra de {selectedCrypto}
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Revise os detalhes da compra
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#0F1419] rounded-xl border border-[#2A3F5F]">
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Valor em R$:</span>
                <span className="text-[#E8EBF0]">{formatCurrency(parseFloat(comprarCriptoValue) || 0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Cotação atual:</span>
                <span className="text-[#E8EBF0]">
                  {formatCurrency(cryptoPrices[selectedCrypto as keyof typeof cryptoPrices].price)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Quantidade estimada:</span>
                <span className="text-[#2D7A75]">
                  {((parseFloat(comprarCriptoValue) || 0) / cryptoPrices[selectedCrypto as keyof typeof cryptoPrices].price).toFixed(8)} {cryptoPrices[selectedCrypto as keyof typeof cryptoPrices].symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8] text-sm">Taxa de transação:</span>
                <span className="text-[#E8EBF0]">
                  {formatCurrency((parseFloat(comprarCriptoValue) || 0) * (cryptoPrices[selectedCrypto as keyof typeof cryptoPrices].fee / 100))}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowComprarCriptoModal(false)}
              className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={confirmComprarCripto}
              className="flex-1 bg-gradient-to-r from-[#F7931A] to-[#E67E00] hover:from-[#E67E00] hover:to-[#D66E00] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Compra
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Vender Cripto */}
      <Dialog open={showVenderCriptoModal} onOpenChange={setShowVenderCriptoModal}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0] flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-[#2D7A75]" />
              Confirmar Venda de {venderCryptoType}
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Revise os detalhes da venda
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#0F1419] rounded-xl border border-[#2A3F5F]">
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Quantidade:</span>
                <span className="text-[#E8EBF0]">
                  {parseFloat(venderCriptoValue) || 0} {cryptoPrices[venderCryptoType as keyof typeof cryptoPrices].symbol}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Valor em R$:</span>
                <span className="text-[#E8EBF0]">
                  {formatCurrency((parseFloat(venderCriptoValue) || 0) * cryptoPrices[venderCryptoType as keyof typeof cryptoPrices].price)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Taxa:</span>
                <span className="text-[#EF4444]">
                  {formatCurrency((parseFloat(venderCriptoValue) || 0) * cryptoPrices[venderCryptoType as keyof typeof cryptoPrices].price * (cryptoPrices[venderCryptoType as keyof typeof cryptoPrices].fee / 100))}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#2A3F5F]">
                <span className="text-[#94A3B8] text-sm">Valor a ser creditado:</span>
                <span className="text-[#2D7A75]">
                  {formatCurrency(
                    ((parseFloat(venderCriptoValue) || 0) * cryptoPrices[venderCryptoType as keyof typeof cryptoPrices].price) * 
                    (1 - cryptoPrices[venderCryptoType as keyof typeof cryptoPrices].fee / 100)
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowVenderCriptoModal(false)}
              className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={confirmVenderCripto}
              className="flex-1 bg-gradient-to-r from-[#2D7A75] to-[#1E5F5B] hover:from-[#45A598] hover:to-[#2D7A75] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Venda
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Transferir Cripto */}
      <Dialog open={showTransferirCriptoModal} onOpenChange={setShowTransferirCriptoModal}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0] flex items-center gap-2">
              <Send className="w-5 h-5 text-[#8B5CF6]" />
              Confirmar Transferência de {transferirCriptoType}
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Revise os detalhes da transferência
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#0F1419] rounded-xl border border-[#2A3F5F]">
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Quantidade:</span>
                <span className="text-[#E8EBF0]">
                  {parseFloat(transferirCriptoValue) || 0} {cryptoPrices[transferirCriptoType as keyof typeof cryptoPrices].symbol}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#94A3B8] text-sm">Rede:</span>
                <span className="text-[#E8EBF0]">
                  {transferirCriptoType === 'Bitcoin' ? 'Bitcoin Network' : transferirCriptoType === 'Ethereum' ? 'Ethereum Network' : 'Tron Network'}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-[#94A3B8] text-sm">Destino:</span>
                <p className="text-[#E8EBF0] text-sm break-all mt-1">{walletAddress}</p>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#2A3F5F]">
                <span className="text-[#94A3B8] text-sm">Taxa de rede:</span>
                <span className="text-[#E8EBF0]">~0.0001 {cryptoPrices[transferirCriptoType as keyof typeof cryptoPrices].symbol}</span>
              </div>
            </div>
            <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl">
              <p className="text-[#EF4444] text-xs">
                ⚠️ Atenção: Verifique cuidadosamente o endereço da carteira. Transações não podem ser revertidas.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowTransferirCriptoModal(false)}
              className="flex-1 bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={confirmTransferirCripto}
              className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Enviar Cripto
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
